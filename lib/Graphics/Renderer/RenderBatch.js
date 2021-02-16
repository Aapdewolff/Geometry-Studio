class RenderBatch {
    #material_;

    #subBatches_;

    constructor(material) {
        if(!Type.isInstance(material, Material)) {
            console.error("RenderBatch constructor material must be a Material!");
            return null;
        }

        this.#material_ = material;
        this.#subBatches_ = [];
    }

    get material() { return this.#material_; }
    set material(value) { console.error("RenderBatch material is readonly!"); }

    get subBatches() { return this.#subBatches_; }
    set subBatches(value) { console.error("RenderBatch subBatches is readonly!"); }

    submit(meshRenderer) {
        if(!Type.isInstance(meshRenderer, MeshRenderer)) {
            console.error("RenderBatch submit meshRenderer must be a MeshRenderer!");
            return;
        }

        for(var i = 0; i < this.#subBatches_.length; i++) {
            if(this.#subBatches_[i].material.equalProperties(meshRenderer.material) && (this.#subBatches_[i].vertices.length + meshRenderer.glVertices.length) / 3 <= 65535) {
                this.#subBatches_[i].submit(meshRenderer);
                return;
            }
        }

        const renderSubBatch = new RenderSubBatch(meshRenderer.material);
        renderSubBatch.submit(meshRenderer);
        this.#subBatches_.push(renderSubBatch);
    }
}