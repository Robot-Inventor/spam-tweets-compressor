import { browser_interface } from "./browser";


declare const browser: browser_interface;


type setting_value_type = number | string | boolean | Array<string> | { [key: string]: { url: string } };


export interface setting_object {
    [key: string]: setting_value_type,
    hide_media: boolean,
    include_verified_account: boolean,
    strict_mode: boolean,
    show_reason: boolean,
    ng_word: Array<string>,
    allow_list: Array<string>,
    exclude_url: Array<string>,
    language_filter: Array<string>,
    advanced_filter: Array<string>,
    main_color: string,
    background_color: string,
    font_color: string
}

const default_setting: setting_object = {
    hide_media: false,
    include_verified_account: false,
    strict_mode: true,
    show_reason: true,
    ng_word: [""],
    allow_list: [""],
    exclude_url: ["https://twitter.com/home"],
    language_filter: [""],
    advanced_filter: [""],
    main_color: "rgb(29, 161, 242)",
    background_color: "rgb(0, 0, 0)",
    font_color: "rgb(255, 255, 255)"
};

export class Setting {
    private setting: setting_object;

    constructor() {
        this.setting = default_setting;
    }

    async load(): Promise<setting_object> {
        const saved_setting: { setting: setting_object } = await browser.storage.local.get("setting");
        const setting = default_setting;
        if (saved_setting.setting) {
            Object.keys(default_setting).forEach((key) => {
                setting[key] = saved_setting.setting[key] !== undefined ? saved_setting.setting[key] : default_setting[key];
            });
        }

        browser.storage.onChanged.addListener((changes) => {
            this.setting = changes.setting.newValue;
        });

        return new Proxy(setting, {
            get: (target, key: string) => {
                return this.setting[key];
            },
            set: (target, key: string, value: setting_value_type) => {
                this.setting[key] = value;
                this.save();
                return true;
            }
        });
    }

    private save(): void {
        void browser.storage.local.set({ "setting": this.setting });
    }
}
