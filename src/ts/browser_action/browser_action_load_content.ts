import browser_action_content from "./browser_action_content.json";
import { init_i18n } from "../common/i18n";
import { is_object } from "../common/type_predicate_utility";

interface BrowserActionContentSwitch {
    type: "switch";
    label: string;
    name: string;
}

interface BrowserActionContentLink {
    type: "link";
    label: string;
    link: string;
}

interface BrowserActionContent {
    general: Array<BrowserActionContentSwitch | BrowserActionContentLink>;
    option: Array<BrowserActionContentSwitch | BrowserActionContentLink>;
    advanced: Array<BrowserActionContentSwitch | BrowserActionContentLink>;
}

const is_browser_action_content_switch = (input: unknown): input is BrowserActionContentSwitch => {
    if (!is_object(input)) return false;

    if (input.type !== "switch") return false;

    const has_all_properties = "type" in input && "label" in input && "name" in input;
    if (!has_all_properties) return false;

    const property_type_check =
        typeof input.type === "string" && typeof input.label === "string" && typeof input.name === "string";
    if (!property_type_check) return false;

    return true;
};

const is_browser_action_content_link = (input: unknown): input is BrowserActionContentLink => {
    if (!is_object(input)) return false;

    if (input.type !== "link") return false;

    const has_all_properties = "type" in input && "label" in input && "link" in input;
    if (!has_all_properties) return false;

    const property_type_check =
        typeof input.type === "string" && typeof input.label === "string" && typeof input.link === "string";
    if (!property_type_check) return false;

    return true;
};

const is_browser_action_content = (input: unknown): input is BrowserActionContent => {
    if (!is_object(input)) return false;

    const has_all_properties = "general" in input && "option" in input && "advanced" in input;
    if (!has_all_properties) return false;

    if (!(Array.isArray(input.general) && Array.isArray(input.option) && Array.isArray(input.advanced))) return false;

    const all_array_element = [...input.general, ...input.option, ...input.advanced];
    for (const element of all_array_element) {
        if (!(is_browser_action_content_switch(element) || is_browser_action_content_link(element))) return false;
    }

    return true;
};

export class LoadBrowserActionContent {
    private readonly content: BrowserActionContent;

    constructor() {
        if (!is_browser_action_content(browser_action_content)) throw new Error("Invalid browser action content");
        this.content = browser_action_content;

        const general_outer = document.getElementById("setting_item_general");
        if (!general_outer) return;
        general_outer.appendChild(LoadBrowserActionContent.generate(this.content.general));

        const option_outer = document.getElementById("setting_item_option");
        if (!option_outer) return;
        option_outer.appendChild(LoadBrowserActionContent.generate(this.content.option));

        const advanced_outer = document.getElementById("setting_item_advanced");
        if (!advanced_outer) return;
        advanced_outer.appendChild(LoadBrowserActionContent.generate(this.content.advanced));

        init_i18n();
    }

    private static generate(content_array: Array<BrowserActionContentSwitch | BrowserActionContentLink>) {
        const outer = document.createElement("div");

        for (const content of content_array) {
            switch (content.type) {
                case "switch":
                    outer.appendChild(LoadBrowserActionContent.generate_switch(content));
                    break;

                case "link":
                    outer.appendChild(LoadBrowserActionContent.generate_link(content));
                    break;

                default:
                    console.error("Unexpected element type of browser action.");
                    break;
            }
        }

        return outer;
    }

    private static generate_switch(content: BrowserActionContentSwitch) {
        const formfield_element = document.createElement("mwc-formfield");
        formfield_element.dataset.i18nLabel = content.label;

        const switch_element = document.createElement("mwc-switch");
        switch_element.dataset.settingName = content.name;

        formfield_element.appendChild(switch_element);

        return formfield_element;
    }

    private static generate_link(content: BrowserActionContentLink) {
        const outer = document.createElement("div");
        outer.className = "setting_item_outer";

        const setting_name = document.createElement("span");
        setting_name.dataset.i18n = content.label;

        const link = document.createElement("a");
        link.href = content.link;
        link.target = "_blank";
        link.dataset.i18n = "browser_action_open_setting";

        outer.appendChild(setting_name);
        outer.appendChild(link);

        return outer;
    }
}
