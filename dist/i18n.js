"use strict";
const target_element = document.querySelectorAll("*[data-i18n]");
target_element.forEach((target) => {
    const message_name = target.dataset.i18n;
    if (!message_name)
        return;
    const message = browser.i18n.getMessage(message_name);
    if (message)
        target.textContent = message;
});
//# sourceMappingURL=i18n.js.map