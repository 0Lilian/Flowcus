(function () {

    // Create the Action instance
    const generic_action =  new Action(display_name="Generic",
                                    slug="generic",
                                    icon="",
                                    hotkey="",
                                    dependencies = [])

    // Create the custom execute() method
    function execute () {

            return new Promise((resolve, reject) => {

                try {

                    // Do some actions here
                    // ...

                    // Resolve the promise.
                    resolve()
                }
                catch (error) {
                    reject("An error occured while executing action " + this.id + ". Error : " + error)
                }
            })
        }

    // Override the default execute() method with the custom one
    generic_action.execute = execute

})();
