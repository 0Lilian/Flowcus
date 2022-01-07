const generic_markdown_extractor = (function () {

    class GenericMarkdownExtractor extends MarkdownExtractor {

        applyRuleTo (turndownService) {

            // Apply some rules to the turndownService instance here.
            // ...

            return turndownService
        }
    }

    return new GenericMarkdownExtractor()
})();
markdown_extractors.push(generic_markdown_extractor)
