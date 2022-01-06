(function () {

    // Create the View instance
    const generic_view =  new View(display_name="Generic",
                                   slug="generic",
                                   icon="",
                                   hotkey="",
                                   dependencies = [],
                                   use_iframe_isolation = false,
                                   require_css_reset = false)

    // Create the custom generateContent() method
    function generateContent () {

            return new Promise((resolve, reject) => {

                try {

                    // Do some generation stuff here
                    // ...

                    // Fill the this.body variable (it already contains a <body> element)
                    this.body = idocument.body.cloneNode(true)

                    // Resolve the promise.
                    resolve()
                }
                catch (error) {
                    reject("An error occured while generating content of view " + view.id + ". Error : " + error)
                }
            })
        }

    // Override the default generateContent() method with the custom one
    generic_view.generateContent = generateContent

})();
