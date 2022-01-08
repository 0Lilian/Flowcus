class NunjucksManager {
    static env;

    static init () {
        if (!this.env) {
            this.env = new nunjucks.Environment();

            // Initilize custom filters.
            for (const filter of NunjucksFilter.filters) {
                this.env.addFilter(filter.name, filter.func)
            }
        }
        return this.env
    }
}
