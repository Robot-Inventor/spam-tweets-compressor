/**
 * Initialize i18n texts that have ``data-i18n`` attribute.
 */
const init_i18n_text = () => {
    const target_element: NodeListOf<HTMLElement> = document.querySelectorAll("*[data-i18n]");
    target_element.forEach((target) => {
        const message_name = target.dataset.i18n;
        if (!message_name) return;

        const message: string = browser.i18n.getMessage(message_name);
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

        const link: string = browser.i18n.getMessage(link_name);
        if (link) target.href = link;
    });
};

init_i18n_text();
init_i18n_link();
