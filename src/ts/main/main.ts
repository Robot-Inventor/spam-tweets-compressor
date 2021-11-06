import { Setting, setting_object } from "../common/setting";
import { TweetElement, TweetElementInterface } from "./tweet_element";
import { load_color_setting, update_color_setting } from "../common/color";
import { query_object, query_type } from "./advanced_spam_detection";
import { advanced_filter_type } from "../common/advanced_filter_type";
import { detect_spam } from "./detect_spam";
import { normalize_user_id } from "./normalize";
import { selector } from "./selector";

const tweet_element = new TweetElement();

/**
 * Return an array of unchecked tweets.
 * @returns unchecked Tweets
 */
const get_unchecked_tweets = (): Array<TweetElementInterface> => {
    const tweets: NodeListOf<TweetElementInterface> = document.querySelectorAll(
        `${selector.tweet_outer}:not(.${selector.checked_tweet_class_name})`
    );

    return [...tweets].map((tweet) => tweet_element.generate(tweet));
};

/**
 * Mark all tweets as unchecked.
 */
const reset_check_status = () => {
    document
        .querySelectorAll(`.${selector.checked_tweet_class_name}`)
        .forEach((element) => element.classList.remove(selector.checked_tweet_class_name));
};

/**
 * Decompress all compressed tweets.
 */
const decompress_all = () => {
    const tweets: NodeListOf<TweetElementInterface> = document.querySelectorAll(selector.show_tweet_button);
    tweets.forEach((element) => element.click());
};

/**
 * Detect spam tweets and compress or hide them.
 * @param setting setting
 * @param advanced_filter advanced filter data
 */
const run_check = (setting: setting_object, advanced_filter: query_type) => {
    const { exclude_url } = setting;

    if (exclude_url.includes(location.href)) return;

    const check_target = get_unchecked_tweets().filter(
        (target) => setting.allow_list.map(normalize_user_id).includes(target.user_id) === false
    );

    for (const target of check_target) {
        const judgement = detect_spam(target, setting, advanced_filter);
        if (judgement[0]) {
            if (setting.show_reason) {
                target.compress(setting.hide_completely, judgement[1], setting.decompress_on_hover);
            } else {
                // eslint-disable-next-line no-undefined
                target.compress(setting.hide_completely, undefined, setting.decompress_on_hover);
            }
        }
    }
};

/**
 * Get JSON data as an object from specified URL.
 * @param url target URL
 * @returns Object
 */
const get_json = async (url: string) => {
    // Deepcode ignore Ssrf: <This is because the function is to read only the trusted files.>
    const response = await fetch(url, { cache: "no-cache" });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const json = await response.json();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return json;
};

/**
 * Download and merge specified advanced filters.
 * @param filter_id_list ID list of filters
 * @returns advanced filter data.
 */
const load_advanced_filter = async (filter_id_list: Array<string>) => {
    const filter_list: Array<Promise<query_type>> = [];

    const filter_url_data = (await get_json(
        "https://cdn.statically.io/gh/Robot-Inventor/stc-filter/main/dist/advanced_filter.json?dev=0"
    )) as advanced_filter_type;

    const url_list = Object.keys(filter_url_data)
        .filter((key) => filter_id_list.includes(filter_url_data[key].id))
        .map((key) => filter_url_data[key].url);

    const get_rule = async (url: string) => {
        const data = (await get_json(url)) as query_object;
        return data.rule;
    };

    for (const url of url_list) {
        filter_list.push(get_rule(url));
    }

    const joined_advanced_filter: query_type = ["or", [...(await Promise.all(filter_list))]];
    return joined_advanced_filter;
};

(async () => {
    const setting_instance = new Setting();
    const setting = await setting_instance.load();

    let joined_advanced_filter: query_type = await load_advanced_filter(setting.advanced_filter);

    const reload_filter = async () => {
        joined_advanced_filter = await load_advanced_filter(setting.advanced_filter);
    };

    /**
     * Reload every 24 hours.
     */
    // eslint-disable-next-line no-magic-numbers
    const filter_reload_interval = 1000 * 60 * 60 * 24;
    setInterval(() => void reload_filter(), filter_reload_interval);

    setting_instance.onChange(() => {
        void (async () => {
            await reload_filter();
            decompress_all();
            reset_check_status();
        })();
    });

    const body_observer_target = document.body;
    const body_observer = new MutationObserver(() => {
        const timeline = document.querySelector(selector.timeline);

        if (timeline) {
            body_observer.disconnect();

            update_color_setting()
                .then(load_color_setting)
                .catch((error) => console.error(error));

            const main_observer_target = timeline;
            const main_observer = new MutationObserver(() => void run_check(setting, joined_advanced_filter));
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
})().catch((err) => console.error(err));
