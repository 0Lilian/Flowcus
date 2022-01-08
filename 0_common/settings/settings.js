class Settings {

    static get (key, value_handler, error_handler = null) {

        function onError (error) {
            console.log(`Error: ${error}`);
        }

        // Set the default error handler if no one is provided
        error_handler = error_handler ? error_handler : onError

        // Send the request to the brower storage
        return browser.storage.sync.get(key).then(function (results) {
            value_handler(results[key])
        }, error_handler)

    }

    static set (key, value) {

        // Create the datas dict.
        const datas = {}
        datas[key] = value

        // Send the request to the brower storage
        browser.storage.sync.set(datas);
    }

    static setMultiple (datas) {

        // Send the request to the brower storage
        browser.storage.sync.set(datas);
    }
}
