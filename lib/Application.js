class Application {
    static #debugBuild_;
    static #onMobileDevice_;
    static #renderScale_;

    static #initialized_ = false;
    
    static #scripts_ = [];

    static init(debug = false) {
        if(!Type.isBool(debug)) {
            console.error("Application.init debug must be a boolean!");
            return;
        }

        if(Application.#initialized_)
            return;
        Application.#initialized_ = true;

        Application.#debugBuild_ = debug;
        Application.#onMobileDevice_ =  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        Application.#renderScale_ = 1;

        Logger.init();
        Scene.init();
        Canvas.init();
        Input.init();
        Renderer.init();
    }

    static get debugBuild() { return Application.#debugBuild_; }
    static set debugBuild(value) { console.error("Application.debugBuild is readonly!"); }

    static get width() { return window.innerWidth * Application.#renderScale_; }
    static set width(value) { console.error("Application.width is readonly!"); }

    static get height() { return window.innerHeight * Application.#renderScale_; }
    static set height(value) { console.error("Application.height is readonly!"); }

    static get onMobileDevice() { return Application.#onMobileDevice_; }
    static set onMobileDevice(value) { console.error("Application.onMobileDevice is readonly!"); }

    static get renderScale() { return Application.#renderScale_; }
    static set renderScale(value) {
        if(!Type.isNumber(value)) {
            console.error("Application.renderScale must be a number!")
            return;
        }

        Application.#renderScale_ = value;

        Canvas.resize();
    }

    static get scripts() { return Application.#scripts_; }
    static set scripts(value) { console.error("Application.scripts is readonly!"); }

    static registerScript(script) {
        if(!Type.isFunction(script)) {
            console.error("Application.registerScript script must be a function!");
            return;
        }

        Application.#scripts_.push(script.name);
    }
}