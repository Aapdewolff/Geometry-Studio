class MeshRenderer {
    #actor_;

    #mesh_;
    #glVertices_;
    #material_;

    constructor(actor) {
        if(!Type.isInstance(actor, Actor)) {
            console.error("MeshRenderer constructor actor must be an Actor!");
            return null;
        }

        this.#actor_ = actor;
        this.#glVertices_ = [];
    }

    get actor() { return this.#actor_; }
    set actor(value) { console.error("MeshRenderer actor is readonly!"); }

    get mesh() { return this.#mesh_; }
    set mesh(value) {
        if(!Type.isInstance(value, Mesh) && value != null) {
            console.error("MeshRenderer mesh must be a Mesh or null!");
            return;
        }

        this.#mesh_ = value;
        this.recalculate();
    }

    get glVertices() { return this.#glVertices_; }
    set glVertices(value) { console.error("MeshRenderer glVertices is readonly!"); }

    get material() { return this.#material_; }
    set material(value) {
        if(!Type.isInstance(value, Material) && value != null) {
            console.error("MeshRenderer material must be a Material or null!");
            return;
        }

        this.#material_ = value;
    }

    recalculate() {
        if(this.#mesh_ != null) {
            this.#glVertices_.length = 0;

            for(var i = 0; i < this.#mesh_.vertices.length; i++) {
                var vertex = new Vector3().set(this.#mesh_.vertices[i]);

                vertex.multiplyByMatrix4(Matrix4.scale(this.#actor_.scale));

                vertex.multiplyByMatrix4(Matrix4.rotation(this.#actor_.rotation.x, Vector3.right));
                vertex.multiplyByMatrix4(Matrix4.rotation(this.#actor_.rotation.y, Vector3.up));
                vertex.multiplyByMatrix4(Matrix4.rotation(this.#actor_.rotation.z, Vector3.forward));

                vertex.add(this.#actor_.position);
                

                this.#glVertices_.push(vertex.x, vertex.y, vertex.z);
            }
        }
    }
}