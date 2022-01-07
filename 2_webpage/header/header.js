let header;

const Header = (function () {

    class Header {

        constructor () {
            this.header_element = null;
            this.displayed = false;
        }

        static init () {

            return new Promise((resolve, reject) => {

                try {

                    // Create the header's instance.
                    header = new Header()

                    header.header_element = document.createElement("header")
                    header.header_element.id = "flowcus-header"

                    // Add header's style classes.
                    Settings.get("sticky-header", function (value) {
                        if (value === true) {
                            header.header_element.classList.add("sticky")
                        }
                    }.bind(header))

                    Settings.get("header-layout", function (value) {
                        header.header_element.classList.add(`${value}-layout`)

                        if (value === "ultra-condensed") {

                            Settings.get("ultra-condensed-hover", function (another_value) {
                                if (another_value === true) {

                                    header.header_element.addEventListener("mouseover", function () {
                                        header.header_element.classList.remove(`ultra-condensed-layout`)
                                        header.header_element.classList.add(`condensed-layout`)
                                    }.bind(header))

                                    header.header_element.addEventListener("mouseout", function () {
                                        header.header_element.classList.remove(`condensed-layout`)
                                        header.header_element.classList.add(`ultra-condensed-layout`)
                                    }.bind(header))
                                }
                            }.bind(header))
                        }
                    }.bind(header))

                    header.header_element.classList.add("requires-css-reset")

                    // Create and insert the header's 'views' section.
                    const header_views = document.createElement("section")
                    header_views.id = "views"
                    header.header_element.appendChild(header_views)

                    // Create and insert the views title.
                    const header_views_title = document.createElement("h2")
                    header_views_title.innerText = "Views"
                    header_views.appendChild(header_views_title)

                    // Create and insert the views nav
                    const header_views_nav = document.createElement("nav")
                    header_views.appendChild(header_views_nav)

                    // Insert the views buttons.
                    for (const view of View.getAll()) {
                        if (view.displayed === true) {
                            if (view.button) {
                                header_views_nav.appendChild(view.button)
                            }
                        }
                    }

                    // Create and insert the header's 'actions' section.
                    const header_actions = document.createElement("section")
                    header_actions.id = "actions"
                    header.header_element.appendChild(header_actions)

                    // Create and insert the actions title.
                    const header_actions_title = document.createElement("h2")
                    header_actions_title.innerText = "Actions"
                    header_actions.appendChild(header_actions_title)

                    // Create and insert the actions nav
                    const header_actions_nav = document.createElement("nav")
                    header_actions.appendChild(header_actions_nav)

                    // Insert the actions buttons.
                    for (const action of Action.getAll()) {
                        if (action.displayed === true) {
                            if (action.button) {
                                header_actions_nav.appendChild(action.button)
                            }
                        }
                    }

                    // Resolve the promise
                    resolve()
                }

                catch (e) {
                    reject("Header cannot be initialized. Error : " + e)
                }
            })
        }

        displayHeader () {
            try {
                document.body.insertBefore(this.header_element, document.body.firstChild)
            }
            catch {
                document.body.appendChild(this.header_element)
            }

            // Add 'flowcus-header-displayed' class to the body.
            // document.body.classList.add("flowcus-header-displayed")

            // Retrieve the header's height and set body padding-top with this value.
            document.body.style.paddingTop = this.header_element.offsetHeight + "px"

            // Size views' iframes' height.
            for (const view of View.getAll()) {
                if (view.displayed === true) {
                    // if (view.use_iframe_isolation === true) {
                        view.iframe.style.height = `calc(100vh - ${document.body.style.paddingTop})`
                        view.iframe.style.top = `${document.body.style.paddingTop}`
                    // }
                }
            }

            // Mark the header as displayed.
            this.displayed = true;
        }

        hideHeader () {
            document.body.removeChild(this.header_element)

            // Remove 'flowcus-header-displayed' class from the body.
            // document.body.classList.remove("flowcus-header-displayed")

            // Reset the body's padding-top
            document.body.style.paddingTop = "inherit";

            // Size views' iframes' height.
            for (const view of View.getAll()) {
                if (view.displayed === true) {
                    if (view.use_iframe_isolation === true) {
                        view.iframe.style.height = "100vh";
                    }
                }
            }

            // Mark the header as hidden.
            this.displayed = false;
        }

        toggleHeader () {
            if (this.displayed === true) {
                this.hideHeader()
            }
            else {
                this.displayHeader()
            }
        }
    }

    return Header
})();
