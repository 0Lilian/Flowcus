const common_fixer = (function () {

    class CommonFixer extends MarkdownFixer {

        fix (body) {

            // Fix unescaped `
            // TODO

            // Return the body.
            return body
        }
    }

    return new CommonFixer()
})();
markdown_fixers.push(common_fixer)
