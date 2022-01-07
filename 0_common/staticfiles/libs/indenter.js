class Indenter {

    constructor (section = null, depth = 20, indent_from = 1) {
        this.section = section
        this.depth = depth
        this.indent_from = indent_from
    }

    getTitlePaddingLeft (title) {
        const title_number = parseInt(title.tagName.replace("H", ""))

        if (title_number >= this.indent_from) {
            return (title_number - this.indent_from) * this.depth + "px"
        }
        return 0
    }

    indentSections (sections_to_indent) {

        for (const section of sections_to_indent) {
            console.log(section)

            let last_padding_left = this.depth + "px";

            for (const element of section.children) {

                // Reset the element's margin left
                element.style.marginLeft = 0

                // If it's a title element
                if (["H1", "H2", "H3", "H4", "H5", "H6"].indexOf(element.tagName) >= 0) {
                    last_padding_left = this.getTitlePaddingLeft(element)
                    console.log(last_padding_left)
                }

                // Set the paddingLeft of the element
                element.style.paddingLeft = last_padding_left
            }
        }
    }

    init () {
        // If not any section is given, indent all elements that have the .indented class
        if (this.section === null) {
            const sections_to_indent = document.body.querySelectorAll(".indented")
            this.indentSections(sections_to_indent)
        }

        // Else indent the given section and return it
        else {
            return this.indentSections([this.section, ])
        }
    }
}
