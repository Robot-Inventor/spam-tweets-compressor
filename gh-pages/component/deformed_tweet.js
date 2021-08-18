class DeformedTweet extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });

        shadow.innerHTML = `
<div id="outer">
    <div id="icon"></div>
    <div id="right_outer">
        <div id="name"></div>
        <div class="paragraph"></div>
        <div id="short_paragraph" class="paragraph"></div>
    </div>
</div>
<style>
    #outer {
        background: #121212;
        border-radius: 0.25rem;
        padding: 1rem;
        display: grid;
        grid-template-columns: 3rem 1fr;
    }

    #icon {
        width: 3rem;
        height: 3rem;
        border-radius: 3rem;
        background: white;
        opacity: 0.5;
    }

    #right_outer {
        margin-left: 1rem;
    }

    #name {
        background: white;
        opacity: 0.7;
        width: 50%;
        height: 1rem;
        border-radius: 0.125rem;
    }

    .paragraph {
        background: white;
        opacity: 0.4;
        height: 1rem;
        border-radius: 0.125rem;
        margin-top: 1rem;
    }

    #short_paragraph {
        width: 30%;
    }
</style>
        `;
    }
}
customElements.define("deformed-tweet", DeformedTweet);