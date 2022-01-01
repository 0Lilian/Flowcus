const header = (function () {

    class Header {

        constructor (extension_title) {
            this.extension_title = extension_title
            this.header_element = null;
            this.displayed = false;
        }

        initHeader () {

            this.header_element = document.createElement("header")
            this.header_element.id = "harmonic-header"

            const header_title = document.createElement("h1")
            header_title.innerText = this.extension_title
            this.header_element.appendChild(header_title)

            const header_nav = document.createElement("nav")
            this.header_element.appendChild(header_nav)

            const header_nav_title = document.createElement("h2")
            header_nav_title.innerText = "Change view :"
            header_nav.appendChild(header_nav_title)

            for (const view of views) {
                const header_nav_button = document.createElement("button")
                header_nav_button.innerText = view.display_name
                // header_nav_button.id = view.id + "-button"
                header_nav.appendChild(header_nav_button)

                header_nav_button.addEventListener("click", function () {
                    view.displayView()
                })
            }
        }

        displayHeader () {
            try {
                document.body.insertBefore(this.header_element, document.body.firstChild)
            }
            catch {
                document.body.appendChild(this.header_element)
            }

            // Add 'harmonic-header-displayed' class to the body.
            document.body.classList.add("harmonic-header-displayed")

            // Mark the header as displayed.
            this.displayed = true;
        }

        hideHeader () {
            document.body.removeChild(this.header_element)

            // Remove 'harmonic-header-displayed' class from the body.
            document.body.classList.remove("harmonic-header-displayed")

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
    return new Header(extension_title="HarmonicToolbox")
})();
