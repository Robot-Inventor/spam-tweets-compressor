import { is_object, is_string_array } from "./type_predicate_utility";
import deepmerge from "deepmerge";
import { diff } from "deep-diff";
import { remove as dot_remove } from "dot-object";

interface ColorSetting {
    main: string;
    main_light: string;
    background: string;
    high_emphasize_text: string;
    medium_emphasize_text: string;
    top_app_bar: string;
    drawer: string;
    card: string;
    card_hover: string;
}

type setting_value_type = number | string | boolean | Array<string> | { [key: string]: { url: string } } | ColorSetting;

export interface setting_object {
    [key: string]: setting_value_type;
    advanced_filter: Array<string>;
    allow_list: Array<string>;
    color: ColorSetting;
    decompress_on_hover: boolean;
    exclude_url: Array<string>;
    hide_completely: boolean;
    include_user_name: boolean;
    include_verified_account: boolean;
    ng_word: Array<string>;
    show_reason: boolean;
}

const default_setting: setting_object = {
    advanced_filter: [""],
    allow_list: [""],
    background_color: "rgb(0, 0, 0)",
    color: {
        background: "rgb(0, 0, 0)",
        card: "rgb(25, 25, 25)",
        card_hover: "rgb(29, 29, 29)",
        drawer: "rgb(44, 44, 44)",
        high_emphasize_text: "rgba(217, 217, 217, 1)",
        main: "rgb(29, 155, 240)",
        main_light: "rgba(29, 155, 240, 0.6)",
        medium_emphasize_text: "rgba(217, 217, 217, 0.87)",
        top_app_bar: "rgb(44, 44, 44)"
    },
    decompress_on_hover: false,
    exclude_url: ["https://twitter.com/home"],
    font_color: "rgb(255, 255, 255)",
    hide_completely: false,
    include_user_name: false,
    include_verified_account: false,
    ng_word: [""],
    show_reason: true
};

const is_color_setting = (input: unknown): input is ColorSetting => {
    if (!is_object(input)) return false;

    const all_properties = [
        "main",
        "main_light",
        "background",
        "high_emphasize_text",
        "medium_emphasize_text",
        "top_app_bar",
        "drawer",
        "card",
        "card_hover"
    ];
    const has_all_properties = all_properties.every(
        (property) => property in input && typeof input[property] === "string"
    );
    return has_all_properties;
};

const is_setting_object = (input: unknown): input is setting_object => {
    if (!is_object(input)) return false;

    const all_properties = [
        "advanced_filter",
        "allow_list",
        "color",
        "decompress_on_hover",
        "exclude_url",
        "hide_completely",
        "include_user_name",
        "include_verified_account",
        "ng_word",
        "show_reason"
    ];
    const has_all_properties = all_properties.every((property) => property in input);
    if (!has_all_properties) return false;

    if (!is_string_array(input.advanced_filter)) return false;
    if (!is_string_array(input.allow_list)) return false;
    if (!is_color_setting(input.color)) return false;
    if (typeof input.decompress_on_hover !== "boolean") return false;
    if (!is_string_array(input.exclude_url)) return false;
    if (typeof input.hide_completely !== "boolean") return false;
    if (typeof input.include_user_name !== "boolean") return false;
    if (typeof input.include_verified_account !== "boolean") return false;
    if (!is_string_array(input.ng_word)) return false;
    if (typeof input.show_reason !== "boolean") return false;

    return true;
};

/**
 * Delete old properties and add new properties. Existing properties will not be overwritten.
 * @param old_setting old setting object
 * @param new_setting new setting object
 */
const merge_setting = (old_setting: setting_object, new_setting: setting_object): setting_object => {
    const overwrite_merge = (destination_array: Array<unknown>, source_array: Array<unknown>) => {
        const result = [
            ...source_array,
            ...destination_array.filter((value) => Object.prototype.toString.call(value) === "[object Object]")
        ];
        return result;
    };

    // Add new properties.
    const merged_setting = deepmerge(new_setting, old_setting, { arrayMerge: overwrite_merge });

    const properties_diff = diff(old_setting, new_setting);

    // Delete unused properties.
    if (properties_diff) {
        const unused_properties = properties_diff.filter((o_diff) => o_diff.kind === "D");

        for (const piece_of_diff of unused_properties) {
            if (piece_of_diff.path) {
                // Convert deletion target path to dot notation.
                const deletion_target_path = piece_of_diff.path
                    .map((path: string | number) => (typeof path === "string" ? `${path}.` : `[${path}].`))
                    .join("")
                    .replace(/\.$/u, "");
                dot_remove(deletion_target_path, merged_setting);
            }
        }
    }

    return merged_setting;
};

/**
 * Class for setting-related processing.
 */
export class Setting {
    private setting: setting_object;
    private callback: null | (() => void);
    readonly: boolean;

    constructor() {
        this.setting = default_setting;
        this.callback = null;
        this.readonly = false;
    }

    /**
     * Load current setting. To use the class, call this function first.
     *
     * This function returns setting object. If a property of the object has been changed, setting will be saved overwrite.
     * @returns setting data
     */
    async load(): Promise<setting_object> {
        const saved_setting = await browser.storage.local.get("setting");

        if (is_setting_object(saved_setting.setting))
            this.setting = merge_setting(saved_setting.setting, default_setting);
        else this.setting = default_setting;

        browser.storage.onChanged.addListener((changes) => {
            if (!is_setting_object(changes.setting.newValue)) return;
            this.setting = changes.setting.newValue;
            if (this.callback) this.callback();
        });

        return new Proxy(this.setting, {
            get: (target, key: string) => this.setting[key],
            set: (target, key: string, value: setting_value_type) => {
                this.setting[key] = value;
                this.save();
                return true;
            }
        });
    }

    /**
     * Save overwrite the setting.
     */
    private save(): void {
        if (this.readonly) return;

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
        void browser.storage.local.set({ setting: this.setting as any });
    }

    /**
     * Set callback that is called when the setting has been updated.
     * @param callback callback
     */
    onChange(callback: () => void): void {
        this.callback = callback;
    }

    /**
     * Clear storage and set default setting.
     */
    async clear(): Promise<void> {
        await browser.storage.local.clear();
        this.setting = default_setting;
    }
}
