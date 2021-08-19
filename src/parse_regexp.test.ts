import { is_regexp, parse_regexp } from "./parse_regexp";

test("is_regexp()のテスト", () => {
    expect(is_regexp("/abcdef/")).toBe(true);
    expect(is_regexp("/abcdef/i")).toBe(true);
    expect(is_regexp("/abcdef/igm")).toBe(true);

    expect(is_regexp("/abcdef/ign")).toBe(false);
    expect(is_regexp("abcdef")).toBe(false);
    expect(is_regexp("/abcdef")).toBe(false);
    expect(is_regexp("abcdef/")).toBe(false);
});

test("parse_regexp()のテスト", () => {
    expect(parse_regexp("/abcdef/")).toStrictEqual(/abcdef/);
    expect(parse_regexp("/abcdef/i")).toStrictEqual(/abcdef/i);
    expect(parse_regexp("/abcdef/igm")).toStrictEqual(/abcdef/igm);
    expect(parse_regexp("/abcdef/ign")).toStrictEqual(/\/abcdef\/ign/);
    expect(parse_regexp("abcdef")).toStrictEqual(/abcdef/);
    expect(parse_regexp("/abcdef")).toStrictEqual(/\/abcdef/);
    expect(parse_regexp("abcdef/")).toStrictEqual(/abcdef\//);
});
