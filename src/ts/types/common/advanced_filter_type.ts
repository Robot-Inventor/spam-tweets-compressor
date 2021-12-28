import { is_object } from "./type_predicate_utility";

export interface advanced_filter_type {
    [key: string]: {
        url: string;
        id: string;
    };
}

const is_advanced_filter_type = (input: unknown): input is advanced_filter_type => {
    if (!is_object(input)) return false;

    const child_object_list = Object.values(input);
    for (const child_object of child_object_list) {
        if (!is_object(child_object)) return false;

        const properties_check = ["url", "id"].every(
            (key) => key in child_object && typeof child_object[key] === "string"
        );
        if (!properties_check) return false;
    }

    return true;
};

export { is_advanced_filter_type };
