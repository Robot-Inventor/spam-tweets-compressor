import { Setting } from "../../common/setting";
import { initialize_download_button } from "./download_button";
import { initialize_import_button } from "./import_button";
import { initialize_reset_button } from "./reset_button";
import { setting_object } from "../../types/common/setting";

const initialize_button = (setting_instance: Setting, setting: setting_object) => {
    initialize_import_button(setting_instance);
    initialize_reset_button(setting_instance);
    initialize_download_button(setting);
};

export { initialize_button };
