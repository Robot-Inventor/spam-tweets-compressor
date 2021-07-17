import { setting_object } from "./load_setting";
import { normalize } from "./normalize";
import { TweetElement } from "./tweet_element";


function detect_ng_word(text: string, ng_words: Array<string>) {
    for (let x = 0; x < ng_words.length; x++) {
        const word = normalize(ng_words[x]);

        if (!word) continue;

        const is_regex = Boolean(word.match(/^\/(.*)\/\D*$/));
        const regex_core_string = word.replace(/^\//, "").replace(/\/(\D*)$/, "");
        const regex_flag = word.replace(/^\/.*?\/(\D*)$/, "$1");
        const regex = new RegExp(regex_core_string, regex_flag);

        if (is_regex && text.match(regex)) return true;
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

export async function detect_spam(target: TweetElement, setting: setting_object) {
    const target_content = normalize(target.content);
    const breaks = target_content.match(/\n/g);
    const break_length = breaks ? breaks.length : 0;
    const has_too_many_breaks = break_length >= setting.break_threshold;

    const repeated_character = target_content.match(new RegExp(`(.)\\1{${setting.character_repetition_threshold},}`));

    const has_ng_word = detect_ng_word(target_content, setting.ng_word);

    const content_language = await target.language;
    const is_filtered_language = detect_filtered_language(content_language || "", setting.language_filter);

    if (has_too_many_breaks || repeated_character || has_ng_word || is_filtered_language) return true;
    else return false;
}
