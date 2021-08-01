import { browser_interface } from "./browser";


declare const browser: browser_interface;


export interface setting_object {
    [key: string]: number | boolean | Array<string> | { [key: string]: { url: string } },
    break_threshold: number,
    hide_media: boolean,
    trim_leading_whitespace: boolean,
    include_verified_account: boolean,
    strict_mode: boolean,
    show_reason: boolean,
    character_repetition_threshold: number,
    ng_word: Array<string>,
    exclude_url: Array<string>,
    language_filter: Array<string>,
    advanced_filter: Array<string>
}

const default_setting: setting_object = {
    break_threshold: 15,
    hide_media: false,
    trim_leading_whitespace: true,
    include_verified_account: false,
    strict_mode: true,
    show_reason: true,
    character_repetition_threshold: 10,
    ng_word: [""],
    exclude_url: ["https://twitter.com/home", "https://twitter.com/notifications"],
    language_filter: [""],
    advanced_filter: [""]
};

export async function load_setting(): Promise<setting_object> {
    const saved_setting: { setting: setting_object } = await browser.storage.local.get("setting");
    const setting = default_setting;
    if (saved_setting.setting) {
        Object.keys(default_setting).forEach((key) => {
            setting[key] = saved_setting.setting[key] !== undefined ? saved_setting.setting[key] : default_setting[key];
        });
    }
    return setting;
}
