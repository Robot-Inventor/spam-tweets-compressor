import { setting_object } from "../../types/common/setting";

/**
 * Copy specified text to clipboard.
 * @param text text to copy
 */
const copy_text = (text: string) => {
    void navigator.clipboard.writeText(text);
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

const initialize_copy_and_download_button = (setting: setting_object) => {
    initialize_copy_button(setting);
    initialize_download_button(setting);
};

export { initialize_copy_and_download_button };
