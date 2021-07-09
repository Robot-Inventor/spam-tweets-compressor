"use strict";
const default_setting = {
    break_threshold: "5"
};
(async () => {
    const saved_setting = await browser.storage.local.get("setting");
    const setting = (() => {
        let result = {};
        Object.keys(default_setting).forEach((key) => {
            result[key] = saved_setting.setting[key] || default_setting[key];
        });
        return result;
    })();
    Object.keys(setting).forEach((key) => {
        const input_element = document.querySelector(`input[data-setting-name='${key}'`);
        if (!input_element)
            console.error(`${location.href}に設定項目「${key}」が見つかりませんでした`);
        input_element.value = setting[key];
        input_element.addEventListener("input", () => {
            setting[key] = input_element.value;
            browser.storage.local.set({ setting: setting });
        });
    });
})();
//# sourceMappingURL=browser_action.js.map