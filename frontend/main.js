let idocument;

function initFlowcus () {

    return new Promise((resolve, reject) => {

        // 1) Store the initial document element.
        idocument = document.cloneNode(true)
        document.body.innerHTML = ""

        // 2) Load fonts (custom fonts are loaded with Javascript to prevent CSP errors on some websites)
        loadFonts()

        View.initViews() // 3) Initialize views
        .then(() => header.initHeader()) // 4) Initialize the header.
        .then(() => initHotkeysReceiver()) // 5) Initialize hotkeys
        .then(() => { // 6) Display the default view.
            Settings.get("default-view", function (value) {
                const view_button = header.header_element.querySelector(`button#${value}-button`)
                view_button.click()
            })
        })
        .then(() => resolve())
        .catch(error => {
            console.log(error)
            reject()
        })
    })
}

function main () {
    if (document.readyState === "complete") {
        initFlowcus()
        .then(() => header.toggleHeader())
        .catch(error => console.log(error))
    }
    else {
        window.addEventListener("load", function () {
            initFlowcus()
            .then(header.toggleHeader)
            .catch(error => console.log(error))
        })
    }
}

Settings.get("auto-start", function (value) {
    if (value === true) {
        main()
    }
    else {
        function handle_message (message) {
            if (message.command === "hotkey-pressed") {
                if (message.name === "init-flowcus") {
                    main()
                }
            }
            browser.runtime.onMessage.removeListener(handle_message);
        }
        browser.runtime.onMessage.addListener(handle_message);
    }
})
