import { detect_spam } from "./detect_spam";
import { load_setting, setting_object } from "./load_setting";
import { selector } from "./selector";
import { TweetAnalyser } from "./tweet_analyser";
import { TweetElement } from "./tweet_element";


function get_unchecked_tweets() {
    const tweets: NodeListOf<TweetElement> = document.querySelectorAll(`${selector.tweet_outer}:not(.${selector.checked_tweet_class_name})`);
    let result: Array<TweetElement> = [];

    tweets.forEach(async (element: TweetElement) => {
        element.classList.add(selector.checked_tweet_class_name);

        const analyser = new TweetAnalyser(element);

        element.content = analyser.get_content();
        element.user_name = analyser.get_user_name();
        element.user_id = analyser.get_user_id();
        element.language = analyser.get_language();
        element.compress = (compressor_mode: "normal" | "strict", hide_media: boolean) => {
            const content_element: HTMLElement | null = element.querySelector(selector.tweet_content);
            if (!content_element) return;

            if (compressor_mode === "normal") {
                const raw_content = content_element.innerHTML;
                element.dataset.rawHTML = raw_content;
                element.dataset.rawContent = element.content;
                const compressed_content = content_element.innerHTML.replaceAll("\n", "");
                if (content_element) content_element.innerHTML = compressed_content;
                element.content = element.content.replaceAll("\n", "");

                const media: HTMLElement | null = element.querySelector(selector.media);
                if (media && hide_media) media.style.display = "none";

                const decompress_button = document.createElement("button");
                decompress_button.className = "decompress-button";
                const decompress_button_normal: string = browser.i18n.getMessage("decompress_button_normal");
                decompress_button.textContent = decompress_button_normal;
                content_element.appendChild(decompress_button);
                decompress_button.addEventListener("click", () => {
                    content_element.innerHTML = element.dataset.rawHTML || "";
                    element.content = element.dataset.rawContent || "";

                    if (media && hide_media) media.style.display = "block";

                    decompress_button.remove();
                });
            } else {
                const decompress_button = document.createElement("button");
                decompress_button.setAttribute("class", element.getAttribute("class") || "");
                decompress_button.classList.add("show-tweet-button");

                const text_color = (() => {
                    const user_name_element = element.querySelector(selector.user_name);
                    if (user_name_element) return getComputedStyle(user_name_element).getPropertyValue("color");
                    else return "#1da1f2";
                })();

                decompress_button.style.color = text_color;

                const user_name = element.user_name;
                const user_id = element.user_id;
                const button_text: string = browser.i18n.getMessage("decompress_button_strict", [user_name, user_id]);
                decompress_button.textContent = button_text;
                decompress_button.addEventListener("click", () => {
                    element.style.display = "block";
                    decompress_button.remove();
                });

                element.style.display = "none";
                element.insertAdjacentElement("afterend", decompress_button);
            }
        };

        result.push(element);
    });
    return result;
}

async function run_check(setting: setting_object) {
    const exclude_url = setting.exclude_url;

    if (exclude_url.includes(location.href)) return;

    const check_target = get_unchecked_tweets();

    const compressor_mode = setting.strict_mode ? "strict" : "normal";
    const hide_media = setting.hide_media;

    for (let i = 0; i < check_target.length; i++) {
        const target = check_target[i];
        const is_spam = await detect_spam(target, setting);
        if (is_spam) target.compress(compressor_mode, hide_media);
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
