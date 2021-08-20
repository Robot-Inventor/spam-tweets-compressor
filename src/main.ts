import { query_object, query_type } from "./advanced_spam_detection";
import { detect_spam } from "./detect_spam";
import { Setting, setting_object } from "./setting";
import { selector } from "./selector";
import { TweetAnalyser } from "./tweet_analyser";
import { TweetElement } from "./tweet_element";
import { advanced_filter_type } from "./advanced_filter_type";
import { normalize_user_id } from "./normalize";
import { load_color_setting, update_color_setting } from "./color";


function get_unchecked_tweets() {
    const tweets: NodeListOf<TweetElement> = document.querySelectorAll(`${selector.tweet_outer}:not(.${selector.checked_tweet_class_name})`);
    const result: Array<TweetElement> = [];

    function get_ready(tweet: TweetElement) {
        tweet.classList.add(selector.checked_tweet_class_name);

        const analyser: TweetAnalyser = new TweetAnalyser(tweet);

        if (analyser.get_content() !== null && analyser.get_user_id() === null && !document.cookie.includes("stc_show_user_id_error=true;")) {
            alert(browser.i18n.getMessage("error_message_user_id_bug"));
            document.cookie = "stc_show_user_id_error=true;max-age=86400";
            return;
        }

        tweet.content = analyser.get_content() || "";
        tweet.user_name = analyser.get_user_name();
        tweet.user_id = analyser.get_user_id() || "";
        tweet.language = analyser.get_language();
        tweet.compress = (reason?: string) => {
            analyser.compress(reason);
        };
        tweet.hashtag = analyser.get_hashtag();
        tweet.link = analyser.get_link();

        result.push(tweet);
    }

    tweets.forEach(get_ready);
    return result;
}

function reset_check_status() {
    document.querySelectorAll("." + selector.checked_tweet_class_name).forEach((element) => {
        element.classList.remove(selector.checked_tweet_class_name);
    });
}

function decompress_all() {
    const tweets: NodeListOf<TweetElement> = document.querySelectorAll(selector.show_tweet_button);
    tweets.forEach((element) => element.click());
}

function run_check(setting: setting_object, advanced_filter: query_type) {
    const exclude_url = setting.exclude_url;

    if (exclude_url.includes(location.href)) return;

    const check_target = get_unchecked_tweets();

    for (const target of check_target) {
        if (setting.allow_list.map((v) => { return normalize_user_id(v); }).includes(target.user_id)) continue;

        const judgement = detect_spam(target, setting, advanced_filter);
        if (judgement[0]) {
            if (setting.show_reason) target.compress(judgement[1]);
            else target.compress();
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
        if (!(filter_name in filter_url_data)) continue;

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const filter_data: query_object = await get_json(filter_url_data[filter_name].url);
        filter_list.push(filter_data.rule);
    }
    const joined_advanced_filter: query_type = ["or", [...filter_list]];
    return joined_advanced_filter;
}

void (async () => {
    const setting_class = new Setting();
    const setting = await setting_class.load();

    let joined_advanced_filter: query_type = await load_advanced_filter(setting.advanced_filter);
    setInterval(() => {
        void (async () => {
            joined_advanced_filter = await load_advanced_filter(setting.advanced_filter);
        })();
    }, 86400);

    setting_class.onChange(() => {
        void (async () => {
            joined_advanced_filter = await load_advanced_filter(setting.advanced_filter);
        })();
        decompress_all();
        reset_check_status();
    });

    const body_observer_target = document.body;
    const body_observer = new MutationObserver(() => {
        const timeline = document.querySelector(selector.timeline);

        if (timeline) {
            body_observer.disconnect();

            void (async () => {
                await update_color_setting();
                await load_color_setting();
            })();

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
