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
            field.addEventListener("change", this.saveOptions.bind(this, field));
            field.addEventListener("input", this.saveOptions.bind(this, field));
        }

    }

    static restoreOptions (fields) {

        for (const field of fields) {

            function setValue(value) {
                if (field.tagName === "INPUT" && field.type === "checkbox") {
                    field.checked = value
                }
                else {
                    field.value = value
                }
            }

            function onError (error) {
                console.log(`Error: ${error}`);
            }

            Settings.get(field.name, setValue)
        }
    }

    static saveOptions(field, e) {

        e.preventDefault();

        // Store datas in browser storage.
        if (field.tagName === "INPUT" && field.type === "checkbox") {
            Settings.set(field.name, field.checked)
        }
        else {
            Settings.set(field.name, field.value)
        }

        // Add a saved message next to the field if there is not already one.
        if (field.querySelector(".saved-message") === null) {
            const saved_message = document.createElement("span")
            saved_message.classList.add("saved-message")
            saved_message.innerText = "Saved 🗸"
            saved_message.style.opacity = "1"
            saved_message.style.color = "green"
            saved_message.style.transitionDuration = "2000ms"
            field.parentElement.appendChild(saved_message)

            setTimeout(function () {
                saved_message.style.opacity = "0"
                setTimeout(function () {
                    field.parentElement.removeChild(saved_message)
                }.bind(this), 500)
            }.bind(this), 2000)
        }
    }
}
