import { Setting } from "../../../common/setting";
import { import_setting } from "./import_setting";
import { is_error } from "../../../types/common/type_predicate_utility";
import { show_alert } from "../../advanced_setting_view";

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
            await import_setting(setting_instance, file);
        })().catch((error) => {
            console.error(error);
            if (is_error(error)) show_alert(error.message);
        });
    });
};

export { initialize_import_button };
