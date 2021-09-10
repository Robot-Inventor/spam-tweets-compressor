import normalizeUrl from "normalize-url";

export const hash_symbol: ReadonlyArray<string> = ["#", "＃"];

/**
 * Normalize normal text.
 * @param text target text
 * @returns normalized text
 */
export function normalize(text: string): string {
    text = text
        .normalize("NFKC")
        .toLowerCase()
        .replace(/[ぁ-ん]/g, (s: string) => {
            return String.fromCharCode(s.charCodeAt(0) + 0x60);
        });
    return text;
}

/**
 * Normalize URL.
 * @param url target url
 * @returns normalized url
 */
export function normalize_link(url: string): string {
    return normalizeUrl(url, {
        stripHash: true,
        stripProtocol: true,
        removeQueryParameters: true,
        removeDirectoryIndex: true
    });
}

/**
 * Normalize hashtag.
 * @param hashtag target hashtag
 * @returns normalized hashtag
 */
export function normalize_hashtag(hashtag: string): string {
    return normalize(hashtag.replace(new RegExp(`^[${hash_symbol.join()}]`), ""));
}

/**
 * Normalize user ID.
 * @param user_id target user ID
 * @returns normalized user ID
 */
export function normalize_user_id(user_id: string): string {
    return normalize(user_id.replace(/^[@＠]/, ""));
}
