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

        console.log("OOO")
        console.log(cloned_document.documentElement.innerHTML)

            // Parse the document using Mercury Parser.

            function onError () {
                // Add support for local files parsing with a fake url
                // const parsed_body = Mercury.parse(null, {html: cloned_document.documentElement.innerHTML}).then(function (result) {
                const parsed_body = Mercury.parse(`https://local.file/?path=${window.location.href}`, {html: cloned_document.documentElement.innerHTML}).then(onSuccess.bind(this));
            }

            function onSuccess (result) {
                if (result.error === true) {
                    onError.call(this)
                }

                this._body = document.createElement("body2")
                document.documentElement.appendChild(this._body)
                this._body.style.display = "none";
                this._body.innerHTML = result.content;
            }

            // const parsed_body = Mercury.parse(null, {html: cloned_document.documentElement.innerHTML}).then(function (result) {
            const parsed_body = Mercury.parse(window.location.href, {html: cloned_document.documentElement.innerHTML}).then(onSuccess.bind(this));
        }
    }

    // Instanciate the ClutterFreeView class and return the instance
    return new ClutterFreeView(id="clutter-free-view",
                               display_name="Clutter-free",
                               icon=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="none" d="M0 0h24v24H0z"/><path d="M21 3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18zM4 10v9h16v-9H4zm0-2h16V5H4v3z"/></svg>`,
                               hotkey="CTRL+2",
                               dependencies = ["clutter_full_view", ],
                               require_css_reset = true)
})();
views.push(clutter_free_view)
