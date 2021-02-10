class Application {
    static #debugBuild_;
    static #onMobileDevice_;

    static #initialized_ = false;

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

        Logger.init();
        Canvas.init();
        Renderer.init();
    }

    static get debugBuild() { return Application.#debugBuild_; }
    static set debugBuild(value) { console.error("Application.debugBuild is readonly!"); }

    static get width() { return window.innerWidth; }
    static set width(value) { console.error("Application.width is readonly!"); }

    static get height() { return window.innerHeight; }
    static set height(value) { console.error("Application.height is readonly!"); }

    static get onMobileDevice() { return Application.#onMobileDevice_; }
    static set onMobileDevice(value) { console.error("Application.onMobileDevice is readonly!"); }
}