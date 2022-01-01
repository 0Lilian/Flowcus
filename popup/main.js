
/* Variables */
const vault = "";
const folder = "";
const tags = "#clippings";
const clutter_free_button = document.querySelector("#clutter-free")

/* Functions */
function remove_clutter(tabs) {
    console.log("remove cluuteeeer !")
    browser.tabs.sendMessage(tabs[0].id, {
        command: "remove_clutter"
    });
};

/* Listeners */
function listen_for_clicks () {
    clutter_free_button.addEventListener("click", function () {
        // function getSelectionHtml() {
        //     var html = "";
        //     if (typeof window.getSelection != "undefined") {
        //         var sel = window.getSelection();
        //         if (sel.rangeCount) {
        //             var container = document.createElement("div");
        //             for (var i = 0, len = sel.rangeCount; i < len; ++i) {
        //                 container.appendChild(sel.getRangeAt(i).cloneContents());
        //             }
        //             html = container.innerHTML;
        //         }
        //     } else if (typeof document.selection != "undefined") {
        //         if (document.selection.type == "Text") {
        //             html = document.selection.createRange().htmlText;
        //         }
        //     }
        //     return html;
        // }
        //
        // const selection = getSelectionHtml();

        browser.tabs.query({active: true, currentWindow: true}).then(remove_clutter)

        // function getFileName(fileName) {
        //     var userAgent = window.navigator.userAgent,
        //     platform = window.navigator.platform,
        //     windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
        //
        //     if (windowsPlatforms.indexOf(platform) !== -1) {
        //         fileName = fileName.replace(':', '').replace(/[/\\?%*|"<>]/g, '-');
        //     }
        //     else {
        //         fileName = fileName.replace(':', '').replace(/\//g, '-').replace(/\\/g, '-');
        //     }
        //     return fileName;
        // }
        // const fileName = getFileName(title);
        //
        // if (selection) {
        //     var markdownify = selection;
        // } else {
        //     var markdownify = content;
        // }
        //
        // if (vault) {
        //     var vaultName = '&vault=' + encodeURIComponent(`${vault}`);
        // } else {
        //     var vaultName = '';
        // }
        //
        // const markdownBody = new Turndown({
        //     headingStyle: 'atx',
        //     hr: '---',
        //     bulletListMarker: '-',
        //     codeBlockStyle: 'fenced',
        //     emDelimiter: '*',
        // }).turndown(markdownify);
        //
        // var date = new Date();
        //
        // function convertDate(date) {
        //     var yyyy = date.getFullYear().toString();
        //     var mm = (date.getMonth()+1).toString();
        //     var dd  = date.getDate().toString();
        //     var mmChars = mm.split('');
        //     var ddChars = dd.split('');
        //     return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
        // }
        //
        // const today = convertDate(date);
        //
        // const fileContent =
        // "author:: " + byline + "\n"
        // + "source:: [" + title + "](" + document.URL + ")\n"
        // + "clipped:: [[" + today + "]]\n"
        // + "published:: \n\n"
        // + tags + "\n\n"
        // + markdownBody ;
        //
        // document.location.href = "obsidian://new?"
        // + "file=" + encodeURIComponent(folder + fileName)
        // + "&content=" + encodeURIComponent(fileContent)
        // + vaultName ;
    })
}

/* Content scripts */

// function registerCode(code) {
//     console.log(code);
//     browser.tabs.executeScript({code: code});
//     // browser.userScripts.register({js: [{code: code, }]});
// }
// var req = new XMLHttpRequest();
//
// req.open('GET', 'https://unpkg.com/turndown/dist/turndown.js', false);
// req.send(null);
//
// if(req.status == 200) {
//     registerCode(req.responseText);
// }

// browser.tabs.executeScript({file: "/content_scripts/turndown.js"})
// .then(browser.tabs.executeScript({file: "/content_scripts/mercury.min.js"})
// .then(browser.tabs.executeScript({file: "/content_scripts/remove_clutter.js"})
// .then(console.log("OK"))))


// browser.tabs.executeScript({file: "/frontend/main.js"})
// .then(listen_for_clicks)
listen_for_clicks()
