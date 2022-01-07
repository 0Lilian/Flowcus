const initHotkeysTransmitter = (function () {

    function sendMessageToWebpage(tab, command) {
        browser.tabs.sendMessage(tab.id, {
            command: "hotkey-pressed",
            name: command
        });
    };

    function initHotkeysTransmitter () {

        browser.commands.onCommand.addListener(function(command) {

            browser.tabs.query({active: true, currentWindow: true}).then(function (tabs) {
                sendMessageToWebpage(tabs[0], command)
            })
        });
    }

    return initHotkeysTransmitter
})();
