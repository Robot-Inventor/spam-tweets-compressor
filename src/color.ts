import { selector } from "./selector";
import { Setting } from "./setting";

export async function update_color_setting(retry = true): Promise<void> {
    const setting = await new Setting().load();

    const tweet_button_inner = document.querySelector(selector.tweet_button_inner);
    const background_color = getComputedStyle(document.body).backgroundColor;
    const account_name = document.querySelector(selector.normal_text);

    if (tweet_button_inner && background_color && account_name) {
        setting.main_color = getComputedStyle(tweet_button_inner).backgroundColor;

        setting.background_color = background_color;

        setting.font_color = getComputedStyle(account_name).color;
    } else if (retry) {
        return new Promise((resolve, reject) => {
            setInterval(() => {
                update_color_setting(false)
                    .then(() => resolve())
                    .catch((e) => reject(e));
            }, 1000);
        });
    } else throw "Failed to get color setting.";
}

function change_opacity(rgb: string, opacity: number) {
    return rgb.replace(/^rgb\(/, "rgba(").replace(/\)$/, `, ${opacity})`);
}

export async function load_color_setting(): Promise<void> {
    const setting = await new Setting().load();

    const style_element = document.createElement("style");
    style_element.textContent = `
:root {
    --main_color: ${setting.main_color};
    --background_color: ${setting.background_color};
    --high_emphasize_text_color: ${change_opacity(setting.font_color, 0.87)};
    --medium_emphasize_text_color: ${change_opacity(setting.font_color, 0.6)};
}
    `;
    document.body.appendChild(style_element);
}
