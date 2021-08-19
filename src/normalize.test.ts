import { normalize_hashtag, normalize_link, normalize_user_id } from "./normalize";

test("normalize_link()のテスト", () => {
    expect(normalize_link("https://github.com")).toBe("github.com");
    expect(normalize_link("http://github.com")).toBe("github.com");
    expect(normalize_link("https://www.youtube.com")).toBe("youtube.com");
    expect(normalize_link("http://www.youtube.com")).toBe("youtube.com");
    expect(normalize_link("https://mobile.twitter.com/")).toBe("mobile.twitter.com");
    expect(normalize_link("https://mobile.twitter.com/index.html")).toBe("mobile.twitter.com");
});

test("normalize_hashtag()のテスト", () => {
    expect(normalize_hashtag("#abcdef")).toBe("abcdef");
    expect(normalize_hashtag("＃abcdef")).toBe("abcdef");

    expect(normalize_hashtag("#ＡＢＣＤＥＦ")).toBe("abcdef");
});

test("normalize_user_id()のテスト", () => {
    expect(normalize_user_id("@twitter")).toBe("twitter");
    expect(normalize_user_id("＠twitter")).toBe("twitter");
    expect(normalize_user_id("@TwItTeR")).toBe("twitter");
    expect(normalize_user_id("twitter")).toBe("twitter");
});
