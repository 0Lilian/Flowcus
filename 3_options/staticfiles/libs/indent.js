
function indent() {
    
    const body_indentation = 20 // In px

    const form_elements = document.body.querySelectorAll("form > *")
    let last_padding_left = null;

    for (const element of form_elements) {

        if (["H1", "H2", "H3", "H4", "H5", "H6"].indexOf(element.tagName) >= 0) {
            last_padding_left = parseFloat(getComputedStyle(element).paddingLeft) + body_indentation + "px"
        }

        else {
            if (last_padding_left) {
                element.style.marginLeft = 0
                element.style.paddingLeft = last_padding_left
            }
        }
    }
}
indent()
