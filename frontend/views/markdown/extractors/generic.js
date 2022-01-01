const generic_extractor = (function () {

    class GenericExtractor extends MarkdownExtractor {

        applyRuleTo (turndownService) {

            // Apply some rules to the turndownService instance here.
            // ...

            return turndownService
        }
    }

    return new GenericExtractor()
})();
markdown_extractors.push(generic_fixer)
