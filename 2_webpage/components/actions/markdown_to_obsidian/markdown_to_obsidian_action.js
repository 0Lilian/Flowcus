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

                const markdown_view_content = View.getById("View.markdown").body.textContent

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
                const file_name = getFileName("A super title !");


                Settings.get("obsidian-vault", function (vault_name) {

                    Settings.get("obsidian-folder", function (folder_name) {
                        document.location.href = "obsidian://new?"
                            + "file=" + encodeURIComponent(folder_name + file_name)
                            + "&content=" + encodeURIComponent(markdown_view_content)
                            + vault_name ;
                    })
                })

                // Resolve the promise.
                resolve()
            }
            catch (error) {
                reject("An error occured while executing action " + this.id + ". Error : " + error)
            }
        })
    }

    // Override the default execute() method with the custom one
    markdown_to_obsidian_action.execute = execute

})();
