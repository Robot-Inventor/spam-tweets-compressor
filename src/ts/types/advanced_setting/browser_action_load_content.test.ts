import {
    is_browser_action_content,
    is_browser_action_content_link,
    is_browser_action_content_switch
} from "./browser_action_load_content";

// eslint-disable-next-line max-lines-per-function
test("Test of is_browser_action_content_switch()", () => {
    const test_pattern = [
        {
            expected: true,
            input: {
                label: "abcdef",
                name: "abcdef",
                type: "switch"
            }
        },
        {
            expected: false,
            input: {
                label: "abcdef",
                name: "abcdef"
            }
        },
        {
            expected: false,
            input: {
                label: "abcdef",
                name: "abcdef",
                type: "link"
            }
        },
        {
            expected: false,
            input: {
                label: 1,
                name: 1,
                type: "switch"
            }
        },
        {
            expected: true,
            input: {
                label: "abcdef",
                link: "abcdef",
                name: "abcdef",
                type: "switch"
            }
        },
        {
            expected: false,
            input: "aaaa"
        },
        {
            expected: false,
            input: {}
        },
        {
            expected: false,
            input: []
        },
        {
            expected: false,
            input: null
        },
        {
            expected: false,
            // eslint-disable-next-line no-undefined
            input: undefined
        }
    ];

    for (const pattern of test_pattern) {
        expect(is_browser_action_content_switch(pattern.input)).toBe(pattern.expected);
    }
});

// eslint-disable-next-line max-lines-per-function
test("Test of is_browser_action_content_link()", () => {
    const test_pattern = [
        {
            expected: true,
            input: {
                label: "abcdef",
                link: "abcdef",
                type: "link"
            }
        },
        {
            expected: false,
            input: {
                label: "abcdef",
                link: "abcdef"
            }
        },
        {
            expected: false,
            input: {
                label: "abcdef",
                link: "abcdef",
                type: "switch"
            }
        },
        {
            expected: false,
            input: {
                label: 1,
                link: 1,
                type: "link"
            }
        },
        {
            expected: true,
            input: {
                label: "abcdef",
                link: "abcdef",
                name: "abcdef",
                type: "link"
            }
        },
        {
            expected: false,
            input: "aaaa"
        },
        {
            expected: false,
            input: {}
        },
        {
            expected: false,
            input: []
        },
        {
            expected: false,
            input: null
        },
        {
            expected: false,
            // eslint-disable-next-line no-undefined
            input: undefined
        }
    ];

    for (const pattern of test_pattern) {
        expect(is_browser_action_content_link(pattern.input)).toBe(pattern.expected);
    }
});

// eslint-disable-next-line max-lines-per-function
test("Test of is_browser_action_content()", () => {
    const test_pattern = [
        {
            expected: true,
            input: {
                advanced: [
                    {
                        label: "abcdef",
                        name: "abcdef",
                        type: "switch"
                    },
                    {
                        label: "abcdef",
                        link: "abcdef",
                        type: "link"
                    }
                ],
                general: [
                    {
                        label: "abcdef",
                        name: "abcdef",
                        type: "switch"
                    },
                    {
                        label: "abcdef",
                        link: "abcdef",
                        type: "link"
                    }
                ],
                option: [
                    {
                        label: "abcdef",
                        name: "abcdef",
                        type: "switch"
                    },
                    {
                        label: "abcdef",
                        link: "abcdef",
                        type: "link"
                    }
                ]
            }
        },
        {
            expected: false,
            input: {
                advanced: [
                    {
                        label: "abcdef",
                        name: "abcdef"
                    }
                ],
                general: [
                    {
                        label: "abcdef",
                        name: "abcdef"
                    },
                    {
                        label: "abcdef",
                        link: "abcdef",
                        type: "link"
                    }
                ]
            }
        },
        {
            expected: false,
            input: {
                advanced: 1,
                general: "aaa"
            }
        }
    ];

    for (const pattern of test_pattern) {
        expect(is_browser_action_content(pattern.input)).toBe(pattern.expected);
    }
});
