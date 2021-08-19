const selected_item_selector = ".tab_switcher_item[data-selected]";

function init_tab_switcher() {
    function show_item(selector: string | undefined) {
        if (!selector) return;

        const item_group: NodeListOf<HTMLElement> = document.querySelectorAll(".setting_item_group");
        item_group.forEach((element) => {
            element.style.display = "none";
        });

        const target: HTMLElement | null = document.querySelector(selector);
        if (target) target.style.display = "block";
    }

    const default_selected_item: HTMLElement | null = document.querySelector(selected_item_selector);
    if (default_selected_item) show_item(default_selected_item.dataset.target);

    const tab_switcher_item: NodeListOf<HTMLElement> = document.querySelectorAll(".tab_switcher_item");
    tab_switcher_item.forEach((item) => {
        item.addEventListener("click", () => {
            const selected_item: HTMLElement | null = document.querySelector(selected_item_selector);
            if (selected_item) delete selected_item.dataset.selected;

            item.dataset.selected = "";

            show_item(item.dataset.target);
        });
    });
}

function show_version() {
    const manifest = browser.runtime.getManifest();
    if ("version" in manifest) {
        const version = manifest.version;
        const target_element = document.getElementById("extension_version");
        if (target_element) target_element.textContent = `${version}`;
    } else {
        console.error("manifest.jsonの取得に失敗しました。");
    }
}

init_tab_switcher();
show_version();
