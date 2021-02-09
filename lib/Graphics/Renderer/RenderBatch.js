class RenderBatch {
    #material_;

    #vertices_;

    constructor(material) {
        if(!Type.isInstance(material, Material)) {
            console.error("RenderBatch constructor material must be a Material!");
            return;
        }

        this.#material_ = material;
        this.#vertices_ = [];
    }

    get material() { return this.#material_; }
    set material(value) { console.error("RenderBatch material is readonly!"); }

    get vertices() { return this.#vertices_; }
    set vertices(value) { console.error("RenderBatch vertices is readonly!"); }

    submit(mesh) {
        if(!Type.isInstance(mesh, Mesh)) {
            console.error("RenderBatch submit mesh must be a Mesh!");
            return;
        }

        for(var i = 0; i < mesh.vertices.length; i++) {
            this.#vertices_.push(mesh.vertices[i].x, mesh.vertices[i].y, mesh.vertices[i].z);
        }
    }
}