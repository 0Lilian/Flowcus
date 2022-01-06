let idocument;

function initFlowcus () {

    return new Promise((resolve, reject) => {



        // 1) Store the initial document element.
        idocument = document.cloneNode(true)

        // 2) Purge the document.body if at least one view will be displayed.
        for (const view of View.getAll()) {
            if (view.displayed === true) {
                document.body.innerHTML = ""

                // And add the Flowcus class on body
                document.body.classList.add("flowcus")
                break;
            }
        }


        // 3) Insert and display the loader
        // TODO

        // 4) Load fonts (custom fonts are loaded with Javascript to prevent CSP errors on some websites)
        loadFonts()

        // 5) Initialize all the components (views and actions).
        const start = Date.now();
        Component.init()
        .then(() => console.log(`initFlowcus() -> Component.init() time = ${Date.now() - start}ms`))

        // 7) Initialize the header.
        .then(() => Date.now())
        .then((start) => {Header.init(); return start})
        .then((start) => console.log(`initFlowcus() -> Header.init() time = ${Date.now() - start}ms`))

        // 8) Listen for components hotkeys.
        .then(() => Date.now())
        .then((start) => {Component.listenForHotkeys(); return start})
        .then((start) => console.log(`initFlowcus() -> Component.listenForHotkeys() time = ${Date.now() - start}ms`))

        // 8) Display the default view.
        .then(() => Date.now())
        .then((start) => {View.displayDefaultView(); return start})
        .then((start) => console.log(`initFlowcus() -> View.displayDefaultView() time = ${Date.now() - start}ms`))

        // 9) Hide the loader and remove it from the DOM
        // TODO

        // 10.A) Resolve the promise.
        .then(() => resolve())

        // 10.B) Or catch initialization's errors and reject the promise.
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
            .then(() => header.toggleHeader())
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
