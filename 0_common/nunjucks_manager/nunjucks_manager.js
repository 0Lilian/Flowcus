class NunjucksManager {
    static env;

    static init () {
        if (!this.env) {
            nunjucks.configure("")
            this.env = new nunjucks.Environment(new nunjucks.WebLoader(" "))

            // Initilize custom filters.
            for (const filter of NunjucksFilter.filters) {
                this.env.addFilter(filter.name, filter.func)
            }
        }
        return this.env
    }
}
