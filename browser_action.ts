declare const browser: any;

const default_setting: any = {
    break_threshold: "5"
};

(async () => {
    const saved_setting = await browser.storage.local.get("setting");
    const setting = (() => {
        let result: any = {};
        Object.keys(default_setting).forEach((key) => {
            result[key] = saved_setting.setting[key] || default_setting[key];
        });
        return result;
    })();
    Object.keys(setting).forEach((key) => {
        const input_element: any = document.querySelector(`input[data-setting-name='${key}'`);
        if (!input_element) console.error(`${location.href}に設定項目「${key}」が見つかりませんでした`)
        input_element.value = setting[key];
        input_element.addEventListener("input", () => {
            setting[key] = input_element.value;
            browser.storage.local.set({ setting: setting });
        });
    });
})();
