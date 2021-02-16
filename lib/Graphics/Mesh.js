class Mesh {
    #vertices_;
    #indices_;
    #uvs_;
    #normals_;

    #vertexArray_;
    #uvArray_;
    #normalArray_;

    constructor(vertices = [], indices = [], uvs = [], normals = []) {
        this.#vertexArray_ = [];
        this.#uvArray_ = [];
        this.#normalArray_ = [];

        this.vertices = vertices;
        this.indices = indices;
        this.uvs = uvs;
        this.normals = normals;
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

        if(value.length > 65535) {
            console.error("Mesh vertices.length must be 65535 or lower!");
            return null;
        }

        this.#vertices_ = value;

        this.#vertexArray_.length = 0;
        for(var i = 0; i < this.#vertices_.length; i++) {
            this.#vertexArray_.push(this.#vertices_[i].x, this.#vertices_[i].y, this.#vertices_[i].z);
        }
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

        this.#uvArray_.length = 0;
        for(var i = 0; i < this.#uvs_.length; i++) {
            this.#uvArray_.push(this.#uvs_[i].x, this.#uvs_[i].y);
        }
    }

    get normals() {
        var normals = [];
        for(var i = 0; i < this.#normals_.length; i++) {
            normals.push(new Vector3().set(this.#normals_[i]));
        }

        return normals;
    }
    set normals(value) {
        if(!Array.isArray(value)) {
            console.error("Mesh normals must be an array!");
            return;
        }

        this.#normals_ = value;

        this.#normalArray_.length = 0;
        for(var i = 0; i < this.#normals_.length; i++) {
            this.#normalArray_.push(this.#normals_[i].x, this.#normals_[i].y, this.#normals_[i].z);
        }
    }

    get uvArray() { return this.#uvArray_; }
    set uvArray(value) { console.error("Mesh uvArray is readonly!"); }

    get vertexArray() { return this.#vertexArray_; }
    set vertexArray(value) { console.error("Mesh vertexArray is readonly!"); }

    get normalArray() { return this.#normalArray_; }
    set normalArray(value) { console.error("Mesh normalArray is readonly!"); }
}