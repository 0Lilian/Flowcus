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
                               icon=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="none" d="M0 0h24v24H0z"/><path d="M21 3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18zM4 10v9h16v-9H4zm0-2h16V5H4v3z"/></svg>`,
                               dependencies = ["clutter_full_view", ],
                               require_css_reset = true)
})();
views.push(clutter_free_view)
