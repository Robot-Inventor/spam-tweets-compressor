import { setting_object } from "../../types/common/setting";
import { show_alert } from "../advanced_setting_view";

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
 * Ge current date and time as YYYY-MM-DD-HH-MM format.
 */
const get_date_time = () => {
    const date_instance = new Date();

    const year = date_instance.getFullYear();
    /* eslint-disable no-magic-numbers */
    const month = (date_instance.getMonth() + 1).toString().padStart(2, "0");
    const date = date_instance.getDate().toString().padStart(2, "0");
    const hour = date_instance.getHours().toString().padStart(2, "0");
    const minute = date_instance.getMinutes().toString().padStart(2, "0");
    /* eslint-enable no-magic-numbers */
    const date_time = `${year}-${month}-${date}-${hour}-${minute}`;

    return date_time;
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

        const file_name = `settings_${get_date_time()}.json`;

        download_json(json, file_name).catch((error) => {
            console.error(error);
            show_alert(browser.i18n.getMessage("advanced_setting_export_download_failed"));
        });
    });
};

export { initialize_download_button };
