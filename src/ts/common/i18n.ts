/**
 * Initialize i18n texts that have ``data-i18n`` attribute.
 */
const init_i18n_text = () => {
    const target_element: NodeListOf<HTMLElement> = document.querySelectorAll("*[data-i18n]");
    target_element.forEach((target) => {
        const message_name = target.dataset.i18n;
        if (!message_name) return;

        const message = browser.i18n.getMessage(message_name);
        if (message) target.textContent = message;
    });
};

/**
 * Initialize i18n links that have ``data-i18n-link`` attribute.
 */
const init_i18n_link = () => {
    const target_element: NodeListOf<HTMLAnchorElement> = document.querySelectorAll("a[data-i18n-link]");
    target_element.forEach((target) => {
        const link_name = target.dataset.i18nLink;
        if (!link_name) return;

        const link = browser.i18n.getMessage(link_name);
        if (link) target.href = link;
    });
};

/**
 * Initialize label attribute of i18n elements that have ``data-i18n-label`` attribute.
 */
const init_i18n_label = () => {
    const target_element: NodeListOf<HTMLAnchorElement> = document.querySelectorAll("*[data-i18n-label]");
    target_element.forEach((target) => {
        const label_name = target.dataset.i18nLabel;
        if (!label_name) return;

        const label = browser.i18n.getMessage(label_name);
        if (label) target.setAttribute("label", label);
    });
};

/**
 * Initialize validationMessage attribute of i18n elements that have ``data-i18n-validation-message`` attribute.
 */
const init_i18n_validation_message = () => {
    const target_element: NodeListOf<HTMLElement> = document.querySelectorAll("*[data-i18n-validation-message]");
    target_element.forEach((target) => {
        const validation_message_name = target.dataset.i18nValidationMessage;
        if (!validation_message_name) return;

        const validation_message = browser.i18n.getMessage(validation_message_name);
        if (validation_message) target.setAttribute("validationMessage", validation_message);
    });
};

/**
 * Get i18n message.
 * @param message_name message name
 */
const get_message = (message_name: string) => browser.i18n.getMessage(message_name);

const init_i18n = () => {
    init_i18n_text();
    init_i18n_link();
    init_i18n_label();
    init_i18n_validation_message();
};

init_i18n();

export { init_i18n, get_message };
