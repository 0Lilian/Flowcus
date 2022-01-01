function init () {

    // 1) Generate views' contents.
    for (const view of views) {

        // Wait for dependencies if they are not ready yet.
        if (view.areDependenciesReady() === false) {
            let view_interval = window.setInterval(function () {
                if (view.areDependenciesReady() === true) {
                    view.generateContent()
                    window.clearInterval(view_interval)
                }
            }, 2000)
        }

        // Else generate the view's content.
        else {
            view.generateContent()
        }
    }

    // 2) Initialize the header.
    header.initHeader()
}

// Initialize the extension.
document.addEventListener("readystatechange", function () {
    if (document.readyState == "complete") {
        console.log("INIIIT")
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
