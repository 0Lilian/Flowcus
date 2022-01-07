const generic_clutter_free_fixer = (function () {

    class GenericClutterFreeFixer extends ClutterFreeFixer {

        fix (body) {

            // Transform the body here.
            // ...

            // Return the body.
            return body
        }
    }

    return new GenericClutterFreeFixer()
})();
clutter_free_fixers.push(generic_clutter_free_fixer)
