/**
 * Convert url of Twemoji image to emoji. If given url is not valid format, return null.
 * @param url url of the image
 * @returns emoji
 * @example ```typescript
 * const emoji_svg = url_to_emoji("https://abs-0.twimg.com/emoji/v2/svg/1f600.svg");
 * const emoji_png = url_to_emoji("https://abs-0.twimg.com/emoji/v2/72x72/1f600.png");
 * console.log(emoji_svg); // 😀
 * console.log(emoji_png); // 😀
 * ```
 */
const url_to_emoji = (url: string) => {
    const svg_emoji_url = /https:\/\/abs-0\.twimg\.com\/emoji\/v2\/svg\/(?<code_point>[\w-]+?)\.svg/u;
    const png_emoji_url = /https:\/\/abs-0\.twimg\.com\/emoji\/v2\/72x72\/(?<code_point>[\w-]+?)\.png/u;

    let code_point = null;

    if (url.match(svg_emoji_url)) code_point = url.replace(svg_emoji_url, "$<code_point>");
    else if (url.match(png_emoji_url)) code_point = url.replace(png_emoji_url, "$<code_point>");

    if (!code_point) return null;

    try {
        const emoji = code_point
            .split("-")
            .map((txt) => String.fromCodePoint(parseInt(`0x${txt}`, 16)))
            .join("");
        return emoji;
    } catch {
        return null;
    }
};

export { url_to_emoji };
