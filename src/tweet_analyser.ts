import { selector } from "./selector";
import { TweetElement } from "./tweet_element";


type detect_language = {
    isReliable: boolean,
    languages: Array<{
        language: string,
        percentage: number
    }>
};

export class TweetAnalyser {
    private readonly tweet: TweetElement;
    private readonly content_element: HTMLElement | null;

    constructor(tweet: TweetElement) {
        this.tweet = tweet;
        this.content_element = tweet.querySelector(selector.tweet_content);
    }

    get_content() {
        if (!this.content_element) return "";

        return this.content_element.textContent || "";
    }

    get_user_name() {
        const user_name_element = this.tweet.querySelector(selector.user_name);
        if (user_name_element) return user_name_element.textContent || "";
        else return "";
    }

    get_user_id() {
        const user_id_element = this.tweet.querySelector(selector.user_id);
        if (user_id_element) return user_id_element.textContent || "";
        else return "";
    }

    async get_language() {
        const detect: detect_language = await browser.i18n.detectLanguage(this.get_content());
        if (detect.isReliable) return detect.languages[0].language.replace(/\-.*$/, "");
        else return "";
    }
}
