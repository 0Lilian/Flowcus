const markdown_view = (function () {

    // Create the MarkdownView class
    class MarkdownView extends View {

        generateContent () {

            // Clone the clutter_free body.
            let cloned_clutter_free_body = clutter_free_view._body.cloneNode(true)

            // Apply fixers.
            for (const fixer of markdown_fixers) {
                cloned_clutter_free_body = fixer.fix(cloned_clutter_free_body)
            }

            // Convert the cloned body in markdown.
            const turndownService = new TurndownService({
                headingStyle: 'atx',
                hr: '---',
                bulletListMarker: '-',
                codeBlockStyle: 'fenced',
                emDelimiter: '*',
                preformattedCode: true,
            });

            // Apply extractors.
            for (const extractor of markdown_extractors) {
                turndownService = extractor.applyRuleTo(turndownService)
            }

            this._body = document.createElement("body")
            this._body.innerHTML = "<pre>" + turndownService.turndown(cloned_clutter_free_body.innerHTML)+ "</pre>";
        }
    }

    // Instanciate the MarkdownView class and return the instance
    return new MarkdownView(id="markdown-view",
                            display_name="Markdown view",
                            dependencies = ["clutter_free_view", ],
                            require_css_reset = true)
})();
views.push(markdown_view)
