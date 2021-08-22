class TabSwitcher {
    private readonly selector: { item_group: string; selected_item: string };

    constructor() {
        this.selector = {
            item_group: ".setting_item_group",
            selected_item: ".tab_switcher_item[data-selected]"
        };

        const default_item: HTMLElement | null = document.querySelector(this.selector.selected_item);
        if (default_item) this.show_item(default_item.dataset.target);

        const tab_switcher_item: NodeListOf<HTMLElement> = document.querySelectorAll(".tab_switcher_item");
        tab_switcher_item.forEach((item) => {
            item.addEventListener("click", () => {
                const selected_item: HTMLElement | null = document.querySelector(this.selector.selected_item);
                if (selected_item) delete selected_item.dataset.selected;

                item.dataset.selected = "";

                this.show_item(item.dataset.target);
            });
        });
    }

    show_item(selector: string | undefined) {
        if (!selector) return;

        const item_group: NodeListOf<HTMLElement> = document.querySelectorAll(this.selector.item_group);
        item_group.forEach((element) => (element.style.display = "none"));

        const target: HTMLElement | null = document.querySelector(selector);
        if (target) target.style.display = "block";
    }
}

function show_version() {
    const manifest = browser.runtime.getManifest();
    const version = manifest.version;
    const target_element = document.getElementById("extension_version");
    if (target_element) target_element.textContent = `${version}`;
}

new TabSwitcher();
show_version();
