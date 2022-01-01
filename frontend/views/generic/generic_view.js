const generic_view = (function () {

    // Create the GenericView class
    class GenericView extends View {

        generateContent () {

            // Do some generation stuff here
            // ...

            // Fill the this._body variable.
            this._body = document.body.cloneNode(true)
        }
    }

    // Instanciate the GenericView class and return the instance
    return new GenericView()
})();
views.push(generic_view)
