class Canvas {
    static #element_;
    static #gl_;

    /**
     * Initializes the canvas
     */
    static init() {
        Canvas.#element_ = document.getElementById("gameCanvas");
        Canvas.#gl_ = Canvas.#element_.getContext("webgl");
        if (!Canvas.#gl_) {
            Canvas.#gl_ = Canvas.#element_.getContext("experimental-webgl");
            if (!Canvas.#gl_)
                console.error("Hardware does not support WebGL!");
        }
        
        Canvas.resize();
        window.onresize = Canvas.resize;
    }

    /**
     * Resizes the canvas element
     */
    static resize() {
        Canvas.#element_.width = window.innerWidth;
        Canvas.#element_.height = window.innerHeight;
    }

    /**
     * The canvas DOM element
     */
    static get element() { return Canvas.#element_; }
    static set element(value) { console.error("Canvas.element is readonly!"); }

    /**
     * WebGL access point
     */
    static get gl() { return Canvas.#gl_; }
    static set gl(value) { console.error("Canvavs.gl is readonly!"); }
}