let views = []

class View {

    constructor (id,
                 display_name,
                 icon,
                 hotkey,
                 dependencies = [],
                 use_iframe_isolation = true,
                 require_css_reset = true) {
        this.id = id;
        this.display_name = display_name;
        this.icon = icon;
        this.dependencies = dependencies;
        this.require_css_reset = require_css_reset;
        this.use_iframe_isolation = use_iframe_isolation;
        this.body = document.createElement("body")
        this.iframe;
        this.iframe_window;
        this.iframe_document;
        this.button;
        this.is_ready = false;

    }

    static _initViewIframe (view) {
        return new Promise((resolve, reject) => {
            try {
                if (view.generateIframe() === false) {
                    const view_interval = window.setInterval(function () {
                        if (view.generateIframe() === false) {
                            return;
                        }
                        window.clearInterval(view_interval)
                        resolve()
                    }, 250)
                    return;
                }
                resolve()
            }
            catch (e) {
                reject("Iframe cannot be initialized for view " + view.id + ". Error : " + e)
            }
        })
    }

    static _initViewsIframes () {

        const promises = []

        for (const view of views) {
            promises.push(View._initViewIframe(view))
        }

        return Promise.all(promises)
    }

    static _initViewContent (view) {
        return new Promise((resolve, reject) => {
            try {
                if (view.generateContent() === false) {
                    const view_interval = window.setInterval(function () {
                        if (view.generateContent() === false) {
                            return;
                        }
                        window.clearInterval(view_interval)
                        resolve()
                    }, 250)
                    return;
                }
                resolve()
            }
            catch (e) {
                reject("Content (body) cannot be initialized for view " + view.id + ". Error : " + e)
            }
        })
    }

    static _initViewsContents () {

        const promises = []

        for (const view of views) {
            promises.push(View._initViewContent(view))
        }

        return Promise.all(promises)
    }

    static _insertViewContentInViewIframe (view) {
        return new Promise((resolve, reject) => {
            try {
                if (view.insertContentInIframe() === false) {
                    const view_interval = window.setInterval(function () {
                        if (view.insertContentInIframe() === false) {
                            return;
                        }
                        window.clearInterval(view_interval)
                        resolve()
                    }, 250)
                    return;
                }
                resolve()
            }
            catch (e) {
                reject("Content cannot be inserted in Iframe for view " + view.id + ". Error : " + e)
            }
        })
    }

    static _insertViewsContentsInViewsIframes () {

        const promises = []

        for (const view of views) {
            promises.push(View._insertViewContentInViewIframe(view))
        }

        return Promise.all(promises)
    }

    static init () {
        return Promise.all([View._initViewsIframes(), View._initViewsContents(), View._insertViewsContentsInViewsIframes()])
    }

    static getViewById (id) {
        for (const view of views) {
            if (view.id === id) {
                return view
            }
        }
        return null
    }

    static displayDefaultView () {
        Settings.get("default-view", function (value) {
            View.getViewById(value).displayView()
        })
    }

    waitForDependencies () {
        for (const dependency of this.dependencies) {
            if (eval(dependency + ".is_body_ready") === false) {
                return false
            }
        }
        return true
    }

    generateIframe () {

        if (this.areDependenciesReady() === true) {

            if (this.use_iframe_isolation === true) {
                this.iframe = document.createElement("iframe")
                this.iframe.classList.add("requires-css-reset")
            }
            else {
                this.iframe = document.createElement("section")
            }

            this.iframe.classList.add("view-frame")

            if (this.use_iframe_isolation === true) {
                this.iframe.addEventListener("load", function () {
                        this.iframe_window = this.iframe.contentWindow;
                        this.iframe_document = this.iframe_window.document;
                        this.is_iframe_ready = true;
                }.bind(this))
            }
            else {
                this.is_iframe_ready = true;
            }

            if (this.use_iframe_isolation === true) {
                this.iframe.src = browser.runtime.getURL("/frontend/staticfiles/templates/view.html")
            }
            else {
                const iframe_body = document.createElement("body")
                this.iframe.appendChild(iframe_body)
            }

            document.body.appendChild(this.iframe)

            // Create the view button and add the click event.
            this.button = document.createElement("button")
            this.button.innerHTML = `<span class="icon">${this.icon}</span><span class="name">${this.display_name}</span>`
            this.button.id = this.id + "-button"

            this.button.addEventListener("click", function () {

                // If the view is not ready to be displayed yet, add an interval to display it later.
                if (this.displayView() === false) {
                    const view_interval = window.setInterval(function () {
                        if (this.displayView() === false) {
                            return;
                        }
                        window.clearInterval(view_interval)
                    }, 250)
                }
            }.bind(this))
        }

        // Return false if the dependencies are not ready yet.
        else {
            return false;
        }
    }

    generateContent () {

        if (this.is_iframe_ready === true) {

            this.body.innerHTML = "This content is generated by the default generateContent() method."
            this.is_body_ready = true;
        }

        // Return false if the iframe is not ready yet.
        else {
            return false;
        }
    }

    insertContentInIframe () {

        if (this.is_body_ready === true) {
            if (this.use_iframe_isolation === true) {
                this.iframe_document.body = this.body;
            }
            else {
                const iframe_body = this.iframe.querySelector("body")
                for (const child of this.body.querySelectorAll("body > *")) {
                    iframe_body.appendChild(child)
                }
            }
            this.is_content_inserted = true;
        }

        // Return false if the body is not ready yet.
        else {
            return false;
        }
    }

    displayView () {

        if (this.is_content_inserted === true) {
            for (const view of views) {
                if (view.is_body_ready === true) {
                    view.iframe.style.display = "none";
                }
            }
            this.iframe.style.display = "inline-block";

            // Remove the displayed class from other buttons.
            for (const view of views) {
                view.button.classList.remove("displayed")
            }
            // Add the displayed class to this button
            this.button.classList.add("displayed")
        }

        // Return false if the content is not inserted into the iframe yet.
        else {
            return false;
        }
    }
}
