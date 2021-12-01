const is_object = (input: unknown): input is { [key: string]: unknown } =>
    Object.prototype.toString.call(input) === "[object Object]";

const is_string_array = (input: unknown): input is Array<string> =>
    Array.isArray(input) && input.every((element) => typeof element === "string");

const is_error = (input: unknown): input is Error => Object.prototype.toString.call(input) === "[object Error]";

export { is_object, is_string_array, is_error };
