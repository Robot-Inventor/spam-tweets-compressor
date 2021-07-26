export function normalize(text: string): string {
    text = text.normalize("NFKC").toLowerCase().replace(/[ぁ-ん]/g, (s: string) => {
        return String.fromCharCode(s.charCodeAt(0) + 0x60);
    });
    return text;
}

export function normalize_link(text: string): string {
    return text.replace(/^(https|http):\/\//i, "").replace(/\/(|index.html)$/, "");
}
