function initFlowcus () {

    // 1) Load fonts (custom fonts are loaded with Javascript to prevent CSP errors on some websites)
    loadFonts()

    // 2) Generate views' iframes.
    View.initViews()

    // 4) Initialize the header.
    header.initHeader()

    // 5) Initialize hotkeys
    initHotkeysReceiver()

    // 6) Display the default view.
    Settings.get("default-view", function (value) {
        const view_button = header.header_element.querySelector(`button#${value}-button`)
        view_button.click()
    })
}

function main () {
    if (document.readyState === "complete") {
        initFlowcus();
        header.toggleHeader()
    }
    else {
        window.addEventListener("load", function () {
            initFlowcus();
            header.toggleHeader();
        })
    }
}

Settings.get("auto-start", function (value) {
    if (value === true) {
        console.log("AUTOSTART")
        main()
    }
    else {
        console.log("NOT AUTOSTART")

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
