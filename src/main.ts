import { query_object, query_type } from "./advanced_spam_detection";
import { detect_spam } from "./detect_spam";
import { load_setting, setting_object } from "./load_setting";
import { selector } from "./selector";
import { TweetAnalyser } from "./tweet_analyser";
import { TweetElement } from "./tweet_element";
import { advanced_filter_type } from "./advanced_filter_type";
import { normalize_user_id } from "./normalize";


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
        tweet.compress = (compressor_mode: "normal" | "strict", hide_media: boolean, trim_leading_whitespace: boolean, reason?: string) => {
            if (reason) analyser.compress(compressor_mode, hide_media, trim_leading_whitespace, reason);
            else analyser.compress(compressor_mode, hide_media, trim_leading_whitespace);
        };
        tweet.hashtag = analyser.get_hashtag();
        tweet.link = analyser.get_link();

        result.push(tweet);
    }

    tweets.forEach(get_ready);
    return result;
}

async function run_check(setting: setting_object, advanced_filter: query_type) {
    const exclude_url = setting.exclude_url;

    if (exclude_url.includes(location.href)) return;

    const check_target = get_unchecked_tweets();

    const compressor_mode = setting.strict_mode ? "strict" : "normal";
    const hide_media = setting.hide_media;
    const trim_leading_whitespace = setting.trim_leading_whitespace;

    for (const target of check_target) {
        if (setting.allow_list.map((v) => { return normalize_user_id(v); }).includes(target.user_id)) continue;

        const judgement = await detect_spam(target, setting, advanced_filter);
        if (judgement[0]) {
            if (setting.show_reason) target.compress(compressor_mode, hide_media, trim_leading_whitespace, judgement[1]);
            else target.compress(compressor_mode, hide_media, trim_leading_whitespace);
        }
    }
}

async function get_json(url: string) {
    // deepcode ignore Ssrf: <This is because the function is to read only the trusted files listed in dist/advanced_filter.json.>
    const response = await fetch(url);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const json = await response.json();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return json;
}

async function load_advanced_filter(filter_name_list: Array<string>) {
    const filter_list: Array<query_type> = [];

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const filter_url_data: advanced_filter_type = await get_json("https://cdn.statically.io/gh/Robot-Inventor/stc-filter/main/dist/advanced_filter.json");
    for (const filter_name of filter_name_list) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const filter_data: query_object = await get_json(filter_url_data[filter_name].url);
        filter_list.push(filter_data.rule);
    }
    const joined_advanced_filter: query_type = ["or", [...filter_list]];
    return joined_advanced_filter;
}

void (async () => {
    const setting = await load_setting();

    let joined_advanced_filter: query_type = await load_advanced_filter(setting.advanced_filter);
    setInterval(() => {
        void (async () => {
            joined_advanced_filter = await load_advanced_filter(setting.advanced_filter);
        })();
    }, 86400);

    const body_observer_target = document.body;
    const body_observer = new MutationObserver(() => {
        const timeline = document.querySelector(selector.timeline);

        if (timeline) {
            body_observer.disconnect();

            const main_observer_target = timeline;
            const main_observer = new MutationObserver(() => {
                void run_check(setting, joined_advanced_filter);
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
