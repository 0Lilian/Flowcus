const initHotkeysReceiver = (function () {

    function handleMessage (message) {

        if (message.command === "hotkey-pressed") {
            for (const view of views) {
                if (message.name === `display-${view.id}`) {
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
