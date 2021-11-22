const is_object = (input: unknown): input is { [key: string]: unknown } =>
    Object.prototype.toString.call(input) === "[object Object]";

const is_string_array = (input: unknown): input is Array<string> => {
    return Array.isArray(input) && input.every((element) => typeof element === "string");
};

export { is_object, is_string_array };
