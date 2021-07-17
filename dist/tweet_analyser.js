import { selector } from "./selector";
export class TweetAnalyser {
    constructor(tweet) {
        this.tweet = tweet;
        this.content_element = tweet.querySelector(selector.tweet_content);
    }
    get_content() {
        if (!this.content_element)
            return "";
        return this.content_element.textContent || "";
    }
    get_user_name() {
        const user_name_element = this.tweet.querySelector(selector.user_name);
        if (user_name_element)
            return user_name_element.textContent || "";
        else
            return "";
    }
    get_user_id() {
        const user_id_element = this.tweet.querySelector(selector.user_id);
        if (user_id_element)
            return user_id_element.textContent || "";
        else
            return "";
    }
    async get_language() {
        const detect = await browser.i18n.detectLanguage(this.get_content());
        if (detect.isReliable)
            return detect.languages[0].language.replace(/\-.*$/, "");
        else
            return "";
    }
}
//# sourceMappingURL=tweet_analyser.js.map