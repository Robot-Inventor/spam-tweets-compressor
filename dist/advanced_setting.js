import { load_setting } from "./load_setting.js";
function get_setting_name(element) {
    const setting_name = element.dataset.settingName;
    if (setting_name)
        return setting_name;
    else
        throw "設定の名称が指定されていないinput要素が見つかりました";
}
load_setting().then((setting) => {
    const textarea_element_list = document.querySelectorAll("textarea");
    textarea_element_list.forEach((textarea) => {
        const setting_name = get_setting_name(textarea);
        if (Object.keys(setting).includes(setting_name)) {
            textarea.value = setting[setting_name].join("\n");
            textarea.addEventListener("change", () => {
                setting[setting_name] = textarea.value.split("\n");
                browser.storage.local.set({ setting: setting });
            });
        }
    });
}).catch(() => {
    console.error("設定を読み込めませんでした");
});
//# sourceMappingURL=advanced_setting.js.map