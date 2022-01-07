class Generic extends Component {

    constructor (display_name,
                 slug,
                 icon,
                 hotkey,
                 dependencies = [],
                 a_custom_property = false) {

        super(display_name,
              slug,
              icon,
              hotkey,
              dependencies);

        this.a_custom_property = a_custom_property;
    }

    init () {

        return new Promise((resolve, reject) => {
            this.waitForDependencies()
            .then(() => this.displayed ? this.generateButton() : null)
            // Add your others generation promises here
            // Example : .then(() => this.myCustomGenerationMethod())
            // ...
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

    _trigger () {

        // Do some stuff here when the component is triggered.
        // ...

    }
}
