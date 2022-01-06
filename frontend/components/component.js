class Component {

    constructor (display_name,
                 slug, // The display name with ' ' replaced by '-' and no special caracters
                 icon,
                 hotkey,
                 dependencies = []) {
        this.display_name = display_name;
        this.slug = slug;
        this.icon = icon;
        this.hotkey = hotkey;
        this.dependencies = dependencies;

        // Build the component id
        this.id = `${this.constructor.name}.${this.slug}`

        this.button;
        this.is_ready = false;
        this.ready_event = new CustomEvent(`${this.id}-ready`)

        // Check if the component is enabled or not
        Settings.get(this.id + "-enabled", function (value) {
            this.displayed = value // Used for header display
            this.enabled = value // Used for dependencies mechanism
        }.bind(this))

        // At this component to the components list of its class.
        this.constructor.components[this.id] = this
    }

    static components = {}

    static getAll () {
        // If this is the Component class, return all the components
        if (this.name === "Component") {
            return Object.values(this.components)
        }

        // Else return only the components that have the right class name
        else {
            const components = []
            for (const component_id of Object.keys(this.components)) {
                if (component_id.startsWith(this.name + ".")) {
                    components.push(this.components[component_id])
                }
            }
            return components;
        }
    }

    static getById (id) {
        return this.components[id]
    }

    static handleHotkeysMessages (message) {
        if (message.command === "hotkey-pressed") {
            for (const component of this.getAll()) {
                if (message.name === `trigger-${component.id}`) {
                    component.trigger()
                }
            }
        }
    }

    static listenForHotkeys () {
        browser.runtime.onMessage.addListener(this.handleHotkeysMessages.bind(this))
    }

    static init () {
        const promises = []

        // Construct the promises list with the enabled components
        let enabled_components = [];
        for (const component of this.getAll()) {
            if (component.enabled === true) {
                promises.push(component.init())
                enabled_components.push(component)
            }
            else {
                // Set the component with displayed=false to prevent the button to be injected in the header.
                component.displayed = false;
            }
        }

        // Also append the enabled components' dependencies and every sub dependency to promises list
        let continue_loop = true;
        while (continue_loop === true) {
            const length_before_loop = enabled_components.length

            for (const component of enabled_components) {
                for (const dependency of component.dependencies) {
                    const dependency_component = Component.getById(dependency)

                    // Check if the component is not already in the enabled_components list.
                    if (enabled_components.includes(dependency_component) === false) {

                        enabled_components.push(dependency_component)

                        // Push the component to the promises list
                        promises.push(dependency_component.init())
                    }
                }
            }

            // Stop the loop if the length is unchanged (it means that no more dependencies can be discovered)
            if (length_before_loop === enabled_components.length) {
                continue_loop = false;
            }
        }

        return Promise.all(promises)
    }

    init () {
        return new Promise((resolve, reject) => {
            this.waitForDependencies()
            .then(() => this.generateButton())
            // Dispatch the ready event.
            .then(() => {
                this.is_ready = true
                window.dispatchEvent(this.ready_event)
            })
            .then(() => resolve())
            .catch(error => {
                error ? console.log("An error occured while trying to initialize this component " + this.id + ". Error : " + error) : null
                reject(error)
            })
        })
    }

    waitForComponentReady () {
        return new Promise((resolve, reject) => {
            try {
                if (this.is_ready === true) {
                    resolve()
                }
                else {
                    window.addEventListener(`${this.id}-ready`, function () {
                        resolve()
                    }.bind(this))
                }
            }
            catch (error) {
                reject("An error occured while waiting this component to be ready " + this.id + ". Error : " + error)
            }
        })
    }

    waitForDependencies () {

        const promises = []

        for (const dependency of this.dependencies) {
            const dependency_component = Component.getById(dependency)

            if (dependency_component) {
                promises.push(dependency_component.waitForComponentReady())
            }
        }

        return Promise.all(promises)
    }

    generateButton () {
        return new Promise((resolve, reject) => {

            try {
                // Create the component button and add the click event.
                this.button = document.createElement("button")
                this.button.innerHTML = `<div class="infos"><span class="icon">${this.icon}</span><span class="name">${this.display_name}</span></div>`
                Settings.get(`display-${this.constructor.name}-hotkeys`, function (value) {
                    if (value === true) {
                        this.button.innerHTML += `<div class="hotkey">${this.hotkey}</div>`
                    }
                }.bind(this))

                // Add the button id.
                this.button.id = this.id + "-button"

                this.button.addEventListener("click", function () {
                    this.trigger()
                }.bind(this))

                // Resolve the promise.
                resolve()
            }
            catch (error) {
                reject("An error occured while generating iframe of component " + this.id + ". Error : " + error)
            }
        })
    }

    _trigger () {
        console.log(`The ${this.id} is currently using the default _trigger() method, please override it.`)
    }

    trigger () {
        return new Promise((resolve, reject) => {
            try {

                if (this.is_ready === true) {
                    this._trigger()
                    resolve()
                }
                else {
                    this.waitForComponentReady()
                    .then(() => this._trigger())
                    .then(() => resolve())
                }
            }
            catch (error) {
                reject("An error occured while trying to trigger the component " + this.id + ". Error : " + error)
            }
        })
    }
}
