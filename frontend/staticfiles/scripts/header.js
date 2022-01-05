const header = (function () {

    class Header {

        constructor (extension_title) {
            this.extension_title = extension_title
            this.header_element = null;
            this.displayed = false;
        }

        initHeader () {

            return new Promise((resolve, reject) => {

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

                    if (value === "ultra-condensed") {

                        Settings.get("ultra-condensed-hover", function (another_value) {
                            if (another_value === true) {

                                this.header_element.addEventListener("mouseover", function () {
                                    this.header_element.classList.remove(`ultra-condensed-layout`)
                                    this.header_element.classList.add(`condensed-layout`)
                                }.bind(this))

                                this.header_element.addEventListener("mouseout", function () {
                                    this.header_element.classList.remove(`condensed-layout`)
                                    this.header_element.classList.add(`ultra-condensed-layout`)
                                }.bind(this))
                            }
                        }.bind(this))
                    }
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

                // Apply CSS variables option
                Settings.get("header-primary-color", function (value) {
                    const color = tinycolor(value)
                    document.documentElement.style.setProperty('--color-primary-very-light', tinycolor(value).lighten(30).toString());
                    document.documentElement.style.setProperty('--color-primary-light', tinycolor(value).lighten(15).toString());
                    document.documentElement.style.setProperty('--color-primary', value);
                    document.documentElement.style.setProperty('--color-primary-dark', tinycolor(value).darken(15).toString());
                    document.documentElement.style.setProperty('--color-primary-very-dark', tinycolor(value).darken(30).toString());
                }.bind(this))

                Settings.get("header-secondary-color", function (value) {
                    const color = tinycolor(value)
                    document.documentElement.style.setProperty('--color-secondary-very-light', tinycolor(value).lighten(30).toString());
                    document.documentElement.style.setProperty('--color-secondary-light', tinycolor(value).lighten(15).toString());
                    document.documentElement.style.setProperty('--color-secondary', value);
                    document.documentElement.style.setProperty('--color-secondary-dark', tinycolor(value).darken(15).toString());
                    document.documentElement.style.setProperty('--color-secondary-very-dark', tinycolor(value).darken(30).toString());
                }.bind(this))

                // Create and insert the header's 'views' section.
                const header_views = document.createElement("section")
                header_views.id = "views"
                this.header_element.appendChild(header_views)

                // Create and insert the views title.
                const header_views_title = document.createElement("h2")
                header_views_title.innerText = "Views"
                header_views.appendChild(header_views_title)

                // Create and insert the views nav
                const header_views_nav = document.createElement("nav")
                header_views.appendChild(header_views_nav)

                // Create and insert the views buttons.
                let buttons = []
                for (const view of views) {
                    const header_view_button = document.createElement("button")
                    header_view_button.innerHTML = `<span class="icon">${view.icon}</span><span class="name">${view.display_name}</span>`
                    header_view_button.id = view.id + "-button"
                    header_views_nav.appendChild(header_view_button)

                    // Add the button as a property of the view object.
                    view.header_button = header_view_button

                    // Push the button to the buttons array
                    buttons.push(header_view_button)

                    header_view_button.addEventListener("click", function () {

                        // If the view is not ready to be displayed yet, add an interval to display it later.
                        if (view.displayView() === false) {
                            const view_interval = window.setInterval(function () {
                                   if (view.displayView() === false) {
                                       return;
                                   }
                                   window.clearInterval(view_interval)
                               }, 500)
                        }

                        // Remove the displayed class from other buttons.
                        for (const button of buttons) {
                            button.classList.remove("displayed")
                        }
                        // Add the displayed class to this button
                        header_view_button.classList.add("displayed")

                    })
                }


                // Create and insert the header's 'actions' section.
                const header_actions = document.createElement("section")
                header_actions.id = "actions"
                this.header_element.appendChild(header_actions)

                // Create and insert the actions title.
                const header_actions_title = document.createElement("h2")
                header_actions_title.innerText = "Actions"
                header_actions.appendChild(header_actions_title)

                // Create and insert the actions nav
                const header_actions_nav = document.createElement("nav")
                header_actions.appendChild(header_actions_nav)

                // Create and insert the actions buttons.
                // TODO

                resolve()
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

            // Size views' iframes.
            // const style = document.createElement("style")
            // style.innerHTML = `
            //     .view-frame {
            //         width: 100vw;
            //         height: 100vh;
            //     }
            // `
            for (const view of views) {
                if (view.use_iframe_isolation === true) {
                    view.iframe.style.height = `calc(100vh - ${document.body.style.paddingTop})`
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
