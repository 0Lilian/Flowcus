(function () {

    // Create the Action instance
    const markdown_to_obsidian_action =  new Action(display_name="Markdown ➜ Obsidian",
                                                    slug="markdown-to-obsidian",
                                                    icon="O",
                                                    hotkey="CTRL+Alt+O",
                                                    dependencies = ["View.markdown", ])

    // Create the custom execute() method
    function execute () {

        return new Promise((resolve, reject) => {

            try {

                let new_note_content = "";
                const clutter_free_view = View.getById("View.clutter-free")

                Settings.get("obsidian-note-formatting", function (header_template) {

                    const nunjucks_env = NunjucksManager.init()

                    new_note_content = nunjucks_env.renderString(header_template, {
                        now: luxon.DateTime.now().toString(),
                        title: clutter_free_view.datas.title,
                        url: clutter_free_view.datas.url,
                        domain: clutter_free_view.datas.domain,
                        excerpt: clutter_free_view.datas.excerpt,
                        publication_datetime: clutter_free_view.datas.date_published,
                        author: clutter_free_view.datas.author,
                        words_count: clutter_free_view.datas.word_count,
                    });
                    console.log(clutter_free_view.datas)
                }).then(() => {

                    // Add the new note's body
                    new_note_content += View.getById("View.markdown").body.textContent

                    function getFileName(file_name) {
                        var userAgent = window.navigator.userAgent,
                        platform = window.navigator.platform,
                        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];

                        if (windowsPlatforms.indexOf(platform) !== -1) {
                            file_name = file_name.replace(':', '').replace(/[/\\?%*|"<>]/g, '-');
                        }
                        else {
                            file_name = file_name.replace(':', '').replace(/\//g, '-').replace(/\\/g, '-');
                            }
                            return file_name;
                        }
                        const file_name = getFileName(clutter_free_view.datas.title);

                        Settings.get("obsidian-vault", function (vault_name) {

                            Settings.get("obsidian-folder", function (folder_name) {
                                const url = "obsidian://new"
                                + "?file=" + encodeURIComponent(folder_name + file_name)
                                + "&content=" + encodeURIComponent(new_note_content)
                                + '&vault=' + encodeURIComponent(vault_name);
                                document.location.href = url;
                            })
                        })

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
    markdown_to_obsidian_action.execute = execute

})();
