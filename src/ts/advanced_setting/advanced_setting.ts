import "@material/mwc-button";
import "@material/mwc-circular-progress";
import "@material/mwc-checkbox";
import "@material/mwc-dialog";
import "@material/mwc-drawer";
import "@material/mwc-formfield";
import "@material/mwc-icon";
import "@material/mwc-icon-button";
import "@material/mwc-list";
import "@material/mwc-textarea";
import "@material/mwc-top-app-bar-fixed";
import "@material/mwc-list/mwc-check-list-item";
import { adjust_appearance, create_separator, generate_check_list_item } from "./advanced_setting_view";
import { advanced_filter_type, is_advanced_filter_type } from "../types/common/advanced_filter_type";
import { get_setting_validator, setting_object } from "../types/common/setting";
// eslint-disable-next-line no-duplicate-imports
import { Dialog } from "@material/mwc-dialog";
import { Setting } from "../common/setting";
// eslint-disable-next-line no-duplicate-imports
import { TextArea } from "@material/mwc-textarea";
import { is_error } from "../types/common/type_predicate_utility";
import { load_color_setting } from "../common/color";

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
 * Hide loading screen for filter list of Advanced Filters.
 */
const hide_filter_loading_screen = () => {
    const filter_loading_screen = document.getElementById("filter_loading_screen");
    if (filter_loading_screen) filter_loading_screen.remove();
    else console.error("filter_loading_screen was not found.");
    const filter_list_outer = document.getElementById("filter_list_outer");
    if (filter_list_outer) filter_list_outer.setAttribute("data-loaded", "");
};

/**
 * Fetch filter list of Advanced Filters.
 * @returns advanced filter list
 */
const fetch_filter_list = async (): Promise<advanced_filter_type> => {
    try {
        const response = await fetch(
            "https://cdn.statically.io/gh/Robot-Inventor/stc-filter/main/dist/advanced_filter.json",
            { cache: "no-cache" }
        );

        if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const json_data = await response.json();
        if (!is_advanced_filter_type(json_data)) throw new TypeError("The type of advanced filter is invalid.");

        return json_data;
    } catch (error) {
        if (is_error(error)) throw new Error(`${error.message}\nPlease reload the page.`);
        else
            throw new Error(
                "An unknown error occurred when loading the filter list of Advanced Filters.\nPlease reload the page."
            );
    }
};

/**
 * Download advanced filter list and generate setting UI.
 * @param setting
 */
const load_filter_list = async (setting: setting_object): Promise<void> => {
    const filter_list_outer = document.getElementById("filter_list_outer");
    if (!filter_list_outer) throw new Error("#filter_list_outer was not found.");

    try {
        const json_data = await fetch_filter_list();

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
            const selected_item = mwc_list.selected;
            if (selected_item === null) {
                setting.advanced_filter = [];
            } else if (Array.isArray(selected_item)) {
                const selected_id_list = selected_item
                    .map((item) => item.dataset.filterId)
                    .filter((id) => typeof id === "string") as Array<string>;
                setting.advanced_filter = selected_id_list;
            } else {
                const id = selected_item.dataset.filterId;
                if (id) setting.advanced_filter = [id];
            }
        });

        filter_list_outer.appendChild(mwc_list);
        const loading_screen_display_time = 1000;
        setTimeout(hide_filter_loading_screen, loading_screen_display_time);
    } catch (error) {
        if (is_error(error)) filter_list_outer.textContent = error.message;
        else
            filter_list_outer.textContent =
                "Failed to load filter list. Detailed information is not available.\nPlease reload the page.";
    }
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
const convert_setting_to_json = (setting: setting_object) => {
    const indent = 4;
    return JSON.stringify(setting, null, indent);
};

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

