const medium_clutter_free_fixer = (function () {

    class MediumClutterFreeFixer extends ClutterFreeFixer {

        fix (body) {

            // Check if the current website is a Medium powered website.
            if (window.location.hostname.includes("medium.com") || medium_subwebsites.includes(window.location.hostname)) {

                // If a Medium article is loaded and if the user scroll down the page before activation Flowcus, he will trigger lazyloaded
                // footer and the Mercury render will be broken.
                // Isolating only the article's content fix this problem.
                // In addtion it improves the performance because Mercury will have less work (~30% faster)
                const article = body.querySelector("div.s > article").cloneNode(true)
                body.innerHTML = ""
                body.appendChild(article)

                // Fix code blocks that are not using <code> element in Medium powered websites.
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

                // Fix line breaks in code blocks.
                const code_blocks = body.querySelectorAll("code")
                for (const code_block of code_blocks) {
                    code_block.innerHTML = code_block.innerHTML.replaceAll("<br>", "\n\x20\x20")
                    code_block.innerHTML = code_block.innerHTML.replaceAll("<br/>", "\n\x20\x20")
                }
            }

            // Return the body.
            return body
        }
    }

    return new MediumClutterFreeFixer()
})();
clutter_free_fixers.push(medium_clutter_free_fixer)
