const target_element: NodeListOf<HTMLElement> = document.querySelectorAll("*[data-i18n]");
target_element.forEach((target) => {
    const message_name = target.dataset.i18n;
    if (!message_name) return;

    const message: string = browser.i18n.getMessage(message_name);
    if (message) target.textContent = message;
});
