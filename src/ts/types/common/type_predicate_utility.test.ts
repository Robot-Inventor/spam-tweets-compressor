import { is_object, is_string_array } from "./type_predicate_utility";

test("Test of is_object()", () => {
    expect(is_object({})).toBe(true);
    expect(
        is_object({
            fuga: false,
            hoge: "aaa",
            piyo: 0
        })
    ).toBe(true);
    expect(is_object([])).toBe(false);
    expect(is_object(null)).toBe(false);
    // eslint-disable-next-line no-undefined
    expect(is_object(undefined)).toBe(false);
    expect(is_object("aaa")).toBe(false);
    // eslint-disable-next-line no-magic-numbers
    expect(is_object(1)).toBe(false);
    expect(is_object(true)).toBe(false);
});

test("Test of is_string_array()", () => {
    expect(is_string_array([])).toBe(true);
    expect(is_string_array(["aaa", "bbb"])).toBe(true);
    // eslint-disable-next-line no-magic-numbers
    expect(is_string_array(["aaa", "bbb", 1])).toBe(false);
    expect(is_string_array(null)).toBe(false);
    // eslint-disable-next-line no-undefined
    expect(is_string_array(undefined)).toBe(false);
    expect(is_string_array("aaa")).toBe(false);
    // eslint-disable-next-line no-magic-numbers
    expect(is_string_array(1)).toBe(false);
    expect(is_string_array(true)).toBe(false);
});
