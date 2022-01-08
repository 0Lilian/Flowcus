class NunjucksFilter {

    constructor (name, func) {
        this.name = name
        this.func = func
        NunjucksFilter.filters.push(this)
    }

    static filters = []
}
