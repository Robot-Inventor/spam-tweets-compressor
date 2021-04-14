const media_selector = {
    photo: ".css-1dbjc4n.r-1kqtdi0.r-1867qdf.r-1phboty.r-rs99b7.r-1s2bzr4.r-1ny4l3l.r-1udh08x.r-o7ynqc.r-6416eg",
    video_and_gif: ".css-1dbjc4n.r-1kqtdi0.r-1867qdf.r-1phboty.r-rs99b7.r-1s2bzr4.r-1ny4l3l.r-1udh08x",
    ogp_normal: ".css-1dbjc4n.r-1kqtdi0.r-1867qdf.r-1phboty.r-rs99b7.r-1ny4l3l.r-1udh08x.r-o7ynqc.r-6416eg",
    ogp_landscape: ".css-1dbjc4n.r-1kqtdi0.r-1867qdf.r-1phboty.r-rs99b7.r-18u37iz.r-1ny4l3l.r-1udh08x.r-o7ynqc.r-6416eg"
};
const media_selector_joined = Object.values(media_selector).join(", ");

const compression_threshold_height = screen.height * 0.8;
const compression_threshold_break_count = 5;

const tweet_parent_selector = ".css-1dbjc4n.r-1iusvr4.r-16y2uox.r-1777fci.r-kzbkwu"
const tweet_content_selector = ".css-901oao.r-1fmj7o5.r-1tl8opc.r-a023e6.r-16dba41.r-rjixqe.r-bcqeeo.r-bnwqim.r-qvutc0";

function compress() {
    document.querySelectorAll(tweet_parent_selector + ":not(.long-tweet-checked)").forEach((tweet_parent) => {
        const tweet_content = tweet_parent.querySelector(tweet_content_selector);

        if (tweet_content.offsetHeight > compression_threshold_height || (tweet_content.innerHTML.match(/\n/g).length || 0) > compression_threshold_break_count) {
            tweet_parent.classList.add("long-tweet");

            let has_media = false;
            tweet_parent.querySelectorAll(media_selector_joined).forEach((media) => {
                media.dataset.defaultDisplay = media.style.display;
                media.style.display = "none";
                has_media = true;
            });

            tweet_content.dataset.rawContent = tweet_content.innerHTML;
            tweet_content.innerHTML = tweet_content.dataset.compressedContent = tweet_content.innerHTML.replaceAll("\n", " ");

            const decompress_button = document.createElement("button");
            decompress_button.textContent = "Decompress";
            decompress_button.setAttribute("class", "decompress-button");

            decompress_button.addEventListener("click", () => {
                tweet_content.innerHTML = tweet_content.dataset.rawContent;
                tweet_parent.querySelectorAll(media_selector_joined).forEach((media) => {
                    media.style.display = media.dataset.defaultDisplay;
                });
            });

            tweet_content.appendChild(decompress_button);
            if (has_media) {
                tweet_content.insertAdjacentHTML("beforeend", "This Tweet has media.");
            }
        }

        tweet_parent.classList.add("long-tweet-checked");
    });
}

const observer_target = document.body;
const observer = new MutationObserver(() => {
    compress();
});
observer.observe(observer_target, {
    childList: true,
    subtree: true
});
