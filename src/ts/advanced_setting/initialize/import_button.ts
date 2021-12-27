import { get_setting_validator, setting_object } from "../../types/common/setting";
import { Setting } from "../../common/setting";
import { is_error } from "../../types/common/type_predicate_utility";
import { show_alert } from "../advanced_setting_view";

/**
 * Open file choosing dialog and return File object.
 */
const choose_file = async () => {
    const file_input = document.createElement("input");
    file_input.type = "file";
    file_input.accept = "application/json";
    file_input.style.display = "none";
    document.body.appendChild(file_input);

    file_input.click();

    return new Promise<File>((resolve) => {
        file_input.addEventListener("change", () => {
            const { files } = file_input;
            if (!(files && files.length)) return;

            const [file] = files;
            resolve(file);

            file_input.remove();
        });
    });
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
 * Initialize the setting import button.
 * @param setting_instance setting instance
 */
const initialize_import_button = (setting_instance: Setting) => {
    const import_button = document.getElementById("import_button");
    if (!import_button) {
        console.error("import_button is not found.");
        return;
    }

    import_button.addEventListener("click", () => {
        void (async () => {
            const file = await choose_file();
            const text = await file.text();

            if (!is_valid_json(text)) {
                // TODO: i18n
                show_alert("有効なJSONファイルを選択してください。");
                return;
            }

            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const parsed_json = JSON.parse(text);

            const validate = get_setting_validator();
            const validation = validate(parsed_json);
            if (validation) {
                overwrite_setting(setting_instance, parsed_json);
            } else if (validate.errors) {
                // TODO: i18n
                const error_message = validate.errors
                    .map((err) => `place: ${err.instancePath}\nmessage: ${err.message || "undefined"}`)
                    .join("\n\n");
                show_alert(error_message);
            } else {
                // TODO: i18n
                show_alert("Setting is not valid");
            }
        })().catch((error) => {
            console.error(error);
            if (is_error(error)) show_alert(error.message);
        });
    });
};

export { initialize_import_button };
