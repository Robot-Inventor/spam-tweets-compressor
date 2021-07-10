"use strict";
const selector = {
    tweet_outer: ".css-1dbjc4n.r-qklmqi.r-1adg3ll.r-1ny4l3l",
    tweet_content: ".css-901oao.r-1tl8opc.r-a023e6.r-16dba41.r-rjixqe.r-bcqeeo.r-bnwqim.r-qvutc0",
    timeline: "main",
    checked_tweet_class_name: "spam-tweets-compressor-checked",
    media: (() => {
        const media_selector = {
            image_selector: ".css-1dbjc4n.r-1867qdf.r-1phboty.r-rs99b7.r-1s2bzr4.r-1ny4l3l.r-1udh08x.r-o7ynqc.r-6416eg",
            video_selector: ".css-1dbjc4n.r-1867qdf.r-1phboty.r-rs99b7.r-1s2bzr4.r-1ny4l3l.r-1udh08x",
            summary_card: ".css-1dbjc4n.r-1867qdf.r-1phboty.r-rs99b7.r-18u37iz.r-1ny4l3l.r-1udh08x.r-o7ynqc.r-6416eg",
            summary_with_large_image: ".css-1dbjc4n.r-1867qdf.r-1phboty.r-rs99b7.r-1ny4l3l.r-1udh08x.r-o7ynqc.r-6416eg"
        };
        let merged = "";
        Object.keys(media_selector).forEach((key) => {
            merged += "," + media_selector[key];
        });
        merged = merged.replace(/^\,/, "");
        return merged;
    })()
};
;
class TweetElement extends HTMLElement {
    constructor() {
        super();
        this.content = "";
        this.compress = () => { };
    }
}
function get_unchecked_tweets(setting) {
    const tweets = document.querySelectorAll(`${selector.tweet_outer}:not(.${selector.checked_tweet_class_name})`);
    let result = [];
    tweets.forEach((element) => {
        element.classList.add(selector.checked_tweet_class_name);
        const content_element = element.querySelector(selector.tweet_content);
        if (content_element) {
            element.content = content_element.textContent || "";
            element.compress = function () {
                const raw_content = content_element.innerHTML;
                element.dataset.rawHTML = raw_content;
                element.dataset.rawContent = element.content;
                const compressed_content = content_element.innerHTML.replaceAll("\n", "");
                if (content_element)
                    content_element.innerHTML = compressed_content;
                element.content = element.content.replaceAll("\n", "");
                const media = element.querySelector(selector.media);
                if (media && setting.hide_media)
                    media.style.display = "none";
                const decompress_button = document.createElement("button");
                decompress_button.className = "decompress-button";
                decompress_button.textContent = "Decompress";
                content_element.appendChild(decompress_button);
                decompress_button.addEventListener("click", () => {
                    content_element.innerHTML = element.dataset.rawHTML || "";
                    element.content = element.dataset.rawContent || "";
                    if (media && setting.hide_media)
                        media.style.display = "block";
                    decompress_button.remove();
                });
            };
            result.push(element);
        }
    });
    return result;
}
function run_check(setting) {
    const check_target = get_unchecked_tweets(setting);
    for (let i = 0; i < check_target.length; i++) {
        const target = check_target[i];
        const breaks = target.content.match(/\n/g);
        if (breaks && breaks.length > setting.break_threshold)
            target.compress();
    }
}
browser.storage.local.get("setting").then((value) => {
    const setting = value.setting;
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
}).catch(() => {
    console.error("設定を読み込めませんでした1");
});
//# sourceMappingURL=main.js.map