const tab_switcher_item: NodeListOf<HTMLElement> = document.querySelectorAll(".tab_switcher_item");
tab_switcher_item.forEach((item) => {
    item.addEventListener("click", () => {
        const selected_item: HTMLElement | null = document.querySelector(".tab_switcher_item[data-selected]");
        if (selected_item) delete selected_item.dataset.selected;
        item.dataset.selected = "";
    });
});
