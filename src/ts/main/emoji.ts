const url_to_emoji = (url: string) => {
    const code_point = url.replace(
        /https:\/\/abs-0\.twimg\.com\/emoji\/v2\/svg\/(?<code_point>[\w-]+?)\.svg/u,
        "$<code_point>"
    );
    const emoji = code_point
        .split("-")
        .map((txt) => String.fromCodePoint(parseInt(`0x${txt}`, 16)))
        .join("");
    return emoji;
};

export { url_to_emoji };
