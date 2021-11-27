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

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const all_array_element = [...input.general, ...input.option, ...input.advanced];
    return all_array_element.every(
        (element) => is_browser_action_content_switch(element) || is_browser_action_content_link(element)
    );
};

export { BrowserActionContentSwitch, BrowserActionContentLink, BrowserActionContent };
export { is_browser_action_content_switch, is_browser_action_content_link, is_browser_action_content };
