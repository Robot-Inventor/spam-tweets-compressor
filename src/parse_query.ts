import { TweetElement } from "tweet_element";
import { normalize_link } from "./normalize";

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

export function parse(query: query_type, tweet: TweetElement): boolean {
    /* TODO: 正規表現機能、完全一致検索を実装する。
    完全一致検索については、完全一致か部分一致かを指定するプロパティーをquery_elementに追加する*/
    let result = query[0] === "and";

    query[1].forEach((query_object) => {
        let judgement = false;

        if (is_query_element(query_object)) {
            let includes_text = false;

            if (query_object.type === "text") includes_text = tweet.content.includes(query_object.string);
            else if (query_object.type === "hashtag") includes_text = tweet.hashtag.includes(query_object.string);
            else if (query_object.type === "id") includes_text = tweet.user_id.includes(query_object.string);
            else if (query_object.type === "name") includes_text = tweet.user_name.includes(query_object.string);
            else if (query_object.type === "link") includes_text = tweet.link.includes(normalize_link(query_object.string));

            judgement = query_object.mode === "include" ? includes_text : !includes_text;
        } else {
            judgement = parse(query_object, tweet);
        }

        if (query[0] === "and" && !judgement) result = false;
        else if (query[0] === "or" && judgement) result = true;
    });

    return result;
}
