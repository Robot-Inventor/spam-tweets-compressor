const tab_switcher_item: NodeListOf<HTMLElement> = document.querySelectorAll(".tab_switcher_item");
tab_switcher_item.forEach((item) => {
    item.addEventListener("click", () => {
        const selected_item: HTMLElement | null = document.querySelector(".tab_switcher_item[data-selected]");
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
