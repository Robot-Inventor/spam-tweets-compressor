const media_selector = {
    photo: ".css-1dbjc4n.r-1kqtdi0.r-1867qdf.r-1phboty.r-rs99b7.r-1s2bzr4.r-1ny4l3l.r-1udh08x.r-o7ynqc.r-6416eg",
    video_and_gif: ".css-1dbjc4n.r-1kqtdi0.r-1867qdf.r-1phboty.r-rs99b7.r-1s2bzr4.r-1ny4l3l.r-1udh08x",
    ogp_normal: ".css-1dbjc4n.r-1kqtdi0.r-1867qdf.r-1phboty.r-rs99b7.r-1ny4l3l.r-1udh08x.r-o7ynqc.r-6416eg",
    ogp_landscape: ".css-1dbjc4n.r-1kqtdi0.r-1867qdf.r-1phboty.r-rs99b7.r-18u37iz.r-1ny4l3l.r-1udh08x.r-o7ynqc.r-6416eg"
};
const media_selector_joined = Object.values(media_selector).join(", ");

const compression_threshold_height = screen.height * 0.8;
const compression_threshold_break_count = 5;

const tweet_parent_selector = ".css-1dbjc4n.r-1iusvr4.r-16y2uox.r-1777fci.r-kzbkwu";
const tweet_content_selector = ".css-901oao.r-1tl8opc.r-a023e6.r-16dba41.r-rjixqe.r-bcqeeo.r-bnwqim.r-qvutc0";
const hashtag_selector = ".css-4rbku5.css-18t94o4.css-901oao.css-16my406.r-1loqt21.r-poiln3.r-bcqeeo.r-qvutc0";
const timeline_selector = "main";

class Tweet {
    constructor(tweet_parent) {
        this.tweet_parent = tweet_parent;
        this.tweet_content_element = this.tweet_parent.querySelector(tweet_content_selector);
    }

    compress() {
        let has_media = false;
        this.tweet_parent.querySelectorAll(media_selector_joined).forEach((media) => {
            media.dataset.defaultDisplay = media.style.display;
            media.style.display = "none";
            has_media = true;
        });

        this.tweet_content_element.dataset.rawContent = this.tweet_content_element.innerHTML;
        this.tweet_content_element.innerHTML = this.tweet_content_element.innerHTML.replaceAll("\n", " ");

        const decompress_button = document.createElement("button");
        decompress_button.textContent = "Decompress";
        decompress_button.setAttribute("class", "decompress-button");

        decompress_button.addEventListener("click", () => {
            this.tweet_content_element.innerHTML = this.tweet_content_element.dataset.rawContent;
            this.tweet_parent.querySelectorAll(media_selector_joined).forEach((media) => {
                media.style.display = media.dataset.defaultDisplay;
            });
        });

        this.tweet_content_element.appendChild(decompress_button);
        if (has_media) {
            this.tweet_content_element.insertAdjacentHTML("beforeend", "This Tweet has media.");
        }
    }

    get content() {
        return this.tweet_content_element.textContent;
    }

    get content_height() {
        return this.tweet_content_element.offsetHeight;
    }
}

function get_unchecked() {
    return document.querySelectorAll(tweet_parent_selector + ":not(.long-tweet-checked)");
}

function mark_as_checked(tweet_parent) {
    tweet_parent.classList.add("long-tweet-checked");
}

function run_check() {
    get_unchecked().forEach((tweet_parent) => {
        mark_as_checked(tweet_parent);

        const target = new Tweet(tweet_parent);

        const is_long = target.content_height > compression_threshold_height;
        const has_many_breaks = (target.content.match(/\n/g).length || 0) > compression_threshold_break_count;

        console.log(target.hashtag);
        if (is_long || has_many_breaks) {
            target.compress();
        }
    });
}

const body_observer_target = document.body;
const body_observer = new MutationObserver(() => {
    const timeline = document.querySelector(timeline_selector);

    if (timeline) {
        body_observer.disconnect();

        const main_observer_target = timeline;
        const main_observer = new MutationObserver(run_check);
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
