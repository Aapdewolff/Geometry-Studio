class Mesh {
    #vertices_;
    #indices_;
    #uvs_;

    constructor(vertices = [], indices = [], uvs = []) {
        if(!Array.isArray(vertices)) {
            console.error("Mesh constructor vertices must be an array!");
            return null;
        }

        if(vertices.length > 65535) {
            console.error("Mesh constructor vertices.length must be 65535 or lower!");
            return null;
        }

        if(!Array.isArray(indices)) {
            console.error("Mesh constructor indices must be an array!");
            return null;
        }

        if(!Array.isArray(uvs)) {
            console.error("Mesh constructor uvs must be an array!");
            return null;
        }

        this.#vertices_ = vertices;
        this.#indices_ = indices;
        this.#uvs_ = uvs;
    }

    get vertices() {
        var vertices = [];
        for(var i = 0; i < this.#vertices_.length; i++) {
            vertices.push(new Vector3().set(this.#vertices_[i]));
        }

        return vertices;
    }
    set vertices(value) {
        if(!Array.isArray(value)) {
            console.error("Mesh vertices must be an array!");
            return;
        }

        if(vertices.length > 65535) {
            console.error("Mesh vertices.length must be 65535 or lower!");
            return null;
        }

        this.#vertices_ = value;
    }

    get indices() { return this.#indices_.slice(); }
    set indices(value) {
        if(!Array.isArray(value)) {
            console.error("Mesh indices must be an array!");
            return;
        }

        this.#indices_ = value;
    }

    get uvs() {
        var uvs = [];
        for(var i = 0; i < this.#uvs_.length; i++) {
            uvs.push(new Vector2().set(this.#uvs_[i]));
        }

        return uvs;
    }
    set uvs(value) {
        if(!Array.isArray(value)) {
            console.error("Mesh uvs must be an array!");
            return;
        }

        this.#uvs_ = value;
    }

    get uvArray() {
        var uvs = [];
        for(var i = 0; i < this.#uvs_.length; i++) {
            uvs.push(this.#uvs_[i].x, this.#uvs_[i].y);
        }

        return uvs;
    }
    set uvArray(value) { console.error("Mesh uvArray is readonly!"); }
}