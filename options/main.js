
function init () {

    const labels = document.querySelectorAll("form label");
    const fields = [];
    for (const label of labels) {
        fields.push(label.nextElementSibling)
    }
    const saved = document.querySelector("#saved")

    function saveOptions(e) {

        e.preventDefault();

        // Retrieve fields datas.
        let datas = {};
        for (const field of fields) {
            if (field.tagName === "INPUT" && field.type === "checkbox") {
                datas[field.name] = field.checked
            }
            else {
                datas[field.name] = field.value
            }
        }

        // Store datas in browser storage.
        browser.storage.sync.set(datas);

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

            function setValue(result) {
                if (field.tagName === "INPUT" && field.type === "checkbox") {
                    field.checked = result[field.name]
                }
                else {
                    field.value = result[field.name]
                }
            }

            function onError (error) {
                console.log(`Error: ${error}`);
            }

            const getting = browser.storage.sync.get(field.name).then(setValue, onError)
        }
    }

    restoreOptions()

    for (const field of fields) {
        field.addEventListener("change", saveOptions.bind(field));
    }
}


document.addEventListener('DOMContentLoaded', init);
