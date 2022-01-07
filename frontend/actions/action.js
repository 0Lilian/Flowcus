class Action extends Component {

    constructor (display_name,
                 slug,
                 icon,
                 hotkey,
                 dependencies = []) {

        super(display_name,
              slug,
              icon,
              hotkey,
              dependencies);
    }

    init () {

        return new Promise((resolve, reject) => {
            this.waitForDependencies()
            .then(() => {
                this.is_ready = true
                window.dispatchEvent(this.ready_event)
            })
            .then(() => this.displayed ? this.generateButton() : null)
            .then(() => resolve())
            .catch(error => {
                error ? console.log("An error occured while trying to initialize this component " + this.id + ". Error : " + error) : null
                reject(error)
            })
        })
    }

    execute () {
        return new Promise((resolve, reject) => {

            try {

                console.log("The action " + this.id + " is using the default execute() method. Please override it.")

                // Resolve the promise.
                resolve()
            }
            catch (error) {
                reject("An error occured while executing action " + this.id + ". Error : " + error)
            }
        })
    }

    displaySuccessfullMessage () {
        console.log("SUCCESSFUL MESSAGE FROM " + this.id)
    }

    displayErrorMessage () {
        console.log("ERROR MESSAGE FROM " + this.id)
    }

    _trigger () {

        // On trigger --> execute the action
        this.execute()
        .then(() => this.displaySuccessfullMessage())
        .catch(() => this.displayErrorMessage())
    }
}
