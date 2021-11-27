import { is_query_element, query_type } from "../types/main/advanced_spam_detection";
import { is_regexp, parse_regexp } from "./parse_regexp";
import { normalize_hashtag, normalize_link, normalize_user_id } from "./normalize";
import { TweetElement } from "./tweet_element";

const judge = (target: string | Array<string>, pattern: string) => {
    const is_regex = is_regexp(pattern);

    if (typeof target === "string") {
        if (is_regex) return parse_regexp(pattern).test(target);
        else return target.includes(pattern);
    } else {
        let result = false;
        target.forEach((str) => {
            if ((is_regex && parse_regexp(pattern).test(str)) || str === pattern) result = true;
        });
        return result;
    }
};

/**
 * Detect spam with advanced filter.
 * @param query advanced filter
 * @param tweet target tweet
 * @returns weather or not the target tweet is spam
 */
const advanced_spam_detection = (query: query_type, tweet: TweetElement): boolean => {
    let result = query[0] === "and";

    query[1].forEach((query_obj) => {
        let judgement = false;

        if (is_query_element(query_obj)) {
            let includes_text = false;

            switch (query_obj.type) {
                case "text":
                    includes_text = judge(tweet.content, query_obj.string);
                    break;

                case "hashtag":
                    includes_text = judge(tweet.hashtag, normalize_hashtag(query_obj.string));
                    break;

                case "id":
                    includes_text = judge(tweet.user_id, normalize_user_id(query_obj.string));
                    break;

                case "name":
                    includes_text = judge(tweet.user_name, query_obj.string);
                    break;

                case "link":
                    includes_text = judge(
                        tweet.link,
                        is_regexp(query_obj.string) ? query_obj.string : normalize_link(query_obj.string)
                    );
                    break;

                default:
                    includes_text = false;
            }

            judgement = query_obj.mode === "include" ? includes_text : !includes_text;
        } else {
            judgement = advanced_spam_detection(query_obj, tweet);
        }

        if (query[0] === "and" && !judgement) result = false;
        else if (query[0] === "or" && judgement) result = true;
    });

    return result;
};

export { advanced_spam_detection };
