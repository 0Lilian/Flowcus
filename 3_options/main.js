function init () {

    // 1) Load the Flowcus custom fonts and colors
    StyleManager.init()

    // 2) Initialize the indenter
    new Indenter(null, 10).init()

    // 3) Initialize the browser options manager
    BrowserOptionsManager.init()
}

function main () {
    init()
}

window.addEventListener('load', main);
