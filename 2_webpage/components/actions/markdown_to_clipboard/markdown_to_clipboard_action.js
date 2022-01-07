(function () {

    // Create the Action instance
    const markdown_to_clipboard_action =  new Action(display_name="Markdown ➜ Clipboard",
                                                     slug="markdown-to-clipboard",
                                                     icon="C",
                                                     hotkey="CTRL+Alt+C",
                                                     dependencies = ["View.markdown", ])

    // Create the custom execute() method
    function execute () {

        return new Promise((resolve, reject) => {

            try {

                const markdown_view_content = View.getById("View.markdown").body.innerText

                const textarea = document.createElement("textarea")
                textarea.textContent = markdown_view_content
                // textarea.style.display = "none";
                document.body.appendChild(textarea)
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea)

                // Resolve the promise.
                resolve()
            }
            catch (error) {
                reject("An error occured while executing action " + this.id + ". Error : " + error)
            }
        })
    }

    // Override the default execute() method with the custom one
    markdown_to_clipboard_action.execute = execute

})();
