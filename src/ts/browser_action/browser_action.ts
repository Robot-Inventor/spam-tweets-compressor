import "./browser_action_view";
import "@material/mwc-icon";
import "@material/mwc-switch";
import "@material/mwc-tab-bar";
import "@material/mwc-formfield";
import { Setting } from "../common/setting";
// eslint-disable-next-line no-duplicate-imports
import { Switch } from "@material/mwc-switch";
import { load_color_setting } from "../common/color";

/**
 * Get setting name information from input element.
 * @param element target element
 * @returns setting name of the target
 */
const get_setting_name = (element: HTMLElement | Switch) => {
    const setting_name = element.dataset.settingName;
    if (setting_name) return setting_name;
    else throw new Error("設定の名称が指定されていないinput要素が見つかりました");
};

new Setting()
    .load()
    .then((setting) => {
        void load_color_setting();

        const switch_list: NodeListOf<Switch> = document.querySelectorAll("mwc-switch");
        switch_list.forEach((switch_element) => {
            const setting_name = get_setting_name(switch_element);

            const saved_value = setting[setting_name];
            switch_element.selected = typeof saved_value === "boolean" ? saved_value : false;

            switch_element.addEventListener("click", () => (setting[setting_name] = switch_element.selected));
        });
    })
    .catch(() => console.error("設定を読み込めませんでした"));
