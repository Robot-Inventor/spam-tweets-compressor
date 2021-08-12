import { browser_interface } from "./browser";
import { load_setting } from "./load_setting";
import { selector } from "./selector";


declare const browser: browser_interface;


export async function update_color_setting(): Promise<void> {
    const setting = await load_setting();

    const tweet_button_inner = document.querySelector(selector.tweet_button_inner);
    if (tweet_button_inner) {
        const main_color = getComputedStyle(tweet_button_inner).backgroundColor;
        if (main_color) setting.main_color = main_color;
    }

    const background_color = getComputedStyle(document.body).backgroundColor;
    if (background_color) setting.background_color = background_color;

    const account_name = document.querySelector(selector.account_name);
    if (account_name) setting.font_color = getComputedStyle(account_name).color;

    void browser.storage.local.set({ "setting": setting });
}

function change_opacity(rgb: string, opacity: number) {
    return rgb.replace(/^rgb\(/, "rgba(").replace(/\)$/, `, ${opacity})`);
}

export async function load_color_setting(): Promise<void> {
    const setting = await load_setting();

    const style_element = document.createElement("style");
    style_element.textContent = `
:root {
    --main_color: ${setting.main_color};
    --background_color: ${setting.background_color};
    --high_emphasize_text_color: ${change_opacity(setting.font_color, 0.87)};
    --medium_emphasize_text_color: ${change_opacity(setting.font_color, 0.60)};
}
    `;
    document.body.appendChild(style_element);
}
