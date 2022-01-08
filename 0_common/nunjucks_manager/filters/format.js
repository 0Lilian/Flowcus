// 'dateformat' filter
(function () {
    function dateFormat (str_date, str_format) {
        return luxon.DateTime.fromISO(str_date).toFormat(str_format)
    }

    new NunjucksFilter("format", dateFormat)
})();
