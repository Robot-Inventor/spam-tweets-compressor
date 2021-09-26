import { CheckListItem } from "@material/mwc-list/mwc-check-list-item";
import chroma from "chroma-js";

/**
 * Shift the scroll position by the height of the header.
 */
const adjust_scroll_position = () => {
    const header = document.querySelector("mwc-top-app-bar-fixed");
    // eslint-disable-next-line radix, no-magic-numbers
    if (header) scrollBy(0, parseInt(getComputedStyle(header).height.replace(/px$/u, "")) * -2);
    else console.error("header was not found.");
};

/**
 * Create a separator element for the ``mwc-list`` element.
 * @returns separator element
 */
const create_separator = (): HTMLLIElement => {
    const separator = document.createElement("li");
    separator.setAttribute("divider", "");
    separator.setAttribute("role", "separator");
    return separator;
};

/**
 * Generate ``mwc-check-list-item`` for the filter list of Advanced Spam Detection.
 * @param filter_name name of the filter
 * @param filter_id id of the filter
 * @param selected default status
 * @returns ``mwc-check-list-item``
 */
const generate_check_list_item = (filter_name: string, filter_id: string, selected: boolean): CheckListItem => {
    const checkbox = document.createElement("mwc-check-list-item");
    checkbox.textContent = filter_name;
    checkbox.setAttribute("left", "");
    checkbox.dataset.filterId = filter_id;
    if (selected) checkbox.setAttribute("selected", "");
    return checkbox;
};

/**
 * Set header color as brighten color of document's background color and set border for bottom of the header.
 * @param background_color background color of document
 */
const adjust_appearance = (background_color: string): void => {
    const header = document.querySelector("mwc-top-app-bar-fixed");
    if (!header) {
        console.error("mwc-top-app-bar-fixed was not found.");
        return;
    }

    const crm = chroma(background_color);
    const header_rgb = crm.brighten().rgb();
    const header_rgb_string = `rgb(${header_rgb[0]}, ${header_rgb[1]}, ${header_rgb[2]})`;

    const style = document.createElement("style");
    style.textContent = `
mwc-top-app-bar-fixed {
    --mdc-theme-primary: ${header_rgb_string};
}

mwc-drawer {
    --mdc-theme-surface: ${header_rgb_string};
}
`;
    document.body.appendChild(style);

    const header_shadow = header.shadowRoot;
    if (header_shadow) {
        const header_inner = header_shadow.querySelector("header");
        if (!header_inner) return;

        header_inner.style.borderBottom = "0.1rem solid rgba(0, 0, 0, 0.1)";
    }
};

/**
 * Initialize menu.
 */
class Menu {
    private readonly open_button: HTMLElement | null;
    private readonly item_outer: HTMLElement | null;
    private readonly close_button: HTMLElement | null;

    constructor() {
        this.open_button = document.getElementById("menu_open_button");
        this.item_outer = document.getElementById("menu_item_outer");
        this.close_button = document.getElementById("menu_close_button");

        if (this.close_button) this.close_button.addEventListener("click", () => this.hide());
        else console.error("#menu_close_button was not found.");

        this.init_menu_item();
        Menu.init_menu_button();
        this.initialize_ripple();
    }

    private init_menu_item() {
        [...document.querySelectorAll("h2")].reverse().forEach((element) => {
            if (getComputedStyle(element).display !== "none" && element.textContent && this.item_outer) {
                const menu_item = document.createElement("div");
                menu_item.className = "menu_item";
                menu_item.innerHTML = element.innerHTML;
                menu_item.addEventListener("click", () => {
                    location.hash = element.id;
                    adjust_scroll_position();
                });
                this.item_outer.insertAdjacentElement("afterbegin", menu_item);
            }
        });
    }

    private static init_menu_button() {
        const drawer = document.querySelector("mwc-drawer");
        if (drawer) {
            const container = drawer.parentNode;
            if (container) {
                container.addEventListener("MDCTopAppBar:nav", () => {
                    drawer.open = !drawer.open;
                });
            }
        }
    }

    private hide() {
        if (this.open_button) this.open_button.click();
    }

    private initialize_ripple() {
        if (!this.item_outer) {
            console.error("menu_item_outer was not found.");
            return;
        }

        const menu_item = this.item_outer.querySelectorAll(".menu_item");
        menu_item.forEach((item) => {
            const ripple = document.createElement("mwc-ripple");
            item.appendChild(ripple);

            item.addEventListener("mousedown", (event) => {
                ripple.startPress(event);
            });
            item.addEventListener("mouseup", () => {
                ripple.endPress();
            });
            item.addEventListener("mouseover", () => {
                ripple.startHover();
            });
            item.addEventListener("mouseleave", () => {
                ripple.endHover();
                ripple.endPress();
            });
        });
    }
}

new Menu();
if (location.hash) adjust_scroll_position();
export { create_separator };
export { generate_check_list_item };
export { adjust_appearance };
