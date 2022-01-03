function initFlowcus () {

    // 1) Load fonts (custom fonts are loaded with Javascript to prevent CSP errors on some websites)
    loadFonts()

    // 2) Generate views' contents.
    for (const view of views) {

        // Wait for dependencies if they are not ready yet.
        if (view.areDependenciesReady() === false) {
            const view_interval = window.setInterval(function () {
                if (view.areDependenciesReady() === true) {
                    view.generateContent()
                    window.clearInterval(view_interval)
                }
            }, 500)
        }

        // Else generate the view's content.
        else {
            view.generateContent()
        }
    }

    // 3) Initialize the header.
    header.initHeader()

    // 4) Initialize hotkeys
    initHotkeysReceiver()

    // 4) Display the default view.
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
