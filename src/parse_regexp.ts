const detect_regexp_pattern = /^\/(.*)\/([dgimsuy]*)$/;

export function is_regexp(pattern: string): boolean {
    const detect_regexp_pattern = /^\/(.*)\/([dgimsuy]*)$/;
    return detect_regexp_pattern.test(pattern);
}

export function parse_regexp(pattern: string): RegExp {

    if (!is_regexp(pattern)) return new RegExp(pattern);

    const regex_core_string = pattern.replace(detect_regexp_pattern, "$1");
    const regex_flag = pattern.replace(detect_regexp_pattern, "$2");
    const regex = new RegExp(regex_core_string, regex_flag);
    return regex;
}
