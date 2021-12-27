import { LoadBrowserActionContent } from "./browser_action_load_content";
import { initialize_tooltip } from "./../common/tooltip";

/**
 * Initialize tab switcher.
 */
class TabSwitcher {
    private old_tab_index: number;
    private readonly active_item_attribute = "data-active-item";
    private readonly tab_select_event = "MDCTabBar:activated";
    private readonly selectors = {
        setting_item_group: ".setting_item_group",
        tab: "mwc-tab",
        tab_bar: "mwc-tab-bar"
    } as const;

    constructor() {
        this.old_tab_index = 0;

        const tab_bar = document.querySelector(this.selectors.tab_bar);
        if (!tab_bar) {
            console.error(`${this.selectors.tab_bar} was not found.`);
            return;
        }

        tab_bar.addEventListener(this.tab_select_event, (event: unknown) => {
            const { detail } = event as { detail: { index: number } };
            const tab_index = detail.index;

            // Selected tab was not changed.
            if (tab_index === this.old_tab_index) return;

            const tabs = tab_bar.querySelectorAll(this.selectors.tab);
            const selected_item = tabs[tab_index];

            const transition_direction = tab_index < this.old_tab_index ? "left" : "right";

            // Set the transition for the old item.
            const old_item = document.querySelector(`*[${this.active_item_attribute}]`);
            if (old_item) {
                old_item.removeAttribute(this.active_item_attribute);
                old_item.classList.add(TabSwitcher.generate_transition_class_out(transition_direction));
            }

            const tab_bar_transition_duration = 300;
            // eslint-disable-next-line no-magic-numbers
            const item_display_time_difference = tab_bar_transition_duration / 2;
            setTimeout(() => {
                this.show_item(selected_item.dataset.target, transition_direction);
            }, item_display_time_difference);

            this.old_tab_index = tab_index;
        });

        // Show default item.
        const first_tab = tab_bar.querySelector(this.selectors.tab);
        if (first_tab) this.show_item(first_tab.dataset.target, "right");
    }

    private show_item(selector: string | undefined, direction: "right" | "left") {
        if (!selector) return;

        this.clear_all_transition_classes();

        const target: HTMLElement | null = document.querySelector(selector);
        if (target) {
            const active_items: NodeListOf<HTMLElement> = document.querySelectorAll(this.selectors.setting_item_group);
            active_items.forEach((element) => {
                element.style.display = "none";
            });

            target.classList.add(TabSwitcher.generate_transition_class_in(direction));
            target.style.display = "block";

            target.setAttribute(this.active_item_attribute, "");
        }
    }

    private static generate_transition_class_in(direction: "right" | "left") {
        return `change_to_${direction}_transition_in`;
    }

    private static generate_transition_class_out(direction: "right" | "left") {
        return `change_to_${direction}_transition_out`;
    }

    private clear_all_transition_classes() {
        const item_groups = document.querySelectorAll(this.selectors.setting_item_group);
        item_groups.forEach((element) => {
            for (const dir of ["right", "left"] as const) {
                element.classList.remove(TabSwitcher.generate_transition_class_in(dir));
                element.classList.remove(TabSwitcher.generate_transition_class_out(dir));
            }
        });
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
initialize_tooltip();
