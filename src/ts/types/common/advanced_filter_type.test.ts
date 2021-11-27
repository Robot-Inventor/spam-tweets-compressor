import { is_advanced_filter_type } from "./advanced_filter_type";

test("Test of is_advanced_filter_type()", () => {
    const test_pattern = [
        {
            expected: true,
            input: {
                hoge: {
                    id: "abcdef",
                    url: "abcdef"
                }
            }
        },
        {
            expected: false,
            input: {
                hoge: {
                    id: 1,
                    url: 0
                }
            }
        },
        {
            expected: false,
            input: {
                hoge: {
                    id: "abcdef"
                }
            }
        },
        {
            expected: false,
            input: {
                hoge: {
                    url: "abcdef"
                }
            }
        },
        {
            expected: false,
            input: null
        },
        {
            expected: false,
            input: ["aaa", "bbb"]
        }
    ];

    for (const test_case of test_pattern) {
        expect(is_advanced_filter_type(test_case.input)).toBe(test_case.expected);
    }
});
