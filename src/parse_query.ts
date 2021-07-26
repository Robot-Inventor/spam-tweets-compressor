import { TweetElement } from "tweet_element";
import { normalize_link } from "./normalize";
import { is_regexp, parse_regexp } from "./parse_regexp";
import { TweetAnalyser } from "./tweet_analyser";

interface query_element {
    mode: "include" | "exclude",
    type: "text" | "hashtag" | "name" | "id" | "link",
    string: string
}

type query_type = ["and" | "or", Array<query_element | query_type>];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const query_example: query_type = [
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
];

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
    if (typeof target === "string") {
        if (is_regexp(pattern)) return parse_regexp(pattern).test(target);
        else return pattern.includes(target);
    } else {
        let result = false;
        target.forEach((t) => {
            if (judge(t, pattern)) result = true;
        });
        return result;
    }
}

export function parse(query: query_type, tweet: TweetElement): boolean {
    let result = query[0] === "and";

    query[1].forEach((query_object) => {
        let judgement = false;

        if (is_query_element(query_object)) {
            let includes_text = false;

            if (query_object.type === "text") includes_text = judge(tweet.content, query_object.string);
            else if (query_object.type === "hashtag") includes_text = judge(tweet.hashtag, new TweetAnalyser(tweet).remove_hash_symbol(query_object.string));
            else if (query_object.type === "id") includes_text = judge(tweet.user_id, query_object.string);
            else if (query_object.type === "name") includes_text = judge(tweet.user_name, query_object.string);
            else if (query_object.type === "link") includes_text = judge(tweet.link, normalize_link(query_object.string));

            judgement = query_object.mode === "include" ? includes_text : !includes_text;
        } else {
            judgement = parse(query_object, tweet);
        }

        if (query[0] === "and" && !judgement) result = false;
        else if (query[0] === "or" && judgement) result = true;
    });

    return result;
}
