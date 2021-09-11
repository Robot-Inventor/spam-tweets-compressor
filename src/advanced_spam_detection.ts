import { is_regexp, parse_regexp } from "./parse_regexp";
import { normalize_hashtag, normalize_link, normalize_user_id } from "./normalize";
import { TweetElementInterface } from "./tweet_element";

interface query_element {
    mode: "include" | "exclude";
    type: "text" | "hashtag" | "name" | "id" | "link";
    string: string;
}

export type query_type = ["and" | "or", Array<query_element | query_type>];

export interface query_object {
    rule: query_type;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const query_example: query_object = {
    rule: [
        "and",
        [
            {
                mode: "include",
                string: "spam spam",
                type: "text"
            },
            {
                mode: "exclude",
                string: "i am spam",
                type: "name"
            },
            {
                mode: "include",
                string: "/spam.*+/i",
                type: "id"
            },
            {
                mode: "exclude",
                string: "spam",
                type: "hashtag"
            },
            [
                "or",
                [
                    {
                        mode: "exclude",
                        string: "twitter.com/home",
                        type: "link"
                    },
                    {
                        mode: "include",
                        string: "i'm spam",
                        type: "text"
                    }
                ]
            ]
        ]
    ]
};

/**
 * Return if the type of target variable is query_element.
 * @param argument target variable
 * @returns weather or not the target variable is query_element
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const is_query_element = (argument: any): argument is query_element =>
    argument !== null &&
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
const advanced_spam_detection = (query: query_type, tweet: TweetElementInterface): boolean => {
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
