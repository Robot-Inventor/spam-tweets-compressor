import { load_setting } from "./load_setting.js";

declare const browser: any;

function get_setting_name(element: HTMLElement) {
    const setting_name = element.dataset.settingName;
    if (setting_name) return setting_name;
    else throw "設定の名称が指定されていないinput要素が見つかりました";
}

load_setting().then((setting) => {
    const textarea_element_list: NodeListOf<HTMLTextAreaElement> = document.querySelectorAll("textarea");
    textarea_element_list.forEach((textarea) => {
        const setting_name = get_setting_name(textarea);

        if (Object.keys(setting).includes(setting_name)) {
            const saved_value = setting[setting_name];
            textarea.value = saved_value instanceof Array ? saved_value.join("\n") : "";

            textarea.addEventListener("change", () => {
                setting[setting_name] = textarea.value.split("\n");
                browser.storage.local.set({ setting: setting });
            });
        }
    });

    const copy_button = document.getElementById("copy_button");
    if (copy_button) {
        copy_button.addEventListener("click", () => {
            const setting_string = JSON.stringify(setting, null, 4);
            navigator.clipboard.writeText(setting_string);

            copy_button.textContent = browser.i18n.getMessage("advanced_setting_export_copied");
            setTimeout(() => {
                copy_button.textContent = browser.i18n.getMessage("advanced_setting_export_copy");
            }, 5000);
        });
    }

    const save_button = document.getElementById("save_button");
    if (save_button) {
        save_button.addEventListener("click", () => {
            const setting_string = JSON.stringify(setting, null, 4);

            const download_link = document.createElement("a");
            download_link.href = URL.createObjectURL(new Blob([setting_string], { type: "text/json" }));
            download_link.download = "stc_setting.json";
            download_link.style.display = "none";
            document.body.appendChild(download_link);
            download_link.click();
            download_link.remove();

            save_button.textContent = browser.i18n.getMessage("advanced_setting_export_saved");
            setTimeout(() => {
                save_button.textContent = browser.i18n.getMessage("advanced_setting_export_save");
            }, 5000);
        });
    }
}).catch(() => {
    console.error("設定を読み込めませんでした");
});
