const header = (function () {

    class Header {

        constructor (extension_title) {
            this.extension_title = extension_title
            this.header_element = null;
            this.displayed = false;
        }

        initHeader () {

            this.header_element = document.createElement("header")
            this.header_element.id = "flowcus-header"

            // Add header's style classes.
            Settings.get("sticky-header", function (value) {
                if (value === true) {
                    this.header_element.classList.add("sticky")
                }
            }.bind(this))

            Settings.get("header-layout", function (value) {
                this.header_element.classList.add(`${value}-layout`)
                document.body.classList.add(`flowcus-header-${value}-layout`)
            }.bind(this))

            Settings.get("condensed-layout-behavior", function (value) {
                this.header_element.classList.add(`condensed-${value}-behavior`)
            }.bind(this))

            Settings.get("display-views-hotkeys", function (value) {
                if (value === true) {
                    this.header_element.classList.add("display-views-hotkeys")
                }
            }.bind(this))

            Settings.get("display-actions-hotkeys", function (value) {
                if (value === true) {
                    this.header_element.classList.add("display-actions-hotkeys")
                }
            }.bind(this))

            this.header_element.classList.add("requires-css-reset")


            // Create and insert the header's title.
            // const header_title = document.createElement("h1")
            // header_title.innerText = this.extension_title
            // this.header_element.appendChild(header_title)


            // Create and insert the header's 'views' section.
            const header_views = document.createElement("section")
            header_views.id = "views"
            this.header_element.appendChild(header_views)

            // Create and insert the views title.
            const header_views_title = document.createElement("h2")
            header_views_title.innerText = "Views :"
            header_views.appendChild(header_views_title)

            // Create and insert the views nav
            const header_views_nav = document.createElement("nav")
            header_views.appendChild(header_views_nav)

            // Create and insert the views buttons.
            for (const view of views) {
                const header_views_button = document.createElement("button")
                header_views_button.innerText = view.display_name
                header_views_nav.appendChild(header_views_button)

                header_views_button.addEventListener("click", function () {
                    view.displayView()
                })
            }


            // Create and insert the header's 'actions' section.
            const header_actions = document.createElement("section")
            header_actions.id = "actions"
            this.header_element.appendChild(header_actions)

            // Create and insert the actions title.
            const header_actions_title = document.createElement("h2")
            header_actions_title.innerText = "Actions :"
            header_actions.appendChild(header_actions_title)

            // Create and insert the actions nav
            const header_actions_nav = document.createElement("nav")
            header_actions.appendChild(header_actions_nav)

            // Create and insert the actions buttons.
            // TODO

        }

        displayHeader () {
            try {
                document.body.insertBefore(this.header_element, document.body.firstChild)
            }
            catch {
                document.body.appendChild(this.header_element)
            }

            // Add 'flowcus-header-displayed' class to the body.
            document.body.classList.add("flowcus-header-displayed")

            // Mark the header as displayed.
            this.displayed = true;
        }

        hideHeader () {
            document.body.removeChild(this.header_element)

            // Remove 'flowcus-header-displayed' class from the body.
            document.body.classList.remove("flowcus-header-displayed")

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

    // Instanciate the Header class and return the instance
    return new Header(extension_title="Flowcus")
})();
