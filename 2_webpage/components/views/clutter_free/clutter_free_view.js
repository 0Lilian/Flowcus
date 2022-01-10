(function () {

    // Create the View instance
    const clutter_free_view = new View (display_name="Clutter-free",
                                        slug="clutter-free",
                                        icon=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="none" d="M0 0h24v24H0z"/><path d="M21 3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18zM4 10v9h16v-9H4zm0-2h16V5H4v3z"/></svg>`,
                                        hotkey="CTRL+2",
                                        dependencies = ["View.clutter-full", ],
                                        scripts_files = [],
                                        styles_files = [
                                            "/2_webpage/components/views/clutter_free/staticfiles/styles/body.css",
                                            "/2_webpage/components/views/clutter_free/staticfiles/styles/adjustments.css",
                                            "/2_webpage/components/views/common/staticfiles/styles/view.css"
                                        ],
                                        use_iframe_isolation = true,
                                        require_css_reset = true)

    // Create the custom generateContent() method
    function generateContent () {

        return new Promise((resolve, reject) => {

            try {
                // Build a document object from the clutter_full_view.body. Mercury seems to works only on full document element that's
                // why we don't just parse the body
                const cloned_document = document.cloneNode(true)
                cloned_document.body = View.getById("View.clutter-full").body.cloneNode(true)

                // Apply fixers.
                for (const fixer of clutter_free_fixers) {
                    cloned_document.body = fixer.fix(cloned_document.body)
                }

                function applyMercuryDatas (datas) {

                    return new Promise((resolve, reject) => {

                        // Store the Mercury datas into the datas dict
                        this.datas = datas

                        // Build the frame body from the clutter_free template and the Mercury datas.
                        fetch(browser.runtime.getURL("/2_webpage/components/views/clutter_free/staticfiles/templates/clutter_free.html"))
                        .then((response) => {
                            response.text().then((template_content) => {

                                const nunjucks_env = NunjucksManager.init()

                                Settings.get("clutter-free-date-format", (date_format) => {
                                    this.body.innerHTML = nunjucks_env.renderString(template_content, {
                                        domain: datas.domain,
                                        url: datas.url,
                                        title: datas.title,
                                        author: datas.author,
                                        publication_datetime: luxon.DateTime.fromISO(datas.date_published).toFormat(date_format),
                                        content: datas.content,
                                    });

                                    resolve()
                                })
                            })
                        })
                    })
                }

                // Parse the document using Mercury Parser.
                const parsed_body = Mercury.parse(window.location.href, {html: cloned_document.documentElement.innerHTML})
                .then((datas) => {
                    // If an error happens it means that it's a local path
                    if (datas.error === true) {

                        // Add support for local files parsing with a fake url
                        return Mercury.parse(`https://local.file/?path=${window.location.href}`, {html: cloned_document.documentElement.innerHTML})
                        .then((datas) => applyMercuryDatas.call(this, datas))
                        .then(resolve())
                    }
                    else {
                        applyMercuryDatas.call(this, datas)
                        .then(resolve())
                    }

                })

                // Resolve the promise.
            }
            catch (error) {
                reject("An error occured while generating content of view " + this.id + ". Error : " + error)
            }
        })
    }

    // Override the default generateContent() method with the custom one
    clutter_free_view.generateContent = generateContent


})();
