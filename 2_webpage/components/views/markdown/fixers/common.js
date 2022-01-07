const common_markdown_fixer = (function () {

    class CommonMarkdownFixer extends MarkdownFixer {

        fix (body) {

            // Fix unescaped `
            body.innerHTML = body.innerHTML.replaceAll("`", "\\`")

            // Return the body.
            return body
        }
    }

    return new CommonMarkdownFixer()
})();
markdown_fixers.push(common_markdown_fixer)
