export interface TweetElement extends HTMLElement {
    content: string;
    compress: Function;
    user_name: string;
    user_id: string;
    language: Promise<string>;
}
