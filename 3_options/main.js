function init () {

    // 1) Load the Flowcus custom fonts and colors
    StyleManager.init()

    // 2) Initialize the indenter
    new Indenter().init()

    // 3) Initialize the browser options manager
    BrowserOptionsManager.init()

    // 4) Initialize options' pages' buttons()
    let last_displayed_page;
    for (const button of document.querySelectorAll("button.option-page-button")) {
        const button_page = document.querySelector("section#" + button.getAttribute("data-page"))
        button.addEventListener("click", function () {
            if (last_displayed_page) {
                last_displayed_page.style.display = "none";
            }
            button_page.style.display = "block";
            last_displayed_page = button_page
        })
    }
}

function main () {
    init()
}

window.addEventListener('load', main);
