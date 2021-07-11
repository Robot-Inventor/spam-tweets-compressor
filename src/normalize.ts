export function normalize(text: string) {
    text = text.normalize("NFKC").toLowerCase().replace(/[ぁ-ん]/g, (s: string) => {
        return String.fromCharCode(s.charCodeAt(0) + 0x60);
    });
    return text;
};
