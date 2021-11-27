import {
    BrowserActionContent,
    BrowserActionContentLink,
    BrowserActionContentSwitch,
    is_browser_action_content
} from "../types/advanced_setting/browser_action_load_content";
import browser_action_content from "./browser_action_content.json";
import { init_i18n } from "../common/i18n";

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