const initialize_textarea_validation = () => {
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

/**
 * Set current setting to textarea and save new setting when the textarea is updated.
 * @param textarea target textarea to validate
 * @param setting setting object
 */
const initialize_textarea = (textarea: TextArea, setting: setting_object) => {
    const setting_name = get_setting_name(textarea);

    if (Object.keys(setting).includes(setting_name)) {
        const saved_value = setting[setting_name];
        textarea.value = Array.isArray(saved_value) ? saved_value.join("\n") : "";

        const process_string = (text: string) =>
            text
                .split("\n")
                .map((txt) => txt.trim())
                .filter((txt) => txt);

        const save_textarea = () => {
            if (textarea.validity.valid) setting[setting_name] = process_string(textarea.value);
        };

        window.addEventListener("beforeunload", save_textarea);
        // eslint-disable-next-line init-declarations
        let textarea_timeout: NodeJS.Timeout;
        textarea.addEventListener("input", () => {
            clearTimeout(textarea_timeout);
            const save_interval = 5000;
            textarea_timeout = setTimeout(save_textarea, save_interval);
        });
    }
};

/**
 * Initialize the setting copy button.
 * @param setting setting object
 */
const initialize_copy_button = (setting: setting_object) => {
    const copy_button = document.getElementById("copy_button");
    if (copy_button) {
        copy_button.addEventListener("click", () => {
            copy_text(convert_setting_to_json(setting));
            temporarily_change_button_text(copy_button, browser.i18n.getMessage("advanced_setting_export_copied"));
        });
    } else console.error("Copy button was not found.");
};

/**
 * Initialize the setting download button.
 * @param setting setting object
 */
const initialize_download_button = (setting: setting_object) => {
    const download_button = document.getElementById("save_button");
    if (download_button) {
        download_button.addEventListener("click", () => {
            download_json(convert_setting_to_json(setting), "stc_setting.json");
            temporarily_change_button_text(download_button, browser.i18n.getMessage("advanced_setting_export_saved"));
        });
    } else console.error("Download button was not found.");
};

/**
 * Initialize the setting import button.
 */
const initialize_import_button = (setting_instance: Setting) => {
    const import_button = document.getElementById("import_button");
    if (import_button) {
        import_button.addEventListener("click", () => {
            const file_input = document.createElement("input");
            file_input.type = "file";
            file_input.accept = "application/json";
            document.body.appendChild(file_input);

            file_input.addEventListener("change", () => {
                const { files } = file_input;
                if (!(files && files.length)) return;

                const file = files[0];
                // TODO: ファイルのMIMEタイプがJSONじゃなかった時の処理

                file.text()
                    .then((text) => {
                        const validate = get_setting_validator();
                        const validation = validate(JSON.parse(text));
                        if (validation) {
                            const imported_setting = JSON.parse(text) as setting_object;
                            setting_instance.overwrite(imported_setting);
                            setting_instance.readonly = true;
                            location.reload();
                        } else if (validate.errors) {
                            // TODO: エラーメッセージのi18n対応
                            const error_message = validate.errors
                                .map((err) => `place: ${err.instancePath}\nmessage: ${err.message || "undefined"}`)
                                .join("\n\n");
                            alert(error_message);
                        } else {
                            alert("Setting is not valid");
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        // TODO: エラー時のダイアログ実装
                        if (is_error(error)) alert(error.message);
                    });
            });

            file_input.click();

            file_input.remove();
        });
    } else console.error("Import button was not found.");
};

/**
 * Initialize the setting reset button.
 * @param setting_instance instance of setting class
 */
const initialize_reset_button = (setting_instance: Setting) => {
    const reset_button = document.getElementById("advanced_setting_reset_button");
    const reset_dialog = document.getElementById("advanced_setting_reset_confirm_dialog") as Dialog | null;
    if (reset_button && reset_dialog) {
        reset_button.addEventListener("click", () => {
            reset_dialog.show();
            reset_dialog.addEventListener("closed", (event: unknown) => {
                const { detail } = event as { detail: { action: "ok" | "cancel" } };
                if (detail.action === "ok") {
                    setting_instance.readonly = true;
                    void setting_instance.clear();
                    location.reload();
                }
            });
        });
    }
};

void (() => {
    const setting_instance = new Setting();

    setting_instance
        .load()
        .then((setting) => {
            adjust_appearance();

            void load_color_setting().catch(() => console.error("Failed to load color scheme."));
            void load_filter_list(setting);

            const textarea_list = document.querySelectorAll("mwc-textarea");
            textarea_list.forEach((textarea) => {
                initialize_textarea(textarea, setting);
            });
            initialize_textarea_validation();

            initialize_copy_button(setting);
            initialize_download_button(setting);
            initialize_import_button(setting_instance);
            initialize_reset_button(setting_instance);
        })
        .catch((error) => {
            console.error(error);
        });
})();
