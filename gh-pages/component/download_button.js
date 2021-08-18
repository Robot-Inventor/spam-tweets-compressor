class DownloadButton extends HTMLElement {
    constructor() {
        super();

        this.url_list = {
            Firefox: "https://addons.mozilla.org/ja/firefox/addon/spam-tweets-compressor/",
            Chrome: "https://chrome.google.com/webstore/detail/spam-tweets-compressor/ahbajmjkdmknfdkcppkginogfjmpefjf"
        };

        const shadow = this.attachShadow({ mode: "open" });

        const outer = document.createElement("div");
        outer.id = "outer";

        this.download_link = document.createElement("a");
        this.download_link.id = "download_link";
        this.download_link.textContent = "Download for ";

        this.browser_name = document.createElement("span");
        this.browser = this.get_browser_name();
        this.set_browser(this.browser);

        const select_button = document.createElement("button");
        select_button.id = "select_button";
        select_button.textContent = "▼";
        select_button.addEventListener("click", () => {
            this.toggle_browser();
        });

        const style = document.createElement("style");
        style.textContent = `
:host {
    user-select: none;
    display: inline-block;
}

#outer {
    background: #1D7CB7;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    display: inline-block;
}

#download_link {
    color: white;
    text-decoration: none;
    cursor: pointer;
}

#select_button {
    border: none;
    background: none;
    color: white;
    cursor: pointer;
    margin-left: 0.5rem;
    padding-left: 0.5rem;
    border-left: solid 0.1rem white;
}
        `;

        this.download_link.appendChild(this.browser_name);
        outer.appendChild(this.download_link);
        outer.appendChild(select_button);
        shadow.appendChild(style);
        shadow.appendChild(outer);
    }

    get_browser_name() {
        if (navigator.userAgent.includes("Firefox")) return "Firefox";
        else return "Chrome";
    }

    set_browser(browser_name) {
        this.browser_name.textContent = this.browser = browser_name;
        if (browser_name in this.url_list) this.download_link.href = this.url_list[browser_name];
    }

    toggle_browser() {
        if (this.browser === "Chrome") this.set_browser("Firefox");
        else this.set_browser("Chrome");
    }
}
customElements.define("download-button", DownloadButton);