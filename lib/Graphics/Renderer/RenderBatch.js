class RenderBatch {
    #material_;

    #vertices_;
    #indices_;
    #indexCount_;
    #uvs_;

    constructor(material) {
        if(!Type.isInstance(material, Material)) {
            console.error("RenderBatch constructor material must be a Material!");
            return null;
        }

        this.#material_ = material;
        this.#vertices_ = [];
        this.#indices_ = [];
        this.#indexCount_ = 0;
        this.#uvs_ = [];
    }

    get material() { return this.#material_; }
    set material(value) { console.error("RenderBatch material is readonly!"); }

    get vertices() { return this.#vertices_; }
    set vertices(value) { console.error("RenderBatch vertices is readonly!"); }

    get indices() { return this.#indices_; }
    set indices(value) { console.error("RenderBatch indices is readonly!"); }

    get uvs() { return this.#uvs_; }
    set uvs(value) { console.error("RenderBatch uvs is readonly!"); }

    submit(meshRenderer) {
        if(!Type.isInstance(meshRenderer, MeshRenderer)) {
            console.error("RenderBatch submit meshRenderer must be a MeshRenderer!");
            return;
        }
        
        this.#vertices_ = this.#vertices_.concat(meshRenderer.glVertices);
        this.#uvs_ = this.#uvs_.concat(meshRenderer.mesh.uvArray);

        var indices = meshRenderer.mesh.indices;
        for(var i = 0; i < indices.length; i++) {
            indices[i] += this.#indexCount_;
        }
        this.#indices_ = this.#indices_.concat(indices);
        this.#indexCount_ += meshRenderer.glVertices.length / 3;
    }
}