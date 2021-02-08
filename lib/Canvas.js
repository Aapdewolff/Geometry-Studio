class Canvas {
    static #element;

    static Init() {
        Canvas.#element = document.getElementById("gameCanvas");
        
        Canvas.Resize();
    }

    static Resize() {
        Canvas.#element.width = window.innerWidth;
        Canvas.#element.height = window.innerHeight;
    }

    static get element() { return Canvas.#element; }
    static set element(value) { console.error("Can't modify property element of Canvas!"); }
}