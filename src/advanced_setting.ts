import "./advanced_setting_view";
import "@material/mwc-circular-progress";
import "@material/mwc-checkbox";
import "@material/mwc-drawer";
import "@material/mwc-formfield";
import "@material/mwc-icon";
import "@material/mwc-icon-button";
import "@material/mwc-list";
import "@material/mwc-textarea";
import "@material/mwc-top-app-bar-fixed";
import "@material/mwc-list/mwc-check-list-item";
import { Setting, setting_object } from "./setting";
// eslint-disable-next-line no-duplicate-imports
import { adjust_appearance, create_separator, generate_check_list_item } from "./advanced_setting_view";
import { ListItemBase } from "@material/mwc-list/mwc-list-item-base";
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
 * Hide loading screen for filter list of Advanced Spam Detection.
 */
const hide_filter_loading_screen = () => {
    const filter_loading_screen = document.getElementById("filter_loading_screen");
    if (filter_loading_screen) filter_loading_screen.remove();
    else console.error("filter_loading_screen was not found.");
    const filter_list_outer = document.getElementById("filter_list_outer");
    if (filter_list_outer) filter_list_outer.setAttribute("data-loaded", "");
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

    const mwc_list = document.createElement("mwc-list");
    mwc_list.multi = true;
    mwc_list.appendChild(create_separator());

    for (const filter_name of Object.keys(json_data).sort()) {
        const filter_id = json_data[filter_name].id;
        const is_selected = setting.advanced_filter.includes(filter_id);
        const checkbox = generate_check_list_item(filter_name, filter_id, is_selected);
        const separator = create_separator();
        mwc_list.appendChild(checkbox);
        mwc_list.appendChild(separator);
    }

    mwc_list.addEventListener("action", () => {
        const selected_item: ListItemBase | Array<ListItemBase> | null = mwc_list.selected;
        if (selected_item === null) {
            setting.advanced_filter = [];
        } else if (Array.isArray(selected_item)) {
            const selected_id_list = selected_item
                .map((item) => item.dataset.filterId)
                // eslint-disable-next-line no-undefined
                .filter((id) => id !== undefined) as Array<string>;
            setting.advanced_filter = selected_id_list;
        } else {
            const id = selected_item.dataset.filterId;
            if (id) setting.advanced_filter = [id];
        }
    });

    filter_list_outer.appendChild(mwc_list);
    // eslint-disable-next-line no-magic-numbers
    setTimeout(hide_filter_loading_screen, 1000);
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
        void load_color_setting()
            .then((color_scheme) => adjust_appearance(color_scheme.background_color))
            .catch(() => console.error("Failed to load color scheme."));
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
