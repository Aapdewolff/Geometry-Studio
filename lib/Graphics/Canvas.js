class Canvas {
    static #element_;

    /**
     * Initializes the canvas
     */
    static init() {
        Canvas.#element_ = document.getElementById("gameCanvas");
        
        Canvas.resize();
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
    static set element(value) { console.error("Can't modify property element of Canvas!"); }
}