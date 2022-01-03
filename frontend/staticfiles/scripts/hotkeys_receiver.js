const initHotkeysReceiver = (function () {

    function handleMessage (message) {
        console.log("MESSSAGE")
        console.log(message)

        if (message.command === "hotkey-pressed") {
            console.log("COMMAND OK")
            for (const view of views) {
                console.log("TEST")
                console.log(message.name)
                console.log(`display-${view.id}`)
                if (message.name === `display-${view.id}`) {
                    console.log("VIEW MATCH")
                    view.header_button.click()
                }
            }
        }
    }

    function initHotkeysReceiver () {

        browser.runtime.onMessage.addListener(handleMessage)
    }

    return initHotkeysReceiver
})();
