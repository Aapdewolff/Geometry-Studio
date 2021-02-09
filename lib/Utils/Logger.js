class Logger {
    static #initialized_ = false;

    static init() {
        if(Logger.#initialized_)
            return;

        Logger.#initialized_ = true;

        if(Application.debugBuild) {
            console.defaultDebug = console.debug.bind(console);
            console.stdlog = console.log.bind(console);
            console.defaultWarn = console.warn.bind(console);
            console.defaultError = console.error.bind(console);

            console.debugs = [];
            console.logs = [];
            console.warns = [];
            console.errors = [];
            
            console.debug = function () {
                var array = Array.from(arguments);
                for (var i = 0; i < array.length; i++) {
                    //alert(String(array[i]) + " (" + Logger.#getCaller());
                }

                console.debugs.push(array);
                console.defaultDebug.apply(console, arguments);
            }

            console.log = function () {
                var array = Array.from(arguments);
                for (var i = 0; i < array.length; i++) {
                    //alert(String(array[i]) + " (" + Logger.#getCaller());
                }

                console.logs.push(array);
                console.stdlog.apply(console, arguments);
            }

            console.warn = function () {
                var array = Array.from(arguments);
                for (var i = 0; i < array.length; i++) {
                    //alert(String(array[i]) + " (" + Logger.#getCaller());
                }

                console.warns.push(array);
                console.defaultWarn.apply(console, arguments);
            }

            console.error = function () {
                var array = Array.from(arguments);
                for (var i = 0; i < array.length; i++) {
                    //alert(String(array[i]) + " (" + Logger.#getCaller());
                }

                console.errors.push(array);
                console.defaultError.apply(console, arguments);
            }
        }
    }

    static #getCaller() {
        const folders = (() => {
            try {
                throw Error('')
            } catch (err) {
                return err;
            }
        })().stack.split("\n")[4].split("/");
        
        return folders[folders.length - 1];
    }
}