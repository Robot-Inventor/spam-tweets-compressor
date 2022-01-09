import { Setting } from "../../../common/setting";
import { initialize_drop_area } from "./drop_area";
import { initialize_import_button } from "./import_button";

const initialize_import = (setting_instance: Setting) => {
    initialize_import_button(setting_instance);
    initialize_drop_area(setting_instance);
};

export { initialize_import };
