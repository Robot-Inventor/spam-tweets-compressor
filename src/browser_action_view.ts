/**
 * Initialize tab switcher.
 */
class TabSwitcher {
    constructor() {
        const tab_bar = document.querySelector("mwc-tab-bar");
        if (!tab_bar) {
            console.error("mwc-tab-bar was not found.");
            return;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        tab_bar.addEventListener("MDCTabBar:activated", (event: any) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            const item_index = event.detail.index as number;
            const items = tab_bar.querySelectorAll("mwc-tab");
            const selected_item = items[item_index];

            const tab_bar_transition_duration = 300;
            setTimeout(() => {
                TabSwitcher.show_item(selected_item.dataset.target);
                // eslint-disable-next-line no-magic-numbers
            }, tab_bar_transition_duration / 2);
        });
    }

    static show_item(selector: string | undefined) {
        if (!selector) return;

        const item_group: NodeListOf<HTMLElement> = document.querySelectorAll(".setting_item_group");
        item_group.forEach((element) => (element.style.display = "none"));

        const target: HTMLElement | null = document.querySelector(selector);
        if (target) target.style.display = "block";
    }
}

/**
 * Insert version value of the extension to the right of extension name.
 */
const show_version = () => {
    const manifest = browser.runtime.getManifest();
    const { version } = manifest;
    const target_element = document.getElementById("extension_version");
    if (target_element) target_element.textContent = `${version}`;
};

new TabSwitcher();
show_version();
