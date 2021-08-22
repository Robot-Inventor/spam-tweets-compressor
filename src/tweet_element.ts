export interface TweetElement extends HTMLElement {
    content: string;
    compress: (reason?: string, decompress_on_hover?: boolean) => void;
    user_name: string;
    user_id: string;
    language: Promise<string>;
    hashtag: Array<string>;
    link: Array<string>;
}
