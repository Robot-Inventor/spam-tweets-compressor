import { detect_spam } from "./detect_spam";
import { load_setting, setting_object } from "./load_setting";
import { selector } from "./selector";
import { TweetAnalyser } from "./tweet_analyser";
import { TweetElement } from "./tweet_element";


function get_unchecked_tweets() {
    const tweets: NodeListOf<TweetElement> = document.querySelectorAll(`${selector.tweet_outer}:not(.${selector.checked_tweet_class_name})`);
    const result: Array<TweetElement> = [];

    function get_ready(tweet: TweetElement) {
        tweet.classList.add(selector.checked_tweet_class_name);

        const analyser: TweetAnalyser = new TweetAnalyser(tweet);

        tweet.content = analyser.get_content();
        tweet.user_name = analyser.get_user_name();
        tweet.user_id = analyser.get_user_id();
        tweet.language = analyser.get_language();
        tweet.compress = (compressor_mode: "normal" | "strict", hide_media: boolean, trim_leading_whitespace: boolean) => {
            analyser.compress(compressor_mode, hide_media, trim_leading_whitespace);
        };
        tweet.hashtag = analyser.get_hashtag();

        result.push(tweet);
    }

    tweets.forEach(get_ready);
    return result;
}

async function run_check(setting: setting_object) {
    const exclude_url = setting.exclude_url;

    if (exclude_url.includes(location.href)) return;

    const check_target = get_unchecked_tweets();

    const compressor_mode = setting.strict_mode ? "strict" : "normal";
    const hide_media = setting.hide_media;
    const trim_leading_whitespace = setting.trim_leading_whitespace;

    for (let i = 0; i < check_target.length; i++) {
        const target = check_target[i];
        const is_spam = await detect_spam(target, setting);
        if (is_spam) target.compress(compressor_mode, hide_media, trim_leading_whitespace);
    }
}

void (async () => {
    const setting = await load_setting();
    const body_observer_target = document.body;
    const body_observer = new MutationObserver(() => {
        const timeline = document.querySelector(selector.timeline);

        if (timeline) {
            body_observer.disconnect();

            const main_observer_target = timeline;
            const main_observer = new MutationObserver(() => {
                void run_check(setting);
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
