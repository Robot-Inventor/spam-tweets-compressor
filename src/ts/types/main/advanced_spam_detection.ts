import { is_object } from "../common/type_predicate_utility";

interface query_element {
    mode: "include" | "exclude";
    type: "text" | "hashtag" | "name" | "id" | "link";
    string: string;
}

type query_type = ["and" | "or", Array<query_element | query_type>];

/**
 * To see example, please refer to docs/\<lang\>/advanced_spam_detection.md
 */
interface query_object {
    rule: query_type;
}

/**
 * Return if the type of target variable is query_element.
 * @param argument target variable
 * @returns weather or not the target variable is query_element
 */
const is_query_element = (argument: unknown): argument is query_element => {
    // Check if argument is an object.
    if (!is_object(argument)) return false;

    // Check if argument has all necessary properties.
    const all_properties = ["mode", "type", "string"];
    const has_all_properties = all_properties.every((property) => property in argument && typeof property === "string");
    return has_all_properties;
};

const is_query_type = (input: unknown): input is query_type => {
    const array_length = 2;

    if (!Array.isArray(input)) return false;

    if (input.length !== array_length) return false;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (!["and", "or"].includes(input[0])) return false;

    if (!Array.isArray(input[1])) return false;

    return input[1].every((element) => is_query_element(element) || is_query_type(element));
};

const is_query_object = (input: unknown): input is query_object => {
    if (!is_object(input)) return false;
    if (!("rule" in input)) return false;
    return is_query_type(input.rule);
};

export { query_type };
export { is_query_element, is_query_object };
