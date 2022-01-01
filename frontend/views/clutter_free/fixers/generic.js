const generic_fixer = (function () {

    class GenericFixer extends ClutterFreeFixer {

        fix (body) {

            // Transform the body here.
            // ...

            // Return the body.
            return body
        }
    }

    return new GenericFixer()
})();
clutter_free_fixers.push(generic_fixer)
