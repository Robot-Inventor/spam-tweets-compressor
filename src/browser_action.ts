import { load_setting } from "./load_setting";
import { browser_interface } from "./browser";


declare const browser: browser_interface;


class ValidationMessage {
    private message_element;
    constructor(element: HTMLElement, message: string) {
        const message_element = document.createElement("span");
        message_element.textContent = message;
        message_element.style.display = "none";
        message_element.className = "validation_message";
        element.insertAdjacentElement("afterend", message_element);

        this.message_element = message_element;
    }

    show() {
        this.message_element.style.display = "inline-block";
    }

    hide() {
        this.message_element.style.display = "none";
    }
}

function get_setting_name(element: HTMLElement) {
    const setting_name = element.dataset.settingName;
    if (setting_name) return setting_name;
    else throw "設定の名称が指定されていないinput要素が見つかりました";
}

load_setting().then((setting) => {
    const number_input_element_list: NodeListOf<HTMLInputElement> = document.querySelectorAll("input[type='number']");
    number_input_element_list.forEach((input_element) => {
        const setting_name = get_setting_name(input_element);

        input_element.value = String(setting[setting_name]);
        const validation_message = new ValidationMessage(input_element, input_element.dataset.validationMessage || "不正な値です");

        input_element.addEventListener("input", () => {
            let new_value_string = input_element.value;
            new_value_string = new_value_string.normalize("NFKC");
            const is_only_number = !/\D/.test(new_value_string);
            if (!is_only_number) {
                validation_message.show();
                return;
            }

            const new_value = parseInt(new_value_string);
            const is_valid_range = (() => {
                const min_number = input_element.min ? parseInt(input_element.min) : null;
                const max_number = input_element.max ? parseInt(input_element.max) : null;

                if (min_number !== null && max_number !== null) return new_value >= min_number && new_value <= max_number;
                else if (min_number === null && max_number !== null) return new_value <= max_number;
                else if (min_number !== null && max_number === null) return new_value >= min_number;
                else return true;
            })();

            if (!is_valid_range) {
                validation_message.show();
                return;
            }

            validation_message.hide();
            setting[setting_name] = new_value;
            void browser.storage.local.set({ "setting": setting });
        });
    });

    const checkbox_input_element: NodeListOf<HTMLInputElement> = document.querySelectorAll("input[type='checkbox']");
    checkbox_input_element.forEach((input_element) => {
        const setting_name = get_setting_name(input_element);

        const saved_value = setting[setting_name];
        input_element.checked = typeof saved_value === "boolean" ? saved_value : false;

        input_element.addEventListener("change", () => {
            setting[setting_name] = input_element.checked;
            void browser.storage.local.set({ "setting": setting });
        });
    });
}).catch(() => {
    console.error("設定を読み込めませんでした");
});
