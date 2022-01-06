const HotkeysReceiver = (function () {

    class HotkeysReceiver {

        static handleMessage (message) {

            if (message.command === "hotkey-pressed") {
                console.log(Component.getAll())
                for (const component of Component.getAll()) {
                    if (message.name === `trigger-${component.id}`) {
                        component.trigger()
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
