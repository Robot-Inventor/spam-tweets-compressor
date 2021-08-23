export const hash_symbol: ReadonlyArray<string> = ["#", "＃"];

export function normalize(text: string): string {
    text = text
        .normalize("NFKC")
        .toLowerCase()
        .replace(/[ぁ-ん]/g, (s: string) => {
            return String.fromCharCode(s.charCodeAt(0) + 0x60);
        });
    return text;
}

export function normalize_link(text: string): string {
    return text
        .replace(/^https?:\/\/(www\.)?/i, "")
        .replace(/\/(index.html)?$/, "")
        .replace(/^.+?\//, (s) => s.toLowerCase());
}

export function normalize_hashtag(text: string): string {
    return normalize(text.replace(new RegExp(`^[${hash_symbol.join()}]`), ""));
}

export function normalize_user_id(text: string): string {
    return normalize(text.replace(/^[@＠]/, ""));
}
