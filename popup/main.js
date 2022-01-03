
/* Variables */
const vault = "";
const folder = "";
const tags = "#clippings";
const clutter_free_button = document.querySelector("#clutter-free")

/* Functions */
function remove_clutter(tabs) {
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

function onGot (tabInfo) {
    console.log(tabInfo)
    browser.tabs.sendMessage(tabInfo.id, {
        command: "tabInfo",
        infos: tabInfo
    });
    // if (tabInfo) {
    //     if (tabInfo.status === "loading") {
    //         console.log("LOADING")
    //         const tab_interval = window.setInterval(function () {
    //             console.log("INTERVAL")
    //             if (tabInfo.status === "complete") {
    //                 console.log("SUCCESS")
    //                 browser.tabs.executeScript({file: "/frontend/main.js"})
    //                 .then(listen_for_clicks)
    //                 window.clearInterval(tab_interval)
    //             }
    //         }, 500)
    //     }
    //     else if (tabInfo.status === "complete") {
    //         console.log("COMPLETE")
            browser.tabs.executeScript({file: "/frontend/main.js"})
            .then(listen_for_clicks)
    //     }
    // }

}


function onError(error) {
  console.log(`Error: ${error}`);
}

var gettingCurrent = browser.tabs.getCurrent();
gettingCurrent.then(onGot, onError);

// listen_for_clicks()
