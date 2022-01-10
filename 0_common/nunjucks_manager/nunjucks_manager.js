class NunjucksManager {
    static env;

    static renderFromUrl (url, context) {
        return new Promise((resolve, reject) => {

            fetch(url)
            .then((response) => {
                response.text().then((template_content) => {
                    resolve(this.renderString(template_content, context))
                })
            })
        })
    }

    static init () {
        if (!this.env) {
            this.env = new nunjucks.Environment()

            // Initilize custom filters.
            for (const filter of NunjucksFilter.filters) {
                this.env.addFilter(filter.name, filter.func)
            }

            // Add the custom renderFromUrl function
            this.env.renderFromUrl = this.renderFromUrl.bind(this.env)
        }
        return this.env
    }
}
