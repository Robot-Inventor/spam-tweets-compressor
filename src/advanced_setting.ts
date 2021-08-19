import { advanced_filter_type } from "./advanced_filter_type";
import { load_color_setting } from "./color";
import { Setting, setting_object } from "./setting";
import "./advanced_setting_view";


function get_setting_name(element: HTMLElement) {
    const setting_name = element.dataset.settingName;
    if (setting_name) return setting_name;
    else throw "設定の名称が指定されていないinput要素が見つかりました";
}

async function load_filter_list(setting: setting_object): Promise<void> {
    const response = await fetch("https://cdn.statically.io/gh/Robot-Inventor/stc-filter/main/dist/advanced_filter.json");
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const json_data: advanced_filter_type = await response.json();
    const filter_list_outer = document.getElementById("filter_list_outer");

    if (filter_list_outer) {
        Object.keys(json_data).sort().forEach((key) => {
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            // eslint-disable-next-line no-irregular-whitespace
            const checkbox_id = key.replace(/[ 　]/g, "_");
            checkbox.id = checkbox_id;
            checkbox.dataset.filterName = key;

            if (setting.advanced_filter.includes(key)) checkbox.checked = true;

            checkbox.addEventListener("change", () => {
                const all_checkbox: NodeListOf<HTMLInputElement> = filter_list_outer.querySelectorAll("input[type='checkbox'");
                setting.advanced_filter = [...all_checkbox].filter((element) => {
                    return element.checked && element.dataset.filterName !== undefined;
                }).map((element) => {
                    return (element.dataset.filterName || "");
                });
            });

            const label = document.createElement("label");
            label.textContent = key;
            label.setAttribute("for", checkbox_id);

            const outer = document.createElement("div");
            outer.className = "filter_list_item";

            outer.appendChild(checkbox);
            outer.appendChild(label);
            filter_list_outer.appendChild(outer);
        });
    } else {
        console.log("filter_list_outerが見つかりませんでした");
    }
}

new Setting().load().then((setting) => {
    void load_color_setting();
    void load_filter_list(setting);

    const textarea_element_list: NodeListOf<HTMLTextAreaElement> = document.querySelectorAll("textarea");
    textarea_element_list.forEach((textarea) => {
        const setting_name = get_setting_name(textarea);

        if (Object.keys(setting).includes(setting_name)) {
            const saved_value = setting[setting_name];
            textarea.value = saved_value instanceof Array ? saved_value.join("\n") : "";

            textarea.addEventListener("change", () => {
                setting[setting_name] = textarea.value.split("\n");
            });
            window.addEventListener("beforeunload", () => {
                setting[setting_name] = textarea.value.split("\n");
            });
        }
    });

    const copy_button = document.getElementById("copy_button");
    if (copy_button) {
        copy_button.addEventListener("click", () => {
            const setting_string = JSON.stringify(setting, null, 4);
            void navigator.clipboard.writeText(setting_string);

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
