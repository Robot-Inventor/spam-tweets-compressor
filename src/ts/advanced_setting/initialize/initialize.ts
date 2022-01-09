import { Setting } from "../../common/setting";
import { initialize_download_button } from "./download_button";
import { initialize_import } from "./setting_import/initialize_import";
import { initialize_reset_button } from "./reset_button";
import { setting_object } from "../../types/common/setting";

const initialize = (setting_instance: Setting, setting: setting_object) => {
    initialize_reset_button(setting_instance);
    initialize_download_button(setting);
    initialize_import(setting_instance);
};

export { initialize };
