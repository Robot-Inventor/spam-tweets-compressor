declare const browser: any;

const default_setting: any = {
    break_threshold: 5
};

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

(async () => {
    const saved_setting = await browser.storage.local.get("setting");
    const setting = (() => {
        let result: any = {};
        Object.keys(default_setting).forEach((key) => {
            result[key] = saved_setting.setting[key] || default_setting[key];
        });
        return result;
    })();
    Object.keys(setting).forEach((key) => {
        const input_element: HTMLInputElement | null = document.querySelector(`input[data-setting-name='${key}'][type="number"]`);
        if (!input_element) console.error(`${location.href}に設定項目「${key}」が見つかりませんでした`)
        else {
            input_element.value = setting[key];
            const validation_message = new ValidationMessage(input_element, input_element.dataset.validationMessage || "不正な値です");

            input_element.addEventListener("input", () => {
                let new_value_string = input_element.value;
                new_value_string = new_value_string.replace(/[０-９]/g, function (s) {
                    return String.fromCharCode(s.charCodeAt(0) - 65248);
                });
                const is_only_number = !(new_value_string.match(/\D/));
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
                setting[key] = new_value;
                browser.storage.local.set({ setting: setting });
            });
        }
    });
})();
