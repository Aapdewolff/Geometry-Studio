class Command {
    #func_;
    #args_;

    constructor(func) {
        if(!Type.isFunction(func)) {
            console.error("Command constructor func must be a function!");
            return null;
        }

        this.#func_ = func;
        this.#args_ = Array.from(arguments);
        this.#args_.shift();
    }

    execute() {
        this.#func_.apply(null, this.#args_);
    }
}