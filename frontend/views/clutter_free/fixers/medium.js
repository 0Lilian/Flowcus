const medium_fixer = (function () {

    class MediumFixer extends ClutterFreeFixer {

        fix (body) {

            // Fix code blocks that are not using <code> element in Medium powered websites.
            const pres = body.querySelectorAll("div pre")
            for (const pre of pres) {
                console.log(pre)

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

            // Fix line breaks in code blocks.
            const code_blocks = body.querySelectorAll("code")
            for (const code_block of code_blocks) {
                code_block.innerHTML = code_block.innerHTML.replaceAll("<br>", "\n\x20\x20")
                code_block.innerHTML = code_block.innerHTML.replaceAll("<br/>", "\n\x20\x20")
            }

            // Return the body.
            return body
        }
    }

    return new MediumFixer()
})();
clutter_free_fixers.push(medium_fixer)
