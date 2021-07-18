import { browser_interface, detect_language } from "./browser";
import { selector } from "./selector";
import { TweetElement } from "./tweet_element";


declare const browser: browser_interface;


export class TweetAnalyser {
    private readonly tweet: TweetElement;
    private readonly content_element: HTMLElement | null;

    constructor(tweet: TweetElement) {
        this.tweet = tweet;
        this.content_element = tweet.querySelector(selector.tweet_content);
    }

    get_content(): string {
        if (!this.content_element) return "";

        return this.content_element.textContent || "";
    }

    get_user_name(): string {
        const user_name_element = this.tweet.querySelector(selector.user_name);
        if (user_name_element) return user_name_element.textContent || "";
        else return "";
    }

    get_user_id(): string {
        const user_id_element = this.tweet.querySelector(selector.user_id);
        if (user_id_element) return user_id_element.textContent || "";
        else return "";
    }

    async get_language(): Promise<string> {
        const detect: detect_language = await browser.i18n.detectLanguage(this.get_content());
        if (detect.isReliable) return detect.languages[0].language.replace(/-.*$/, "");
        else return "";
    }

    private normal_compressor(content_element: HTMLElement, hide_media: boolean) {
        const raw_content = content_element.innerHTML;
        this.tweet.dataset.rawHTML = raw_content;
        this.tweet.dataset.rawContent = this.tweet.content;
        const compressed_content = content_element.innerHTML.replaceAll("\n", "");
        if (content_element) content_element.innerHTML = compressed_content;
        this.tweet.content = this.tweet.content.replaceAll("\n", "");

        const media: HTMLElement | null = this.tweet.querySelector(selector.media);
        if (media && hide_media) media.style.display = "none";

        const decompress_button = document.createElement("button");
        decompress_button.className = "decompress-button";
        const decompress_button_normal: string = browser.i18n.getMessage("decompress_button_normal");
        decompress_button.textContent = decompress_button_normal;
        content_element.appendChild(decompress_button);
        decompress_button.addEventListener("click", () => {
            content_element.innerHTML = this.tweet.dataset.rawHTML || "";
            this.tweet.content = this.tweet.dataset.rawContent || "";

            if (media && hide_media) media.style.display = "block";

            decompress_button.remove();
        });
    }

    private strict_compressor() {
        const decompress_button = document.createElement("button");
        decompress_button.setAttribute("class", this.tweet.getAttribute("class") || "");
        decompress_button.classList.add("show-tweet-button");

        const text_color = (() => {
            const user_name_element = this.tweet.querySelector(selector.user_name);
            if (user_name_element) return getComputedStyle(user_name_element).getPropertyValue("color");
            else return "#1da1f2";
        })();

        decompress_button.style.color = text_color;

        const user_name = this.tweet.user_name;
        const user_id = this.tweet.user_id;
        const button_text: string = browser.i18n.getMessage("decompress_button_strict", [user_name, user_id]);
        decompress_button.textContent = button_text;
        decompress_button.addEventListener("click", () => {
            this.tweet.style.display = "block";
            decompress_button.remove();
        });

        this.tweet.style.display = "none";
        this.tweet.insertAdjacentElement("afterend", decompress_button);
    }

    compress(compressor_mode: "normal" | "strict", hide_media: boolean): void {
        const content_element: HTMLElement | null = this.tweet.querySelector(selector.tweet_content);
        if (!content_element) return;

        if (compressor_mode === "normal") this.normal_compressor(content_element, hide_media);
        else this.strict_compressor();
    }
}
