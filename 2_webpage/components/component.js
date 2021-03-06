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

        // Create the datas properties that will host various component' datas (if there are)
        this.datas = {}

        // At this component to the components list of its class.
        this.constructor.components[this.id] = this
    }

    static components = {}

    static getAll (ids_only=false) {

        // If this is the Component class, return all the components
        if (this.name === "Component") {
            if (ids_only === false) {
                return Object.values(this.components).reverse()
            }
            else {
                return Object.keys(this.components).reverse()
            }
        }

        // Else return only the components that have the right class name
        else {
            const components = []
            for (const component_id of Object.keys(this.components)) {
                if (component_id.startsWith(this.name + ".")) {
                    if (ids_only === false) {
                        components.push(this.components[component_id])
                    }
                    else {
                        components.push(component_id)
                    }
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
        return new Promise((resolve, reject) => {
            try {
                browser.runtime.onMessage.addListener(this.handleHotkeysMessages.bind(this))
                resolve()
            }
            catch (error) {
                reject("An error occured while running Component.listenForHotkeys(). Error : " + error)
            }
        })
    }

    static getRequiredComponents() {
        let required_components = [];

        // Construct the the required components list
        for (const component of this.getAll()) {
            if (component.enabled === true) {
                required_components.push(component)
            }
            else {
                // Set the component with displayed=false to prevent the button to be injected in the header (in case it is enabled in
                // the next step because it is a dependency)
                component.displayed = false;
            }
        }

        // Also append the required components' dependencies and every sub dependency to required components list
        let continue_loop = true;
        while (continue_loop === true) {
            const length_before_loop = required_components.length

            for (const component of required_components) {
                for (const dependency of component.dependencies) {
                    const dependency_component = Component.getById(dependency)

                    // Check if the component is not already in the required_components list.
                    if (required_components.includes(dependency_component) === false) {
                        required_components.push(dependency_component)
                    }
                }
            }

            // Stop the loop if the length is unchanged (it means that there is no more dependencies that can be discovered)
            if (length_before_loop === required_components.length) {
                continue_loop = false;
            }
        }

        return required_components
    }

    static init () {

        // 1) Get the required components list, these components will have to be initialized.
        const required_components = this.getRequiredComponents()

        // 2) Build the promises list
        let promises = [];

        for (const component of required_components) {
            promises.push(component.init())
        }

        // 3) Initialize all the required components
        return Promise.all(promises)

        // 4) Listen for components hotkeys.
        .then(() => Date.now())
        .then((start) => Component.listenForHotkeys().then(() => start))
        .then((start) => console.log(`initFlowcus() -> Component.listenForHotkeys() time = ${Date.now() - start}ms`))
    }

    init () {
        return new Promise((resolve, reject) => {
            this.waitForDependencies()
            .then(() => this.displayed ? this.generateButton() : null)
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
