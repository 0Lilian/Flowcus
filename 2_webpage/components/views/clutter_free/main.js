function init () {
    hljs.highlightAll();
}

function main () {
    if (document.readyState === "complete") {
        init()
    }
    else {
        window.addEventListener("load", init)
    }
}

main()
