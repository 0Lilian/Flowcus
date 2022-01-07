const loadFonts = (function () {

    function onSuccess (loaded_face) {
        document.fonts.add(loaded_face);
    }

    function onError (error) {
        console.log("An error occured while trying to load fonts")
        console.log(error)
    }

    function loadFonts () {
        const lilita_font = new FontFace('Lilita One', `url(${browser.runtime.getURL("/0_common/staticfiles/fonts/lilita-one.regular.ttf")})`, { style: 'normal', weight: 400 });
        lilita_font.load().then(onSuccess).catch(onError);
    }

    return loadFonts
})();
