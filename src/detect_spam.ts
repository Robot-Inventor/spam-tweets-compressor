import { setting_object } from "./load_setting";
import { normalize } from "./normalize";
import { selector } from "./selector";
import { TweetElement } from "./tweet_element";


function detect_ng_word(text: string, ng_words: Array<string>) {
    for (let x = 0; x < ng_words.length; x++) {
        const word = normalize(ng_words[x]);

        if (!word) continue;

        const is_regex = /^\/(.*)\/\D*$/.test(word);
        const regex_core_string = word.replace(/^\//, "").replace(/\/(\D*)$/, "");
        const regex_flag = word.replace(/^\/.*?\/(\D*)$/, "$1");
        const regex = new RegExp(regex_core_string, regex_flag);

        if (is_regex && regex.test(text)) return true;
        if (text.includes(word)) return true;
    }
    return false;
}

function detect_filtered_language(target_language: string, language_filter: Array<string>) {
    for (let i = 0; i < language_filter.length; i++) {
        const filter = language_filter[i];
        if (target_language === filter) return true;
    }
    return false;
}

function detect_verified_badge(tweet: TweetElement) {
    return Boolean(tweet.querySelector(selector.verified_badge));
}

export async function detect_spam(target: TweetElement, setting: setting_object): Promise<boolean> {
    const target_content = normalize(target.content);
    const breaks = target_content.match(/\n/g);
    const break_length = breaks ? breaks.length : 0;
    const has_too_many_breaks = break_length >= setting.break_threshold;

    const repeated_character = new RegExp(`(.)\\1{${setting.character_repetition_threshold},}`).test(target_content);

    const has_ng_word = detect_ng_word(target_content, setting.ng_word);

    const content_language = await target.language;
    const is_filtered_language = detect_filtered_language(content_language || "", setting.language_filter);

    const has_verified_badge = detect_verified_badge(target);

    const normal_judgement = has_too_many_breaks || repeated_character || has_ng_word || is_filtered_language;
    return normal_judgement && !has_verified_badge;
}
