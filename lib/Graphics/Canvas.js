class Canvas {
    static #element_;
    static #gl_;

    static #initialized_ = false;

    /**
     * Initializes the canvas
     */
    static init() {
        if(Canvas.#initialized_)
            return;

        Canvas.#initialized_ = true;

        Canvas.#element_ = document.getElementById("gameCanvas");
        Canvas.#gl_ = Canvas.#element_.getContext("webgl");
        if (!Canvas.#gl_) {
            Canvas.#gl_ = Canvas.#element_.getContext("experimental-webgl");
            if (!Canvas.#gl_)
                console.error("Hardware does not support WebGL!");
        }

        Canvas.#gl_.clearColor(0.0, 0.0, 0.0, 1.0);
        Canvas.#gl_.clearDepth(1.0);
        Canvas.#gl_.enable(Canvas.#gl_.DEPTH_TEST);
        Canvas.#gl_.depthFunc(Canvas.#gl_.LEQUAL);
        
        Canvas.resize();
        window.onresize = Canvas.resize;
    }

    /**
     * Resizes the canvas element
     */
    static resize() {
        Canvas.#element_.width = window.innerWidth;
        Canvas.#element_.height = window.innerHeight;

        Canvas.#gl_.viewport(0, 0, window.innerWidth, window.innerHeight);

        console.log("Resize!");
    }

    /**
     * Clears the canvas context
     */
    static clear() {
        Canvas.#gl_.clear(Canvas.#gl_.COLOR_BUFFER_BIT | Canvas.#gl_.DEPTH_BUFFER_BIT);
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