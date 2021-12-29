import { ValidateFunction } from "ajv/dist/types/index";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore There is no type declaration because ./setting.validate is an automatically generated script.
import validate20 from "./setting.validate";

interface ColorScheme {
    main: string;
    main_light: string;
    background: string;
    background_light: string;
    high_emphasize_text: string;
    medium_emphasize_text: string;
    card: string;
    card_hover: string;
}

// When edit this interface, please run ``npm run update-validator`` to update the JSON validator for settings.
interface setting_object {
    advanced_filter: Array<string>;
    allow_list: Array<string>;
    color: ColorScheme;
    decompress_on_hover: boolean;
    exclude_url: Array<string>;
    hide_completely: boolean;
    include_user_name: boolean;
    include_verified_account: boolean;
    ng_word: Array<string>;
    show_reason: boolean;
}

const get_setting_validator = () => {
    const validate = validate20 as ValidateFunction<setting_object>;
    return validate;
};

const is_setting_object = (input: unknown): input is setting_object => {
    const validator = get_setting_validator();
    const is_valid = validator(input);
    return is_valid;
};

export { setting_object };
export { get_setting_validator, is_setting_object };
