function init () {

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

    // 4) Display the default view.
    Settings.get("default-view", function (value) {
        const view_button = header.header_element.querySelector(`button#${value}-button`)
        view_button.click()
    })
}

// Initialize the extension.
document.addEventListener("readystatechange", function () {
    if (document.readyState == "complete") {
        init();
        header.toggleHeader()
    }
})

/* Listen for background messages */
// browser.runtime.onMessage.addListener((message) => {
//     if (document.readyState === "complete") {
//         header.toggleHeader()
//     }
//     else {
//         document.addEventListener("readystatechange", function () {
//             if (document.readyState == "complete") {
//                 console.log("HEAAAADER")
//                 header.toggleHeader();
//             }
//         })
//     }
// });
