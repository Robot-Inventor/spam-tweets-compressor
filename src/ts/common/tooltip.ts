import "tippy.js/dist/tippy.css";
import { get_message } from "../common/i18n";
import tippy from "tippy.js";

/**
 * Initialize the tooltips.
 */
const initialize_tooltip = () => {
    const tooltip_attribute = "data-tooltip";
    const target = document.querySelectorAll(`*[${tooltip_attribute}]`);

    target.forEach((element) => {
        const message_name = element.getAttribute(tooltip_attribute);
        if (!message_name) return;

        const message = get_message(message_name);
        const delay_begin = 1000;
        const delay_end = 0;

        tippy(element, {
            arrow: false,
            content: message,
            delay: [delay_begin, delay_end]
        });
    });
};

export { initialize_tooltip };
