(function () {

    // Create the View instance
    const clutter_free_view = new View (display_name="Clutter-free",
                                        slug="clutter-free",
                                        icon=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="none" d="M0 0h24v24H0z"/><path d="M21 3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18zM4 10v9h16v-9H4zm0-2h16V5H4v3z"/></svg>`,
                                        hotkey="CTRL+2",
                                        dependencies = ["View.clutter-full", ],
                                        use_iframe_isolation = true,
                                        require_css_reset = true)

    // Create the custom generateContent() method
    function generateContent () {

        return new Promise((resolve, reject) => {

            try {
                // Build a document object from the clutter_full_view.body
                const cloned_document = idocument.cloneNode(true)
                cloned_document.body = View.getById("View.clutter-full").body.cloneNode(true)

                // Apply fixers.
                for (const fixer of clutter_free_fixers) {
                    cloned_document.body = fixer.fix(cloned_document.body)
                }

                // Parse the document using Mercury Parser.
                function onError () {
                    // Add support for local files parsing with a fake url
                    const parsed_body = Mercury.parse(`https://local.file/?path=${window.location.href}`, {html: cloned_document.documentElement.innerHTML}).then(onSuccess.bind(this));
                }

                function onSuccess (result) {
                    if (result.error === true) {
                        onError.call(this)
                    }
                    this.body.innerHTML = result.content;
                }

                const parsed_body = Mercury.parse(window.location.href, {html: cloned_document.documentElement.innerHTML}).then(onSuccess.bind(this));
                this.is_body_ready = true;

                // Resolve the promise.
                resolve()
            }
            catch (error) {
                reject("An error occured while generating content of view " + this.id + ". Error : " + error)
            }
        })
    }

    // Override the default generateContent() method with the custom one
    clutter_free_view.generateContent = generateContent


})();
