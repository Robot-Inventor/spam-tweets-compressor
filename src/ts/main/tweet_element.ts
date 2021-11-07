import { TweetAnalyser } from "./tweet_analyser";
import { selector } from "./selector";

export interface TweetElement extends HTMLElement {
    content: string;
    compress: (hide_completely: boolean, decompress_on_hover: boolean, reason?: string) => void;
    user_name: string;
    user_id: string;
    language: Promise<string>;
    hashtag: Array<string>;
    link: Array<string>;
}

const generate_tweet_element = (tweet: TweetElement): TweetElement => {
    tweet.classList.add(selector.checked_tweet_class_name);

    const analyser = new TweetAnalyser(tweet);

    const user_id_bug_exclude_list: ReadonlyArray<string> = ["/notifications"];

    const user_id_bug_cookie = {
        content: "stc_show_user_id_error=true",
        max_age: "max-age=86400"
    } as const;
    if (
        !user_id_bug_exclude_list.includes(location.pathname) &&
        analyser.content !== null &&
        analyser.user_id === null &&
        !document.cookie.includes(user_id_bug_cookie.content)
    ) {
        // eslint-disable-next-line no-alert
        alert(browser.i18n.getMessage("error_message_user_id_bug"));
        document.cookie = `${user_id_bug_cookie.content};${user_id_bug_cookie.max_age}`;
    }

    tweet.content = analyser.content || "";
    tweet.user_name = analyser.user_name;
    tweet.user_id = analyser.user_id || "";
    tweet.language = analyser.language;
    tweet.compress = (hide_completely: boolean, decompress_on_hover: boolean, reason?: string) => {
        if (hide_completely) analyser.hide_completely();
        else analyser.compress(reason, decompress_on_hover);
    };
    tweet.hashtag = analyser.hashtag;
    tweet.link = analyser.link;

    return tweet;
};

export { generate_tweet_element };
