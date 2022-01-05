let idocument;

function initFlowcus () {

    return new Promise((resolve, reject) => {

        // 1) Store the initial document element.
        idocument = document.cloneNode(true)
        document.body.innerHTML = ""

        // 2) Load fonts (custom fonts are loaded with Javascript to prevent CSP errors on some websites)
        loadFonts()

        // 3) Initialize views.
        View.init()

        // 4) Initialize the header.
        .then(() => Header.init())

        // 5) Initialize hotkeys
        .then(() => HotkeysReceiver.init())

        // 6) Display the default view.
        .then(() => {
            Settings.get("default-view", function (value) {
                const view_button = header.header_element.querySelector(`button#${value}-button`)
                view_button.click()
            })
        })

        // 7.A) Resolve the promise.
        .then(() => resolve())

        // 7.B) Or catch initialization's errors and reject the promise.
        .catch(error => {
            error ? console.log(error) : null
            reject()
        })
    })
}

function main () {
    if (document.readyState === "complete") {
        initFlowcus()
        .then(() => header.toggleHeader())
        .catch(error => error ? console.log(error) : null)
    }
    else {
        window.addEventListener("load", function () {
            initFlowcus()
            .then(header.toggleHeader)
            .catch(error => error ? console.log(error) : null)
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
