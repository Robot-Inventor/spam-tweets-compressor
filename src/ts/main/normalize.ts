import normalizeUrl from "normalize-url";

export const hash_symbol: ReadonlyArray<string> = ["#", "＃"];

/**
 * Normalize normal text.
 * @param text target text
 * @returns normalized text
 */
const normalize = (text: string): string => {
    const result = text
        .normalize("NFKC")
        .toLowerCase()
        // eslint-disable-next-line no-magic-numbers
        .replace(/[ぁ-ん]/gu, (str: string) => String.fromCharCode(str.charCodeAt(0) + 0x60));
    return result;
};

/**
 * Normalize URL.
 * @param url target url
 * @returns normalized url
 */
const normalize_link = (url: string): string =>
    normalizeUrl(url, {
        removeDirectoryIndex: true,
        removeQueryParameters: true,
        stripHash: true,
        stripProtocol: true
    });

/**
 * Normalize hashtag.
 * @param hashtag target hashtag
 * @returns normalized hashtag
 */
const normalize_hashtag = (hashtag: string): string =>
    normalize(hashtag.replace(new RegExp(`^[${hash_symbol.join()}]`, "u"), ""));

/**
 * Normalize user ID.
 * @param user_id target user ID
 * @returns normalized user ID
 */
const normalize_user_id = (user_id: string): string => normalize(user_id.replace(/^[@＠]/u, ""));

export { normalize };
export { normalize_link };
export { normalize_hashtag };
export { normalize_user_id };
