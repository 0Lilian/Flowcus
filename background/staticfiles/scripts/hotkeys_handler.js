const initHotkeysHandler = (function () {

    function sendMessageToFrontend(tab, command) {
        browser.tabs.sendMessage(tab.id, {
            command: "hotkey-pressed",
            name: command
        });
    };

    function initHotkeysHandler () {

        browser.commands.onCommand.addListener(function(command) {

            browser.tabs.query({active: true, currentWindow: true}).then(function (tabs) {
                sendMessageToFrontend(tabs[0], command)
            })
        });
    }

    return initHotkeysHandler
})();
