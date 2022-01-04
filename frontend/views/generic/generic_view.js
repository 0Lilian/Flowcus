const generic_view = (function () {

    // Create the GenericView class
    class GenericView extends View {

        generateContent () {

            // Do some generation stuff here
            // ...

            // Fill the this.body variable.
            this.body = document.body.cloneNode(true)
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
