class RenderSubBatch {
    #material_;

    #vertices_;
    #indices_;
    #indexCount_;
    #uvs_;
    #normals_;

    constructor(material) {
        if(!Type.isInstance(material, Material)) {
            console.error("RenderSubBatch constructor material must be a Material!");
            return null;
        }

        this.#material_ = material;
        this.#vertices_ = [];
        this.#indices_ = [];
        this.#indexCount_ = 0;
        this.#uvs_ = [];
        this.#normals_ = [];
    }

    get material() { return this.#material_; }
    set material(value) { console.error("RenderSubBatch material is readonly!"); }

    get vertices() { return this.#vertices_; }
    set vertices(value) { console.error("RenderSubBatch vertices is readonly!"); }

    get indices() { return this.#indices_; }
    set indices(value) { console.error("RenderSubBatch indices is readonly!"); }

    get uvs() { return this.#uvs_; }
    set uvs(value) { console.error("RenderSubBatch uvs is readonly!"); }

    get normals() { return this.#normals_; }
    set normals(value) { console.error("RenderSubBatch normals is readonly!"); }

    submit(meshRenderer) {
        if(!Type.isInstance(meshRenderer, MeshRenderer)) {
            console.error("RenderSubBatch submit meshRenderer must be a MeshRenderer!");
            return;
        }

        var indices = meshRenderer.mesh.indices;
        for(var i = 0; i < indices.length; i++) {
            indices[i] += this.#indexCount_;
        }
        this.#indexCount_ += meshRenderer.glVertices.length / 3;

        Utils.AppendArrays(this.#vertices_, meshRenderer.glVertices);
        Utils.AppendArrays(this.#uvs_, meshRenderer.mesh.uvArray);
        Utils.AppendArrays(this.#indices_, indices);
        Utils.AppendArrays(this.#normals_, meshRenderer.glNormals);
    }
}