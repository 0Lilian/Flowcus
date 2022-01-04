const medium_clutter_free_fixer = (function () {

    class MediumClutterFreeFixer extends ClutterFreeFixer {

        fix (body) {

            // Check if the current website is a Medium powered website.
            if (window.location.hostname.includes("medium.com") || medium_subwebsites.includes(window.location.hostname)) {
                console.log("ITS A MEDIUM WEBSITE")


                // If a Medium article is loaded and if the user scroll down the page before activation Flowcus, he will trigger lazyloaded
                // footer and the Mercury render will be broken.
                // Isolating only the article's content fix this problem :
                const article = body.querySelector("div.s > article").cloneNode(true)
                body.innerHTML = ""
                body.appendChild(article)



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
