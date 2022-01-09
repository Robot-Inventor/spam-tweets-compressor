import { get_setting_validator, setting_object } from "../../../types/common/setting";
import { Setting } from "../../../common/setting";
import { get_message } from "../../../common/i18n";
import { show_alert } from "../../advanced_setting_view";

/**
 * Validate that the argument is in the correct JSON format.
 * @param input input string
 */
const is_valid_json = (input: unknown) => {
    if (typeof input !== "string") return false;

    try {
        JSON.parse(input);
        return true;
    } catch {
        return false;
    }
};

/**
 * Overwrite all settings with the argument and reload the page.
 * @param setting_instance setting instance
 * @param setting new setting
 */
const overwrite_setting = (setting_instance: Setting, setting: setting_object) => {
    const imported_setting = setting;
    setting_instance.overwrite(imported_setting);
    setting_instance.readonly = true;
    location.reload();
};

/**
 * Import settings from File object.
 * @param file File object
 */
const import_setting = async (setting_instance: Setting, file: File) => {
    const text = await file.text();

    if (!is_valid_json(text)) {
        show_alert(get_message("advanced_setting_import_select_valid_json"));
        return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const parsed_json = JSON.parse(text);

    const validate = get_setting_validator();
    const validation = validate(parsed_json);
    if (validation) {
        overwrite_setting(setting_instance, parsed_json);
    } else if (validate.errors) {
        const error_message = validate.errors
            .map((err) => `place: ${err.instancePath}\nmessage: ${err.message || "undefined"}`)
            .join("\n\n");
        show_alert(get_message("advanced_setting_import_invalid_format", error_message));
    } else {
        show_alert("Setting is not valid");
    }
};

export { import_setting };
