import { Setting } from "../../../common/setting";
import { import_setting } from "./import_setting";

const drag_over_class = "setting_card-drag_over";

const enable_drag_over = (target: HTMLElement) => target.classList.add(drag_over_class);

const disable_drag_over = (target: HTMLElement) => target.classList.remove(drag_over_class);

const initialize_drop_area = (setting_instance: Setting) => {
    const setting_import_card = document.getElementById("setting_import");
    if (!setting_import_card) {
        console.error("setting_import_card is not found.");
        return;
    }

    setting_import_card.addEventListener("dragover", (event) => {
        event.preventDefault();
        event.stopPropagation();

        enable_drag_over(setting_import_card);
    });

    setting_import_card.addEventListener("dragleave", (event) => {
        event.preventDefault();
        event.stopPropagation();

        disable_drag_over(setting_import_card);
    });

    setting_import_card.addEventListener("drop", (event) => {
        event.preventDefault();
        event.stopPropagation();

        disable_drag_over(setting_import_card);

        if (!event.dataTransfer) return;

        const [file] = event.dataTransfer.files;
        if (!file) return;

        void import_setting(setting_instance, file);
    });
};

export { initialize_drop_area };
