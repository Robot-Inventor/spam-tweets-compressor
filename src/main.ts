import { load_setting, setting_object } from "./load_setting.js";
import { normalize } from "./normalize.js";

const selector = {
    tweet_outer: ".css-1dbjc4n.r-qklmqi.r-1adg3ll.r-1ny4l3l",
    tweet_content: ".css-901oao.r-a023e6.r-16dba41.r-rjixqe.r-bcqeeo.r-bnwqim.r-qvutc0",
    user_name: ".css-901oao.css-16my406.r-1tl8opc.r-bcqeeo.r-qvutc0",
    user_id: ".css-901oao.css-bfa6kz.r-18u37iz.r-1qd0xha.r-a023e6.r-16dba41.r-rjixqe.r-bcqeeo.r-qvutc0",
    timeline: "main",
    checked_tweet_class_name: "spam-tweets-compressor-checked",
    media: (() => {
        const media_selector: any = {
            image_selector: ".css-1dbjc4n.r-1867qdf.r-1phboty.r-rs99b7.r-1s2bzr4.r-1ny4l3l.r-1udh08x.r-o7ynqc.r-6416eg",
            video_selector: ".css-1dbjc4n.r-1867qdf.r-1phboty.r-rs99b7.r-1s2bzr4.r-1ny4l3l.r-1udh08x",
            summary_card: ".css-1dbjc4n.r-1867qdf.r-1phboty.r-rs99b7.r-18u37iz.r-1ny4l3l.r-1udh08x.r-o7ynqc.r-6416eg",
            summary_with_large_image: ".css-1dbjc4n.r-1867qdf.r-1phboty.r-rs99b7.r-1ny4l3l.r-1udh08x.r-o7ynqc.r-6416eg"
        }

        let merged = "";
        Object.keys(media_selector).forEach((key) => {
            merged += "," + media_selector[key];
        });
        merged = merged.replace(/^\,/, "");

        return merged;
    })()
};

class TweetElement extends HTMLElement {
    content: string;
    compress: Function;
    user_name: string;
    user_id: string;
    language: string | null;

    constructor() {
        super();

        this.content = "";
        this.compress = () => { };
        this.user_name = "";
        this.user_id = "";
        this.language = "";
    }
}

function get_unchecked_tweets(setting: setting_object) {
    const tweets: NodeListOf<TweetElement> = document.querySelectorAll(`${selector.tweet_outer}:not(.${selector.checked_tweet_class_name})`);
    let result: Array<TweetElement> = [];
    tweets.forEach((element: TweetElement) => {
        element.classList.add(selector.checked_tweet_class_name);

        const content_element: HTMLElement | null = element.querySelector(selector.tweet_content);
        if (content_element) {
            element.content = content_element.textContent || "";

            element.user_name = (() => {
                const user_name_element = element.querySelector(selector.user_name);
                if (user_name_element) return user_name_element.textContent || "";
                else return "";
            })();

            element.user_id = (() => {
                const user_id_element = element.querySelector(selector.user_id);
                if (user_id_element) return user_id_element.textContent || "";
                else return "";
            })();

            element.compress = () => {
                if (setting.strict_mode) {
                    const show_tweet_button = document.createElement("button");
                    show_tweet_button.setAttribute("class", element.getAttribute("class") || "");
                    show_tweet_button.classList.add("show-tweet-button");

                    const text_color = (() => {
                        const user_name_element = element.querySelector(selector.user_name);
                        if (user_name_element) return getComputedStyle(user_name_element).getPropertyValue("color");
                        else return "#1da1f2";
                    })();

                    show_tweet_button.style.color = text_color;
                    show_tweet_button.textContent = `${element.user_name}（${element.user_id}）のツイートを表示`;
                    show_tweet_button.addEventListener("click", () => {
                        element.style.display = "block";
                        show_tweet_button.remove();
                    });

                    element.style.display = "none";
                    element.insertAdjacentElement("afterend", show_tweet_button);
                } else {
                    const raw_content = content_element.innerHTML;
                    element.dataset.rawHTML = raw_content;
                    element.dataset.rawContent = element.content;
                    const compressed_content = content_element.innerHTML.replaceAll("\n", "");
                    if (content_element) content_element.innerHTML = compressed_content;
                    element.content = element.content.replaceAll("\n", "");

                    const media: HTMLElement | null = element.querySelector(selector.media);
                    if (media && setting.hide_media) media.style.display = "none";

                    const decompress_button = document.createElement("button");
                    decompress_button.className = "decompress-button";
                    decompress_button.textContent = "Decompress";
                    content_element.appendChild(decompress_button);
                    decompress_button.addEventListener("click", () => {
                        content_element.innerHTML = element.dataset.rawHTML || "";
                        element.content = element.dataset.rawContent || "";

                        if (media && setting.hide_media) media.style.display = "block";

                        decompress_button.remove();
                    });
                }
            }

            element.language = content_element.lang;

            result.push(element);
        }
    });
    return result;
}

function run_check(setting: setting_object) {
    const exclude_url = setting.exclude_url;

    for (let i = 0; i < exclude_url.length; i++) {
        if (location.href === exclude_url[i]) return;
    }

    const check_target = get_unchecked_tweets(setting);

    for (let i = 0; i < check_target.length; i++) {
        const target = check_target[i];
        const breaks = target.content.match(/\n/g);
        const break_length = breaks ? breaks.length : 0;
        const has_too_many_breaks = break_length >= setting.break_threshold;

        const repeated_character = target.content.match(new RegExp(`(.)\\1{${setting.character_repetition_threshold},}`));

        const ng_word_list = setting.ng_word;
        const has_ng_word = (() => {
            for (let x = 0; x < ng_word_list.length; x++) {
                const word = normalize(ng_word_list[x]);
                if (ng_word_list[x] && normalize(target.content).includes(word)) return true;
            }
            return false;
        })();

        const language_filter = setting.language_filter;
        const is_filtered_language = (() => {
            for (let x = 0; x < language_filter.length; x++) {
                const target_language = language_filter[x];
                if (target_language && target.language === target_language) return true;
            }
            return false;
        })();

        if (has_too_many_breaks || repeated_character || has_ng_word || is_filtered_language) target.compress();
    }
}

(async () => {
    const setting = await load_setting();
    const body_observer_target = document.body;
    const body_observer = new MutationObserver(() => {
        const timeline = document.querySelector(selector.timeline);

        if (timeline) {
            body_observer.disconnect();

            const main_observer_target = timeline;
            const main_observer = new MutationObserver(() => {
                run_check(setting);
            });
            main_observer.observe(main_observer_target, {
                childList: true,
                subtree: true
            });
        }
    });
    body_observer.observe(body_observer_target, {
        childList: true,
        subtree: true
    });
})();
