class Canvas {
    static #element_;
    static #gl_;
    static #position_;

    static #initialized_ = false;

    /**
     * Initializes the canvas
     */
    static init() {
        if(Canvas.#initialized_)
            return;

        Canvas.#initialized_ = true;

        Canvas.#element_ = document.getElementById("gameCanvas");
        Canvas.#element_.focus();
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
     * The canvas DOM element
     */
    static get element() { return Canvas.#element_; }
    static set element(value) { console.error("Canvas.element is readonly!"); }

    /**
     * WebGL access point
     */
    static get gl() { return Canvas.#gl_; }
    static set gl(value) { console.error("Canvas.gl is readonly!"); }

    static get position() { return Canvas.#position_; }
    static set position(value) { console.error("Canvas.position is readonly!"); }

    /**
     * Resizes the canvas element
     */
    static resize() {
        Canvas.#element_.style.width = window.innerWidth + "px";
        Canvas.#element_.style.height = window.innerHeight + "px";

        const renderWidth = window.innerWidth * Application.renderScale;
        const renderHeight = window.innerHeight * Application.renderScale;

        Canvas.#element_.width = renderWidth;
        Canvas.#element_.height = renderHeight;

        Canvas.#gl_.viewport(0, 0, renderWidth, renderHeight);

        Canvas.#position_ = new Vector2(Canvas.#element_.offsetLeft, Canvas.#element_.offsetTop);

        const cameras = Scene.findComponents(Camera);
        for(var i = 0; i < cameras.length; i++) {
            cameras[i].recalculate();
        }
    }

    /**
     * Clears the canvas context
     */
    static clear() {
        Canvas.#gl_.clear(Canvas.#gl_.COLOR_BUFFER_BIT | Canvas.#gl_.DEPTH_BUFFER_BIT);
    }
}