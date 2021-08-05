const selector_of_selected_item = ".tab_switcher_item[data-selected]";

const default_selected_item: HTMLElement | null = document.querySelector(selector_of_selected_item);
if (default_selected_item) {
    const target_selector = default_selected_item.dataset.target;
    if (target_selector) {
        const target: HTMLElement | null = document.querySelector(target_selector);
        if (target) target.style.display = "block";
    }
}

const tab_switcher_item: NodeListOf<HTMLElement> = document.querySelectorAll(".tab_switcher_item");
tab_switcher_item.forEach((item) => {
    item.addEventListener("click", () => {
        const selected_item: HTMLElement | null = document.querySelector(selector_of_selected_item);
        if (selected_item) delete selected_item.dataset.selected;
        item.dataset.selected = "";

        const item_group: NodeListOf<HTMLElement> = document.querySelectorAll(".setting_item_group");
        item_group.forEach((element) => {
            element.style.display = "none";
        });
        const target_selector = item.dataset.target;
        if (target_selector) {
            const target: HTMLElement | null = document.querySelector(target_selector);
            if (target) target.style.display = "block";
        }
    });
});
