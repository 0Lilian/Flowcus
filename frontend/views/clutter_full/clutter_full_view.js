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
                               display_name="Clutter-full view (original page)",
                               dependencies = [],
                               require_css_reset = false)
})();
views.push(clutter_full_view)
