import { Setting } from "./setting";
import { selector } from "./selector";

/**
 * Get the color scheme of Twitter and sync the color scheme of the extension with it.
 * @param retry if true, retry when failed to get the color setting of Twitter.
 */
const update_color_setting = async (retry = true): Promise<void> => {
    // eslint-disable-next-line init-declarations
    let result: Promise<void> | undefined;

    const setting = await new Setting().load();

    const tweet_button_inner = document.querySelector(selector.tweet_button_inner);
    const background_color = getComputedStyle(document.body).backgroundColor;
    const account_name = document.querySelector(selector.normal_text);

    if (tweet_button_inner && background_color && account_name) {
        setting.main_color = getComputedStyle(tweet_button_inner).backgroundColor;

        setting.background_color = background_color;

        setting.font_color = getComputedStyle(account_name).color;
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
 * Change opacity of color of ``rgb(r, g, b)`` format.
 * @param rgb ``rgb(r, g, b)``
 * @param opacity opacity you want to set
 * @returns ``rgba(r, g, b, ${opacity})``
 */
const change_opacity = (rgb: string, opacity: number) =>
    rgb.replace(/^rgb\(/u, "rgba(").replace(/\)$/u, `, ${opacity})`);

/**
 * Load color scheme and initialize CSS variables. The supported CSS variables are below:
 * - ``--main_color``: main color like Twitter Blue
 * - ``--background_color``: document background color
 * - ``--high_emphasize_text_color``: color of normal text
 * - ``--medium_emphasize_text_color``: color of text that medium importance
 */
const load_color_setting = async (): Promise<void> => {
    const high_emphasize_opacity = 1;
    const medium_emphasize_opacity = 0.87;

    const setting = await new Setting().load();

    const style_element = document.createElement("style");
    style_element.textContent = `
:root {
    --main_color: ${setting.main_color};
    --background_color: ${setting.background_color};
    --high_emphasize_text_color: ${change_opacity(setting.font_color, high_emphasize_opacity)};
    --medium_emphasize_text_color: ${change_opacity(setting.font_color, medium_emphasize_opacity)};
}
    `;
    document.body.appendChild(style_element);
};

export { update_color_setting };
export { load_color_setting };
