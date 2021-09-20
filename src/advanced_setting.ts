import "./advanced_setting_view";
import "@material/mwc-checkbox";
import "@material/mwc-formfield";
import "@material/mwc-textarea";
import { Setting, setting_object } from "./setting";
// eslint-disable-next-line no-duplicate-imports
import { Checkbox } from "@material/mwc-checkbox";
// eslint-disable-next-line no-duplicate-imports
import { TextArea } from "@material/mwc-textarea";
import { advanced_filter_type } from "./advanced_filter_type";
import { load_color_setting } from "./color";

/**
 * Get setting name information from input element.
 * @param element target element
 * @returns setting name of the target
 */
const get_setting_name = (element: HTMLElement) => {
    const setting_name = element.dataset.settingName;
    if (setting_name) return setting_name;
    else throw new Error("設定の名称が指定されていないinput要素が見つかりました");
};

/**
 * Download advanced filter list and generate setting UI.
 * @param setting
 */
const load_filter_list = async (setting: setting_object): Promise<void> => {
    const filter_list_outer = document.getElementById("filter_list_outer");
    if (!filter_list_outer) {
        console.error("#filter_list_outer was not found.");
        return;
    }

    const response = await fetch(
        "https://cdn.statically.io/gh/Robot-Inventor/stc-filter/main/dist/advanced_filter.json"
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const json_data: advanced_filter_type = await response.json();

    const add_filter_item = (key: string) => {
        const checkbox = document.createElement("mwc-checkbox");
        // eslint-disable-next-line no-irregular-whitespace
        const filter_id = json_data[key].id;
        checkbox.dataset.filterId = filter_id;
        const form_field = document.createElement("mwc-formfield");
        form_field.label = key;
        form_field.appendChild(checkbox);

        if (setting.advanced_filter.includes(filter_id)) checkbox.checked = true;

        checkbox.addEventListener("change", () => {
            const all_checkbox: NodeListOf<Checkbox> = filter_list_outer.querySelectorAll("mwc-checkbox");
            setting.advanced_filter = [...all_checkbox]
                // eslint-disable-next-line no-undefined
                .filter((element) => element.checked && element.dataset.filterId !== undefined)
                .map((element) => element.dataset.filterId || "");
        });

        filter_list_outer.appendChild(form_field);
    };

    Object.keys(json_data).sort().forEach(add_filter_item);
};

/**
 * Copy specified text to clipboard.
 * @param text text to copy
 */
const copy_text = (text: string) => {
    void navigator.clipboard.writeText(text);
};

/**
 * Download json file.
 * @param json json string to download
 * @param file_name file name to download
 */
const download_json = (json: string, file_name: string) => {
    const download_link = document.createElement("a");
    download_link.href = URL.createObjectURL(new Blob([json], { type: "text/json" }));
    download_link.download = file_name;
    download_link.style.display = "none";
    document.body.appendChild(download_link);
    download_link.click();
    download_link.remove();
};

/**
 * Convert setting object to JSON string.
 * @param setting setting object
 * @returns json string
 */
// eslint-disable-next-line no-magic-numbers
const convert_setting_to_json = (setting: setting_object) => JSON.stringify(setting, null, 4);

/**
 * Change the text of the button, then change it back after 5 seconds.
 * @param button target button
 * @param text text after change
 */
const temporarily_change_button_text = (button: HTMLElement, text: string) => {
    const button_text_change_time = 5000;
    const default_text = button.textContent;
    button.textContent = text;
    setTimeout(() => (button.textContent = default_text), button_text_change_time);
};

const setup_textarea_validation = () => {
    const allow_list = document.getElementById("allow_list") as TextArea | null;
    if (allow_list) {
        allow_list.validityTransform = (newValue, nativeValidity) => {
            if (nativeValidity.valid) {
                const is_valid = !newValue
                    .split("\n")
                    .map((text) => text.trim())
                    .filter((text) => text)
                    .filter((text) => text[0] !== "@").length;
                return {
                    customError: !is_valid,
                    valid: is_valid
                };
            } else return {};
        };
    } else console.error("Textarea of allow list was not found.");
};

new Setting()
    .load()
    .then((setting) => {
        void load_color_setting();
        void load_filter_list(setting);

        const textarea_list: NodeListOf<TextArea> = document.querySelectorAll("mwc-textarea");
        textarea_list.forEach((textarea) => {
            const setting_name = get_setting_name(textarea);

            if (Object.keys(setting).includes(setting_name)) {
                const saved_value = setting[setting_name];
                textarea.value = saved_value instanceof Array ? saved_value.join("\n") : "";

                const process_string = (text: string) => {
                    const result = text
                        .split("\n")
                        .map((txt) => txt.trim())
                        .filter((txt) => txt);
                    return result;
                };

                const save_textarea = () => {
                    if (textarea.validity.valid) setting[setting_name] = process_string(textarea.value);
                };

                window.addEventListener("beforeunload", save_textarea);
            }
        });

        setup_textarea_validation();

        const copy_button = document.getElementById("copy_button");
        if (copy_button) {
            copy_button.addEventListener("click", () => {
                // eslint-disable-next-line no-magic-numbers
                copy_text(convert_setting_to_json(setting));
                temporarily_change_button_text(copy_button, browser.i18n.getMessage("advanced_setting_export_copied"));
            });
        }

        const save_button = document.getElementById("save_button");
        if (save_button) {
            save_button.addEventListener("click", () => {
                // eslint-disable-next-line no-magic-numbers
                download_json(convert_setting_to_json(setting), "stc_setting.json");
                temporarily_change_button_text(save_button, browser.i18n.getMessage("advanced_setting_export_saved"));
            });
        }
    })
    .catch(() => console.error("設定を読み込めませんでした"));
