import emoji_list from "./twitter-emoji-url-list/twitter-emoji-url-list.json";

interface EmojiList {
    [emoji_id: string]: string;
}

/**
 * Determine what kind of emoji it is from the image URL.
 */
export class Emoji {
    private emoji_list: EmojiList;

    constructor() {
        this.emoji_list = emoji_list as EmojiList;
    }

    /**
     * Return the emoji of the URL.
     * @param url URL of emoji image that starts with ``https://abs-0.twimg.com/emoji/v2/svg/``
     * @returns emoji
     */
    get_from_url(url: string): string | null {
        const compressed_url = url.replace(/https:\/\/abs-0\.twimg\.com\/emoji\/v2\/svg\/(?<id>.+?)\.svg/u, "$<id>");
        if (compressed_url in this.emoji_list) return this.emoji_list[compressed_url];
        else return null;
    }
}
