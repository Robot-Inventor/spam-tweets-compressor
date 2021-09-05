import "./browser_action_view";
import { load_color_setting } from "./color";
import { Setting } from "./setting";

/**
 * Get setting name information from input element.
 * @param element target element
 * @returns setting name of the target
 */
function get_setting_name(element: HTMLElement) {
    const setting_name = element.dataset.settingName;
    if (setting_name) return setting_name;
    else throw "設定の名称が指定されていないinput要素が見つかりました";
}

new Setting()
    .load()
    .then((setting) => {
        void load_color_setting();

        const checkbox_input_element: NodeListOf<HTMLInputElement> =
            document.querySelectorAll("input[type='checkbox']");
        checkbox_input_element.forEach((input_element) => {
            const setting_name = get_setting_name(input_element);

            const saved_value = setting[setting_name];
            input_element.checked = typeof saved_value === "boolean" ? saved_value : false;

            input_element.addEventListener("change", () => (setting[setting_name] = input_element.checked));
        });
    })
    .catch(() => console.error("設定を読み込めませんでした"));
