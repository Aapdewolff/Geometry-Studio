class Mesh {
    #vertices_;

    constructor(vertices = []) {
        if(!Array.isArray(vertices)) {
            console.error("Mesh constructor vertices must be an array!");
            return null;
        }

        this.#vertices_ = vertices;
    }

    get vertices() { return this.#vertices_; }
    set vertices(value) {
        if(!Array.isArray(value)) {
            console.error("Mesh vertices must be an array!");
            return;
        }

        this.#vertices_ = value;
    }
}