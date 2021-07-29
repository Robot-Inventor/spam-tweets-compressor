import { TweetElement } from "tweet_element";
import { browser_interface } from "./browser";
import { normalize_hashtag, normalize_link, normalize_user_id } from "./normalize";
import { is_regexp, parse_regexp } from "./parse_regexp";


declare const browser: browser_interface;

interface query_element {
    mode: "include" | "exclude",
    type: "text" | "hashtag" | "name" | "id" | "link",
    string: string
}

interface reason_type {
    default: string,
    [key: string]: string
}

export type query_type = ["and" | "or", Array<query_element | query_type>, reason_type?];

export interface query_object {
    rule: query_type
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const query_example: query_object = {
    rule: [
        "and", [
            {
                mode: "include",
                type: "text",
                string: "spam spam"
            },
            {
                mode: "exclude",
                type: "name",
                string: "i am spam"
            },
            {
                mode: "include",
                type: "id",
                string: "/spam.*+/i"
            },
            {
                mode: "exclude",
                type: "hashtag",
                string: "spam"
            },
            [
                "or", [
                    {
                        mode: "exclude",
                        type: "link",
                        string: "twitter.com/home"
                    },
                    {
                        mode: "include",
                        type: "text",
                        string: "i'm spam",
                    }
                ]
            ]
        ]
    ]
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function is_query_element(argument: any): argument is query_element {
    return argument !== null &&
        typeof argument === "object" &&
        "mode" in argument &&
        "type" in argument &&
        "string" in argument &&
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        typeof argument.mode === "string" &&
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        typeof argument.type === "string" &&
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        typeof argument.string === "string";
}

function judge(target: string | Array<string>, pattern: string) {
    const is_regex = is_regexp(pattern);

    if (typeof target === "string") {
        if (is_regex) return parse_regexp(pattern).test(target);
        else return target.includes(pattern);
    } else {
        let result = false;
        target.forEach((t) => {
            if ((is_regex && parse_regexp(pattern).test(t)) || t === pattern) result = true;
        });
        return result;
    }
}

export function advanced_spam_detection(query: query_type, tweet: TweetElement): [false] | [true, string] {
    const default_reason = browser.i18n.getMessage("compress_reason_advanced_detection_default");
    let result: [false] | [true, string] = query[0] === "and" ? [true, default_reason] : [false];
    let reason = default_reason;
    const language = browser.i18n.getMessage("language");
    if (query.length === 3 && query[2]) reason = language in query[2] ? query[2][language] : query[2].default;

    query[1].forEach((query_object) => {
        let judgement: [boolean, string?] = [false];

        if (is_query_element(query_object)) {
            let includes_text = false;

            if (query_object.type === "text") includes_text = judge(tweet.content, query_object.string);
            else if (query_object.type === "hashtag") includes_text = judge(tweet.hashtag, normalize_hashtag(query_object.string));
            else if (query_object.type === "id") includes_text = judge(tweet.user_id, normalize_user_id(query_object.string));
            else if (query_object.type === "name") includes_text = judge(tweet.user_name, query_object.string);
            else if (query_object.type === "link") includes_text = judge(tweet.link, (() => {
                if (is_regexp(query_object.string)) return query_object.string;
                else return normalize_link(query_object.string);
            })());

            judgement = [query_object.mode === "include" ? includes_text : !includes_text];
        } else {

            judgement = advanced_spam_detection(query_object, tweet);

            if (judgement.length === 2 && judgement[1] && judgement[1] !== default_reason) reason = judgement[1];
        }

        const should_override_reason = result.length === 1 || result[1] === default_reason || reason !== default_reason;
        if (query[0] === "and") {
            if (!judgement[0]) result = [false];
            else if (should_override_reason) result = [true, reason];
        }
        else if (query[0] === "or") {
            if (judgement[0] && should_override_reason) result = [true, reason];
        }
    });

    return result;
}
