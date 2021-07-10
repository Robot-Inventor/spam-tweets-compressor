"use strict";
const selector = {
    tweet_outer: ".css-1dbjc4n.r-qklmqi.r-1adg3ll.r-1ny4l3l",
    tweet_content: ".css-901oao.r-1tl8opc.r-a023e6.r-16dba41.r-rjixqe.r-bcqeeo.r-bnwqim.r-qvutc0",
    timeline: "main",
    checked_tweet_class_name: "spam-tweets-compressor-checked"
};
;
function get_unchecked_tweets() {
    const tweets = document.querySelectorAll(`${selector.tweet_outer}:not(.${selector.checked_tweet_class_name})`);
    let result = [];
    tweets.forEach((element) => {
        element.classList.add(selector.checked_tweet_class_name);
        const content_element = element.querySelector(selector.tweet_content);
        element.content = content_element.textContent;
        element.compress = function () {
            const raw_content = content_element.innerHTML;
            element.dataset.rawContent = raw_content;
            const compressed_content = content_element.innerHTML.replaceAll("\n", "");
            if (content_element)
                content_element.innerHTML = compressed_content;
            element.content = content_element.textContent.replaceAll("\n", "");
            const decompress_button = document.createElement("button");
            decompress_button.className = "decompress-button";
            decompress_button.textContent = "Decompress";
            content_element.appendChild(decompress_button);
            decompress_button.addEventListener("click", () => {
                content_element.innerHTML = element.dataset.rawContent;
                element.content = content_element.textContent.replaceAll("\n", "");
                decompress_button.remove();
            });
        };
        result.push(element);
    });
    return result;
}
function run_check(setting) {
    const check_target = get_unchecked_tweets();
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