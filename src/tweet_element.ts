export interface TweetElement extends HTMLElement {
    content: string;
    compress: (compressor_mode: "normal" | "strict", hide_media: boolean, trim_leading_whitespace: boolean) => void;
    user_name: string;
    user_id: string;
    language: Promise<string>;
}
