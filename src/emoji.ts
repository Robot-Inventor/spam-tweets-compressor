export class Emoji {
    private emoji_list: { [key: string]: string } | undefined;

    constructor() {
        this.emoji_list = undefined;
    }

    async init(): Promise<void> {
        const response = await fetch(browser.runtime.getURL("dist/twitter-emoji-url-list/twitter-emoji-url-list.json"));
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this.emoji_list = await response.json();
    }

    get_from_url(url: string): string | null {
        if (this.emoji_list && url in this.emoji_list) return this.emoji_list[url];
        else if (this.emoji_list === undefined) throw "Emoji.init() must be called before Emoji.using get_from_url().";
        else return null;
    }
}
