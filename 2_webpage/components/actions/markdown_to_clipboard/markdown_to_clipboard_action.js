(function () {

    // Create the Action instance
    const markdown_to_clipboard_action =  new Action(display_name="Markdown ➜ Clipboard",
                                                     slug="markdown-to-clipboard",
                                                     icon="C",
                                                     hotkey="CTRL+Alt+C",
                                                     dependencies = ["View.markdown", "View.clutter-free"])

    // Create the custom execute() method
    function execute () {

        return new Promise((resolve, reject) => {

            try {

                let new_clip_content = "";
                const clutter_free_view = View.getById("View.clutter-free")

                Settings.get("clipboard-note-formatting", function (header_template) {

                    const nunjucks_env = NunjucksManager.init()

                    new_clip_content = nunjucks_env.renderString(header_template, {
                        now: luxon.DateTime.now().toString(),
                        title: clutter_free_view.datas.title,
                        url: clutter_free_view.datas.url,
                        domain: clutter_free_view.datas.domain,
                        excerpt: clutter_free_view.datas.excerpt,
                        publication_datetime: clutter_free_view.datas.date_published,
                        author: clutter_free_view.datas.author,
                        words_count: clutter_free_view.datas.word_count,
                    });
                }).then(() => {

                    // Add the new note's body
                    new_clip_content += View.getById("View.markdown").body.textContent

                    const textarea = document.createElement("textarea")
                    textarea.textContent = new_clip_content
                    document.body.appendChild(textarea)
                    textarea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textarea)

                    // Resolve the promise.
                    resolve()
                })
            }
            catch (error) {
                reject("An error occured while executing action " + this.id + ". Error : " + error)
            }
        })
    }

    // Override the default execute() method with the custom one
    markdown_to_clipboard_action.execute = execute

})();
