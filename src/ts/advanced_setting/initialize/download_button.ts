import { setting_object } from "../../types/common/setting";
import { show_alert } from "../advanced_setting_view";

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
    if (!copy_button) {
        console.error("Copy button was not found.");
        return;
    }

    copy_button.addEventListener("click", () => {
        copy_text(convert_setting_to_json(setting));
        temporarily_change_button_text(copy_button, browser.i18n.getMessage("advanced_setting_export_copied"));
    });
};

/**
 * Download json file.
 * @param json json string to download
 * @param file_name file name to download
 */
const download_json = async (json: string, file_name: string) => {
    const object_url = URL.createObjectURL(new Blob([json], { type: "text/json" }));

    return browser.downloads.download({
        filename: file_name,
        saveAs: true,
        url: object_url
    });
};

/**
 * Initialize the setting download button.
 * @param setting setting object
 */
const initialize_download_button = (setting: setting_object) => {
    const download_button = document.getElementById("save_button");
    if (!download_button) {
        console.error("Download button was not found.");
        return;
    }

    download_button.addEventListener("click", () => {
        const json = convert_setting_to_json(setting);

        const date_instance = new Date();
        const year = date_instance.getFullYear();
        /* eslint-disable no-magic-numbers */
        const month = (date_instance.getMonth() + 1).toString().padStart(2, "0");
        const date = date_instance.getDate().toString().padStart(2, "0");
        const hour = date_instance.getHours().toString().padStart(2, "0");
        const minute = date_instance.getMinutes().toString().padStart(2, "0");
        /* eslint-enable no-magic-numbers */
        const date_time = `${year}-${month}-${date}-${hour}-${minute}`;

        const file_name = `settings_${date_time}.json`;

        download_json(json, file_name)
            .then(() =>
                temporarily_change_button_text(
                    download_button,
                    browser.i18n.getMessage("advanced_setting_export_saved")
                )
            )
            .catch((error) => {
                console.error(error);
                show_alert(browser.i18n.getMessage("advanced_setting_export_download_failed"));
            });
    });
};

const initialize_copy_and_download_button = (setting: setting_object) => {
    initialize_copy_button(setting);
    initialize_download_button(setting);
};

export { initialize_copy_and_download_button };
