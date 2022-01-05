const HotkeysReceiver = (function () {

    class HotkeysReceiver {

        static handleMessage (message) {

            if (message.command === "hotkey-pressed") {
                for (const view of views) {
                    if (message.name === `display-${view.id}`) {
                        view.header_button.click()
                    }
                }
            }
        }

        static init () {

            browser.runtime.onMessage.addListener(HotkeysReceiver.handleMessage)
        }
    }

    return HotkeysReceiver
})();
