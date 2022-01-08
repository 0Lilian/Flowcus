class BrowserOptionsManager {

    static init () {

        // Retrieve all settings fields.
        const labels = document.querySelectorAll("label");
        const fields = [];
        for (const label of labels) {
            fields.push(label.nextElementSibling)
        }

        // Restore the settings fields values
        this.restoreOptions(fields)

        // Save changes each time they happen on a field
        for (const field of fields) {
            // field.addEventListener("change", this.saveOptions.bind(this, field));
            field.addEventListener("input", this.saveOptions.bind(this, field, false));
        }

    }

    static restoreOptions (fields) {

        for (const field of fields) {

            const default_value = field.getAttribute("default")

            function setValue(value) {
                if (field.tagName === "INPUT" && field.type === "checkbox") {
                    field.checked = value ? value : (default_value ? default_value : "")
                }
                else {
                    field.value = value ? value : (default_value ? default_value : "")
                }

                // Save the field if its default value has been set
                if (value === undefined && default_value) {
                    this.saveOptions(field, true)
                    Settings.get(field.name, function (value) {console.log(value)})
                }

                // Prevent setting the default value if value === "" (do it only if it is undefined)
                else if (value === "") {
                    field.value = ""
                    field.checked = ""
                    this.saveOptions(field, true)
                }

            }

            function onError (error) {
                console.log(`Error: ${error}`);
            }

            Settings.get(field.name, setValue.bind(this))
        }
    }

    static saveOptions(field, silent) {

        // Store datas in browser storage.
        if (field.tagName === "INPUT" && field.type === "checkbox") {
            Settings.set(field.name, field.checked)
        }
        else {
            Settings.set(field.name, field.value)
        }

        // Add a saved message next to the field if there is not already one.
        const old_saved_message = field.parentElement.querySelector(".saved-message")
        if (old_saved_message !== null) {
            old_saved_message.parentElement.removeChild(old_saved_message)
        }

        // Add a saved message next to the field if there is not already one.
        if (!silent) {
            const saved_message = document.createElement("span")
            saved_message.classList.add("saved-message")
            saved_message.innerHTML = "&nbsp;Saved 🗸"
            saved_message.style.opacity = "1"
            saved_message.style.color = "green"
            saved_message.style.display = "inline"
            saved_message.style.fontWeight = "bold"
            saved_message.style.transitionDuration = "500ms"
            if (field.nextElementSibling) {
                field.parentElement.insertBefore(saved_message, field.nextElementSibling)
            }
            else {
                field.parentElement.appendChild(saved_message)
            }

            setTimeout(function () {
                saved_message.style.opacity = "0"
                setTimeout(function () {
                    try{field.parentElement.removeChild(saved_message)} catch (e) {}
                }.bind(this), 500)
            }.bind(this), 2000)
        }
    }
}
