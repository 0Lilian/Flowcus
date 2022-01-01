const generic_fixer = (function () {

    class GenericFixer extends MarkdownFixer {

        fix (body) {

            // Transform the body here.
            // ...

            // Return the body.
            return body
        }
    }

    return new GenericFixer()
})();
markdown_fixers.push(generic_fixer)
