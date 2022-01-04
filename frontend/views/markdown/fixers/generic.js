const generic_markdown_fixer = (function () {

    class GenericMarkdownFixer extends MarkdownFixer {

        fix (body) {

            // Transform the body here.
            // ...

            // Return the body.
            return body
        }
    }

    return new GenericMarkdownFixer()
})();
markdown_fixers.push(generic_markdown_fixer)
