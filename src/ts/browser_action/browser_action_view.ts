import { LoadBrowserActionContent } from "./browser_action_load_content";

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

        tab_bar.addEventListener("MDCTabBar:activated", (event: unknown) => {
            const { detail } = event as { detail: { index: number } };
            const item_index = detail.index;
            const items = tab_bar.querySelectorAll("mwc-tab");
            const selected_item = items[item_index];

            const tab_bar_transition_duration = 300;
            // eslint-disable-next-line no-magic-numbers
            const item_display_time_difference = tab_bar_transition_duration / 2;
            setTimeout(() => {
                TabSwitcher.show_item(selected_item.dataset.target);
            }, item_display_time_difference);
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

    const target_element = document.getElementById("extension_version") as HTMLAnchorElement | null;
    if (target_element) {
        target_element.textContent = version;
        target_element.href = `https://github.com/Robot-Inventor/spam-tweets-compressor/releases/tag/v${version}`;
    }
};

new LoadBrowserActionContent();
new TabSwitcher();
show_version();
