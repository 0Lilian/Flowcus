class StyleManager {

    static generateColors () {
        // Apply CSS variables option
        Settings.get("primary-color", function (value) {
            const color = tinycolor(value)
            document.documentElement.style.setProperty('--color-primary-very--very-light', tinycolor(value).lighten(45).toString());
            document.documentElement.style.setProperty('--color-primary-very-light', tinycolor(value).lighten(30).toString());
            document.documentElement.style.setProperty('--color-primary-light', tinycolor(value).lighten(15).toString());
            document.documentElement.style.setProperty('--color-primary', value);
            document.documentElement.style.setProperty('--color-primary-dark', tinycolor(value).darken(15).toString());
            document.documentElement.style.setProperty('--color-primary-very-dark', tinycolor(value).darken(30).toString());
            document.documentElement.style.setProperty('--color-primary-very-very-dark', tinycolor(value).darken(45).toString());
        })

        Settings.get("secondary-color", function (value) {
            const color = tinycolor(value)
            document.documentElement.style.setProperty('--color-secondary-very-very-light', tinycolor(value).lighten(45).toString());
            document.documentElement.style.setProperty('--color-secondary-very-light', tinycolor(value).lighten(30).toString());
            document.documentElement.style.setProperty('--color-secondary-light', tinycolor(value).lighten(15).toString());
            document.documentElement.style.setProperty('--color-secondary', value);
            document.documentElement.style.setProperty('--color-secondary-dark', tinycolor(value).darken(15).toString());
            document.documentElement.style.setProperty('--color-secondary-very-dark', tinycolor(value).darken(30).toString());
            document.documentElement.style.setProperty('--color-secondary-very-very-dark', tinycolor(value).darken(45).toString());
        })
    }

    static loadFonts () {
        function onSuccess (loaded_face) {
            document.fonts.add(loaded_face);
        }

        function onError (error) {
            console.log("An error occured while trying to load fonts")
            console.log(error)
        }

        const lilita_font = new FontFace('Lilita One', `url(${browser.runtime.getURL("/0_common/staticfiles/fonts/lilita-one.regular.ttf")})`, { style: 'normal', weight: 400 });
        lilita_font.load().then(onSuccess).catch(onError);
    }

    static init () {

        // Generate the colors from the primary and secondary colors defined by the user
        this.generateColors()

        // Load Flowcus custom fonts
        this.loadFonts()
    }
}
