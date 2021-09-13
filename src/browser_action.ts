import "./browser_action_view";
import "@material/mwc-checkbox";
import "@material/mwc-formfield";
// eslint-disable-next-line no-duplicate-imports
import { Checkbox } from "@material/mwc-checkbox";
import { Setting } from "./setting";
import { load_color_setting } from "./color";

/**
 * Get setting name information from input element.
 * @param element target element
 * @returns setting name of the target
 */
const get_setting_name = (element: HTMLElement | Checkbox) => {
    const setting_name = element.dataset.settingName;
    if (setting_name) return setting_name;
    else throw new Error("設定の名称が指定されていないinput要素が見つかりました");
};

new Setting()
    .load()
    .then((setting) => {
        void load_color_setting();

        const checkbox_list: NodeListOf<Checkbox> = document.querySelectorAll("mwc-checkbox");
        checkbox_list.forEach((checkbox) => {
            const setting_name = get_setting_name(checkbox);

            const saved_value = setting[setting_name];
            checkbox.checked = typeof saved_value === "boolean" ? saved_value : false;

            checkbox.addEventListener("change", () => (setting[setting_name] = checkbox.checked));
        });
    })
    .catch(() => console.error("設定を読み込めませんでした"));
