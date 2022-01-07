
function init () {

    // Retrieve all data fields.
    const labels = document.querySelectorAll("form label");
    const fields = [];
    for (const label of labels) {
        fields.push(label.nextElementSibling)
    }

    function saveOptions(e) {

        e.preventDefault();

        // Store datas in browser storage.
        if (this.tagName === "INPUT" && this.type === "checkbox") {
            Settings.set(this.name, this.checked)
        }
        else {
            Settings.set(this.name, this.value)
        }

        // Add a saved message next to the field.
        const saved_message = document.createElement("span")
        saved_message.id = "saved-message"
        saved_message.innerText = "Saved 🗸"
        saved_message.style.opacity = "1"

        this.parentElement.appendChild(saved_message)
        setTimeout(function () {
            saved_message.style.opacity = "0"
            setTimeout(function () {
                this.parentElement.removeChild(saved_message)
            }.bind(this), 500)
        }.bind(this), 2000)
    }

    function restoreOptions() {

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

    restoreOptions()

    for (const field of fields) {
        field.addEventListener("change", saveOptions.bind(field));
    }
}


document.addEventListener('DOMContentLoaded', init);
