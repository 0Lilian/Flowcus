function initFlowcus () {

    // 1) Load fonts (custom fonts are loaded with Javascript to prevent CSP errors on some websites)
    loadFonts()

    // 2) Generate views' iframes.
    for (const view of views) {
        if (view.generateIframe() === false) {
            const view_interval = window.setInterval(function () {
                if (view.generateIframe() === false) {
                    console.log("INTERVAL")
                    console.log(view.id)
                    return;
                }
                window.clearInterval(view_interval)
            }, 250)
        }
    }

    // 3) Generate views' contents.
    for (const view of views) {
        if (view.generateContent() === false) {
            const view_interval = window.setInterval(function () {
                if (view.generateContent() === false) {
                    return;
                }
                window.clearInterval(view_interval)
            }, 250)
        }
    }

    // 4) Insert views' contents into views' iframes.
    for (const view of views) {
        if (view.insertContentInIframe() === false) {
            const view_interval = window.setInterval(function () {
                if (view.insertContentInIframe() === false) {
                    return;
                }
                window.clearInterval(view_interval)
            }, 250)
        }
    }

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
