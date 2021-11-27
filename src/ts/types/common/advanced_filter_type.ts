import { is_object } from "./type_predicate_utility";

export interface advanced_filter_type {
    [key: string]: {
        url: string;
        id: string;
    };
}

const is_advanced_filter_type = (input: unknown): input is advanced_filter_type => {
    if (!is_object(input)) return false;

    const child_object_list = Object.keys(input).map((key) => input[key]);
    for (const child_object of child_object_list) {
        if (!is_object(child_object)) return false;

        const has_all_properties = "url" in child_object && "id" in child_object;
        if (!has_all_properties) return false;

        const property_type_check = typeof child_object.url === "string" && typeof child_object.id === "string";
        if (!property_type_check) return false;
    }

    return true;
};

export { is_advanced_filter_type };
