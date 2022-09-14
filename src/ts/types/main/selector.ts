type selector_property =
    | "checked_tweet_class_name"
    | "hashtag_link_mention"
    | "link_scheme_outer"
    | "normal_text"
    | "show_tweet_button"
    | "timeline"
    | "tweet_button_inner"
    | "tweet_content"
    | "tweet_outer"
    | "user_id"
    | "user_name"
    | "verified_badge";

type Selector = {
    readonly [key in selector_property]: string;
};

export { Selector };
