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
        this.is_body_ready = false;
        this.iframe;
        this.iframe_window;
        this.iframe_document;
        this.is_iframe_ready = false;
        this.is_content_inserted = false;

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

    areDependenciesReady () {
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

            this.iframe.style.display = "none"; // TO REPLACE BY CSS
            document.body.appendChild(this.iframe)
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
        }

        // Return false if the content is not inserted into the iframe yet.
        else {
            return false;
        }

        // // Add the css-reset class to document.body if required
        // if (this.require_css_reset === true) {
        //     document.body.classList.add("requires-css-reset")
        // }
        // else {
        //     document.body.classList.remove("requires-css-reset")
        // }
    }
}
