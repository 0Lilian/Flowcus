const generic_view = (function () {

    // Create the GenericView class
    class GenericView extends View {

        generateContent () {

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
    }

    // Instanciate the GenericView class and return the instance
    return new GenericView(id="generic-view",
                           display_name="Generic",
                           icon="",
                           hotkey="",
                           dependencies = [],
                           require_css_reset = false)
})();
views.push(generic_view)
