const HotkeysReceiver = (function () {

    class HotkeysReceiver {

        static handleMessage (message) {

            if (message.command === "hotkey-pressed") {
                for (const view of View.getAll()) {
                    if (message.name === `display-${view.id}`) {
                        view.trigger()
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
