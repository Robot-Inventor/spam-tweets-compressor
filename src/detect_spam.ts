import { setting_object } from "./setting";
import { normalize } from "./normalize";
import { selector } from "./selector";
import { TweetElement } from "./tweet_element";
import { is_regexp, parse_regexp } from "./parse_regexp";
import { advanced_spam_detection, query_type } from "./advanced_spam_detection";

/**
 * Return weather or not the target text includes NG words.
 * @param text target text
 * @param ng_words NG wards
 * @returns weather the target text includes NG words or not.
 */
function detect_ng_word(text: string, ng_words: Array<string>) {
    for (const word of ng_words) {
        if (!word) continue;

        if (is_regexp(word) && parse_regexp(word).test(text)) return true;
        if (text.includes(word)) return true;
    }
    return false;
}

/**
 * If the account that posted the tweet has verified badge, return true.
 * @param tweet target tweet
 * @returns does the account have verified badge.
 */
function detect_verified_badge(tweet: TweetElement) {
    return Boolean(tweet.querySelector(selector.verified_badge));
}

/**
 * Determine if a tweet is spam.
 * @param target target tweet
 * @param setting setting
 * @param advanced_filter advanced filter data for Advanced Spam Detection
 * @returns is the tweet spam
 */
export function detect_spam(
    target: TweetElement,
    setting: setting_object,
    advanced_filter: query_type
): [false] | [true, string] {
    const normal_judgement = (() => {
        const content = normalize(target.content);

        const has_ng_word =
            detect_ng_word(content, setting.ng_word) ||
            (setting.include_user_name && detect_ng_word(normalize(target.user_name), setting.ng_word));
        if (has_ng_word) return browser.i18n.getMessage("compress_reason_ng_word");

        const advanced_detection = advanced_spam_detection(advanced_filter, target);
        if (advanced_detection) return browser.i18n.getMessage("compress_reason_advanced_detection_default");

        return false;
    })();

    const has_verified_badge = detect_verified_badge(target);
    const verified_badge_judgement = has_verified_badge && !setting.include_verified_account;

    return normal_judgement !== false && !verified_badge_judgement ? [true, normal_judgement] : [false];
}
