export interface TweetElement extends HTMLElement {
    content: string;
    compress: (reason?: string) => void;
    user_name: string;
    user_id: string;
    language: Promise<string>;
    hashtag: Array<string>;
    link: Array<string>;
}
