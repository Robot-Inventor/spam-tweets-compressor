declare const browser: any;

export interface setting_object {
    [key: string]: number | boolean | Array<string>,
    break_threshold: number,
    hide_media: boolean,
    strict_mode: boolean,
    character_repetition_threshold: number,
    ng_word: Array<string>,
    exclude_url: Array<string>,
    language_filter: Array<string>
};

const default_setting: setting_object = {
    break_threshold: 5,
    hide_media: true,
    strict_mode: false,
    character_repetition_threshold: 5,
    ng_word: [""],
    exclude_url: ["https://twitter.com/home", "https://twitter.com/notifications"],
    language_filter: [""]
};

export async function load_setting() {
    const saved_setting: any = await browser.storage.local.get("setting");
    const setting = default_setting;
    if (saved_setting.setting) {
        Object.keys(default_setting).forEach((key) => {
            setting[key] = saved_setting.setting[key] !== undefined ? saved_setting.setting[key] : default_setting[key];
        });
    }
    return setting;
};
