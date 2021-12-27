import { Dialog } from "@material/mwc-dialog";
import { Setting } from "../../common/setting";

/**
 * Initialize the setting reset button.
 * @param setting_instance instance of setting class
 */
const initialize_reset_button = (setting_instance: Setting) => {
    const reset_button = document.getElementById("advanced_setting_reset_button");
    const reset_dialog = document.getElementById("advanced_setting_reset_confirm_dialog") as Dialog | null;

    if (reset_button && reset_dialog) {
        reset_button.addEventListener("click", () => {
            reset_dialog.show();

            reset_dialog.addEventListener("closed", (event: unknown) => {
                const { detail } = event as { detail: { action: "ok" | "cancel" } };

                if (detail.action === "ok") {
                    setting_instance.readonly = true;
                    void setting_instance.clear();
                    location.reload();
                }
            });
        });
    }
};

export { initialize_reset_button };
