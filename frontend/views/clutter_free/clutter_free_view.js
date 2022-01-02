const clutter_free_view = (function () {

    // Create the ClutterFreeView class
    class ClutterFreeView extends View {

        generateContent () {
            // Build a document object from the clutter_full_view._body
            const cloned_document = document.cloneNode(true)
            cloned_document.body.innerHTML = clutter_full_view._body.innerHTML

            // Apply fixers.
            for (const fixer of clutter_free_fixers) {
                cloned_document.body = fixer.fix(cloned_document.body)
            }

            // Parse the document using Mercury Parser.
            const parsed_body = Mercury.parse(null, {html: cloned_document.documentElement.innerHTML}).then(function (result) {
                this._body = document.createElement("body")
                this._body.innerHTML = result.content;
            }.bind(this));
        }
    }

    // Instanciate the ClutterFreeView class and return the instance
    return new ClutterFreeView(id="clutter-free-view",
                               display_name="Clutter-free",
                               icon="",
                               dependencies = ["clutter_full_view", ],
                               require_css_reset = true)
})();
views.push(clutter_free_view)
