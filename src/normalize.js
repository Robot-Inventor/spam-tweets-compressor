export function normalize(text) {
    text = text.normalize("NFKC").toLowerCase().replace(/[ぁ-ん]/g, (s) => {
        return String.fromCharCode(s.charCodeAt(0) + 0x60);
    });
    return text;
}
;
//# sourceMappingURL=normalize.js.map