const medium_markdown_fixer = (function () {

    class MediumMarkdownFixer extends MarkdownFixer {

        fix (body) {
            // Check if the current website is a Medium powered website.
            if (window.location.hostname.includes("medium.com") || medium_subwebsites.includes(window.location.hostname)) {

                // Medium websites don't use <code> elements to displays codes, so Turndown will not recognize them as code during HTML
                // to Markdown conversion. This fix transform the DOM to use <code> elements for code blocks.
                const pres = body.querySelectorAll("div pre")
                for (const pre of pres) {

                    const code_block = document.createElement("code")
                    const pre_childs = pre.querySelectorAll("* :not(br)")

                    for (const child of pre_childs) {
                        try {
                            code_block.innerHTML += child.innerHTML + "\n\x20\x20"
                        } catch {}
                    }
                    pre.innerHTML = ""
                    pre.appendChild(code_block)
                }
            }

            // Return the body.
            return body
        }
    }

    return new MediumMarkdownFixer()
})();
markdown_fixers.push(medium_markdown_fixer)
