;
const default_setting = {
    break_threshold: 5,
    hide_media: true,
    strict_mode: false,
    character_repetition_threshold: 5,
    ng_word: [""],
    exclude_url: ["https://twitter.com/home", "https://twitter.com/notifications"]
};
export async function load_setting() {
    const saved_setting = await browser.storage.local.get("setting");
    const setting = default_setting;
    if (saved_setting.setting) {
        Object.keys(default_setting).forEach((key) => {
            setting[key] = saved_setting.setting[key] !== undefined ? saved_setting.setting[key] : default_setting[key];
        });
    }
    return setting;
}
;
//# sourceMappingURL=load_setting.js.map