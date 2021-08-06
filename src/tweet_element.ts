export interface TweetElement extends HTMLElement {
    content: string;
    compress: (compressor_mode: "normal" | "strict", hide_media: boolean, reason?: string) => void;
    user_name: string;
    user_id: string;
    language: Promise<string>;
    hashtag: Array<string>;
    link: Array<string>;
}
