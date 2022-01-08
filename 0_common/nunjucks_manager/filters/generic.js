// 'generic' filter
(function () {
    function generic (variable, filter_param_1, filter_param_1, ...) {
        return "Formatted with the generic filter !"
    }

    new NunjucksFilter("generic", generic)
})();
