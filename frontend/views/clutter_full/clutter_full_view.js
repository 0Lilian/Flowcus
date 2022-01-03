const clutter_full_view = (function () {

    // Create the ClutterFullView class
    class ClutterFullView extends View {

        generateContent () {

            // Remove body_scripts to prevent them to run twice
            const body_scripts = document.querySelectorAll("body script")
            for (const script of body_scripts) {
                script.parentNode.removeChild(script)
            }
            const body_iframes = document.querySelectorAll("body iframe")
            for (const iframe of body_iframes) {
                iframe.parentNode.removeChild(iframe)
            }

            this._body = document.body.cloneNode(true)
        }
    }

    // Instanciate the ClutterFullView class and return the instance
    return new ClutterFullView(id="clutter-full-view",
                               display_name="Clutter-full",
                               icon=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="none" d="M0 0h24v24H0z"/><path d="M4 8h16V5H4v3zm10 11v-9h-4v9h4zm2 0h4v-9h-4v9zm-8 0v-9H4v9h4zM3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/></svg>`,
                               hotkey="CTRL+1",
                               dependencies = [],
                               require_css_reset = false)
})();
views.push(clutter_full_view)
