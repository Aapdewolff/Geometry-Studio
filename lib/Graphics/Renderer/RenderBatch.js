class RenderBatch {
    #material_;

    #vertices_;

    constructor(material) {
        if(!Type.isInstance(material, Material)) {
            console.error("RenderBatch constructor material must be a Material!");
            return null;
        }

        this.#material_ = material;
        this.#vertices_ = [];
    }

    get material() { return this.#material_; }
    set material(value) { console.error("RenderBatch material is readonly!"); }

    get vertices() { return this.#vertices_; }
    set vertices(value) { console.error("RenderBatch vertices is readonly!"); }

    submit(meshRenderer) {
        if(!Type.isInstance(meshRenderer, MeshRenderer)) {
            console.error("RenderBatch submit meshRenderer must be a MeshRenderer!");
            return;
        }
        
        this.#vertices_ = this.#vertices_.concat(meshRenderer.glVertices);
    }
}