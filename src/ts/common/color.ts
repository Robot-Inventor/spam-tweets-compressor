import { Setting } from "./setting";
import chroma from "chroma-js";
import { selector } from "../main/selector";

/**
 * Change opacity of color of ``rgb(r, g, b)`` format.
 * @param rgb ``rgb(r, g, b)``
 * @param opacity opacity you want to set
 * @returns ``rgba(r, g, b, ${opacity})``
 */
const change_opacity = (rgb: string, opacity: number) => {
    const rgba = chroma(rgb).alpha(opacity).rgba();
    return `rgba(${rgba.join()})`;
};

/**
 * Get the color scheme of Twitter and sync the color scheme of the extension with it.
 * @param retry if true, retry when failed to get the color setting of Twitter.
 */
// HACK: This function is too long.
// eslint-disable-next-line max-statements
const update_color_setting = async (retry = true): Promise<void> => {
    // eslint-disable-next-line init-declarations
    let result: Promise<void> | undefined;

    const setting = await new Setting().load();

    const tweet_button_inner = document.querySelector(selector.tweet_button_inner);
    const background_color = getComputedStyle(document.body).backgroundColor;
    const account_name = document.querySelector(selector.normal_text);

    if (tweet_button_inner && background_color && account_name) {
        const high_emphasize_opacity = 1;
        const medium_emphasize_opacity = 0.87;
        const main_color_light_opacity = 0.6;
        const card_brighten = 0.5;
        const card_hover_brighten = 0.6;

        const main_color = getComputedStyle(tweet_button_inner).backgroundColor;
        setting.color.main = main_color;
        setting.color.main_light = change_opacity(main_color, main_color_light_opacity);

        setting.color.background = background_color;

        const base_font_color = getComputedStyle(account_name).color;
        setting.color.high_emphasize_text = change_opacity(base_font_color, high_emphasize_opacity);
        setting.color.medium_emphasize_text = change_opacity(base_font_color, medium_emphasize_opacity);

        const chroma_bg = chroma(background_color);

        setting.color.background_light = `rgb(${chroma_bg.brighten().rgb().join()})`;
        setting.color.card = `rgb(${chroma_bg.brighten(card_brighten).rgb().join()})`;
        setting.color.card_hover = `rgb(${chroma_bg.brighten(card_hover_brighten).rgb().join()})`;
    } else if (retry) {
        result = new Promise((resolve, reject) => {
            const retry_interval = 1000;
            setInterval(() => {
                update_color_setting(false)
                    .then(() => resolve())
                    .catch((error) => reject(error));
            }, retry_interval);
        });
    } else throw new Error("Failed to get color setting.");

    return result;
};

/**
 * Load color scheme, return it and initialize CSS variables. The supported CSS variables are below:
 * - ``--main_color``: main color like Twitter Blue
 * - ``--main_color_light``: light main color like Twitter Blue (opacity: 0.6)
 * - ``--background_color``: document background color
 * - ``--background_color_light``: light background color;
 * - ``--high_emphasize_text_color``: color of normal text
 * - ``--medium_emphasize_text_color``: color of text that medium importance
 */
const load_color_setting = async (): Promise<void> => {
    const setting_instance = new Setting();
    setting_instance.readonly = true;
    const color_setting = (await setting_instance.load()).color;

    const style_element = document.createElement("style");
    style_element.textContent = `
:root {
    --main_color: ${color_setting.main};
    --main_color_light: ${color_setting.main_light};
    --background_color: ${color_setting.background};
    --background_color_light: ${color_setting.background_light};
    --high_emphasize_text_color: ${color_setting.high_emphasize_text};
    --medium_emphasize_text_color: ${color_setting.medium_emphasize_text};
}

.setting_card {
    background: ${color_setting.card};
}

.setting_card:hover {
    background: ${color_setting.card_hover};
}
    `;
    document.body.appendChild(style_element);
};

export { update_color_setting };
export { load_color_setting };
