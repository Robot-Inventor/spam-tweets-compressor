import { is_setting_object, setting_object } from "../types/common/setting";
import deepmerge from "deepmerge";
import { diff } from "deep-diff";
import { remove as dot_remove } from "dot-object";
import { is_object } from "../types/common/type_predicate_utility";

const default_setting: setting_object = {
    advanced_filter: [""],
    allow_list: [""],
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
    hide_completely: false,
    include_user_name: false,
    include_verified_account: false,
    ng_word: [""],
    show_reason: true
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
     * Generate a proxy object that can be used to access the setting.
     * @param object original object of setting
     * @returns proxy object
     */
    generate_proxy<T extends object>(object: T): T {
        const target_object = object;

        const proxy = new Proxy(target_object, {
            get: (target, key: string) => {
                const index = key as keyof typeof target_object;

                const value = target_object[index];

                // Support for nested objects.
                if (is_object(value)) return this.generate_proxy(value);
                else return value;
            },

            set: (target, key: string, value: unknown) => {
                const index = key as keyof typeof target_object;

                target_object[index] = value as typeof target_object[keyof typeof target_object];
                this.save();

                return true;
            }
        });

        // "proxy" is a proxy object of setting, so its type is same as "object".
        return proxy as unknown as T;
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

        try {
            return this.generate_proxy(this.setting);
        } catch (err) {
            console.error(err);
            console.error(
                "Failed to generate proxy object of setting. Spam Tweets Compressor will work with default setting. The user can't change the setting."
            );
            return this.setting;
        }
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
     * Overwrite all settings with the argument.
     * @param setting new setting
     */
    overwrite(setting: setting_object): void {
        if (this.readonly) return;

        this.setting = setting;
        this.save();
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
