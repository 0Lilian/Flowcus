(function () {

    // Create the View instance
    const clutter_full_view = new View(display_name="Clutter-full",
                                       slug="clutter-full",
                                       icon=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="none" d="M0 0h24v24H0z"/><path d="M4 8h16V5H4v3zm10 11v-9h-4v9h4zm2 0h4v-9h-4v9zm-8 0v-9H4v9h4zM3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/></svg>`,
                                       hotkey="CTRL+1",
                                       dependencies = [],
                                       template_path = null,
                                       main_script = null,
                                       use_iframe_isolation = false,
                                       require_css_reset = false)

    // Create the custom generateContent() method
    function generateContent () {

        return new Promise((resolve, reject) => {

            try {

                // Clone the document body
                for (const element of document.body.children) {
                    this.body.appendChild(element)
                }

                // Resolve the promise.
                resolve()
            }
            catch (error) {
                reject("An error occured while generating content of view " + view.id + ". Error : " + error)
            }
        })
    }

    // Override the default generateContent() method with the custom one
    clutter_full_view.generateContent = generateContent

})();
