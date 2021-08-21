import { selector } from "./selector";
import { TweetElement } from "./tweet_element";
import { hash_symbol, normalize_hashtag, normalize_link, normalize_user_id } from "./normalize";

export class TweetAnalyser {
    private readonly tweet: TweetElement;
    private readonly content_element: HTMLElement | null;

    constructor(tweet: TweetElement) {
        this.tweet = tweet;
        this.content_element = tweet.querySelector(selector.tweet_content);
    }

    get content(): string | null {
        if (!this.content_element) return null;

        return this.content_element.textContent || "";
    }

    get user_name(): string {
        const user_name_element = this.tweet.querySelector(selector.user_name);
        if (user_name_element) return user_name_element.textContent || "";
        else return "";
    }

    get user_id(): string | null {
        const user_id_element = this.tweet.querySelector(selector.user_id);
        if (user_id_element) return normalize_user_id(user_id_element.textContent || "");
        else return null;
    }

    get language(): Promise<string> {
        return this.get_language();
    }

    private async get_language(): Promise<string> {
        const target_node = this.content_element;
        let target_text = this.content || "";
        if (target_node) {
            const clone = target_node.cloneNode(true);
            const temporary_element = document.createElement("div");
            temporary_element.appendChild(clone);
            temporary_element.querySelectorAll(selector.hashtag_link_mention).forEach((element) => element.remove());
            target_text = temporary_element.textContent || "";
        }
        const detect = await browser.i18n.detectLanguage(target_text);
        if (detect.isReliable) return detect.languages[0].language.replace(/-.*$/, "");
        else if (this.content_element && this.content_element.lang) return this.content_element.lang;
        else return "";
    }

    compress(reason?: string): void {
        const decompress_button = document.createElement("button");
        decompress_button.setAttribute("class", this.tweet.getAttribute("class") || "");
        decompress_button.classList.add(selector.show_tweet_button.replace(/^\./, ""));

        const user_name = this.tweet.user_name;
        const user_id = this.tweet.user_id;
        if (reason) {
            const button_text: string = browser.i18n.getMessage("decompress_button_strict_with_reason", [
                user_name,
                `@${user_id}`,
                reason
            ]);
            decompress_button.textContent = button_text;
        } else {
            const button_text: string = browser.i18n.getMessage("decompress_button_strict_without_reason", [
                user_name,
                `@${user_id}`
            ]);
            decompress_button.textContent = button_text;
        }
        decompress_button.addEventListener("click", () => {
            this.tweet.style.display = "block";
            decompress_button.remove();
        });

        this.tweet.style.display = "none";
        this.tweet.insertAdjacentElement("afterend", decompress_button);
    }

    get hashtag(): Array<string> {
        const is_hashtag = (element: Element) => {
            return element.textContent && hash_symbol.includes(element.textContent[0]);
        };
        const normalize = (element: Element) => {
            return normalize_hashtag(element.textContent || "");
        };
        return [...this.tweet.querySelectorAll(selector.hashtag_link_mention)].filter(is_hashtag).map(normalize);
    }

    get link(): Array<string> {
        function is_link(element: Element) {
            return Boolean(element.querySelector(selector.link_scheme_outer));
        }
        function normalize(element: Element) {
            return normalize_link((element.textContent || "").replace(/…$/, ""));
        }
        return [...this.tweet.querySelectorAll(selector.hashtag_link_mention)].filter(is_link).map(normalize);
    }
}
