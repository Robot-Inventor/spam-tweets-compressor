/**
 * Determine what kind of emoji it is from the image URL.
 */
export class Emoji {
    private emoji_list: { [key: string]: string } | null;

    constructor() {
        this.emoji_list = null;
    }

    /**
     * To use the class, call this function first.
     */
    async init(): Promise<void> {
        const response = await fetch(browser.runtime.getURL("dist/twitter-emoji-url-list/twitter-emoji-url-list.json"));
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this.emoji_list = await response.json();
    }

    /**
     * Return the emoji of the URL.
     * @param url URL of emoji image that starts with ``https://abs-0.twimg.com/emoji/v2/svg/``
     * @returns emoji
     */
    get_from_url(url: string): string | null {
        if (!this.emoji_list) throw new Error("Emoji.init() must be called before Emoji.using get_from_url().");

        if (url in this.emoji_list) return this.emoji_list[url];
        else return null;
    }
}
