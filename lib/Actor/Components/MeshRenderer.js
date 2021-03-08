class MeshRenderer {
    #mesh_;
    #material_;

    #glMatrix_;
    #glNormalMatrix_;
    #glVertices_;
    #glNormals_;

    #up_;
    #forward_;
    #right_;

    constructor() {
        this.#up_ = Vector3.up;
        this.#forward_ = Vector3.forward;
        this.#right_ = Vector3.right;

        this.#glMatrix_ = Matrix4.identity();
        this.#glNormalMatrix_ = Matrix4.identity();
        this.#glVertices_ = [];
        this.#glNormals_ = [];
    }

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

    get glNormals() { return this.#glNormals_; }
    set glNormals(value) { console.error("MeshRenderer glNormals is readonly!"); }

    get material() { return this.#material_; }
    set material(value) {
        if(!Type.isInstance(value, Material) && value != null) {
            console.error("MeshRenderer material must be a Material or null!");
            return;
        }

        this.#material_ = value;
    }

    recalculate() {
        this.#glMatrix_ = Matrix4.rotation(this.actor.rotation.x, this.#right_, this.#glMatrix_);
        this.#glMatrix_.multiply(Matrix4.rotation(this.actor.rotation.y, this.#up_));
        this.#glMatrix_.multiply(Matrix4.rotation(this.actor.rotation.z, this.#forward_));
        this.#glNormalMatrix_ = Matrix4.transpose(Matrix4.invert(this.#glNormalMatrix_.set(this.#glMatrix_)));
        this.#glMatrix_.multiply(Matrix4.scale(this.actor.scale));

        if(this.#mesh_ != null) {
            var vertices = this.#mesh_.vertexArray;
            this.#glVertices_.length = vertices.length;
            for(var i = 0; i < vertices.length; i += 3) {
                const vertex = Vector3.multiplyBasicByMatrix4(vertices[i + 0], vertices[i + 1], vertices[i + 2], this.#glMatrix_);

                this.#glVertices_[i + 0] = vertex[0] + this.actor.position.x;
                this.#glVertices_[i + 1] = vertex[1] + this.actor.position.y;
                this.#glVertices_[i + 2] = vertex[2] + this.actor.position.z;
            }

            var normals = this.#mesh_.normalArray;
            this.#glNormals_.length = normals.length;
            for(var i = 0; i < normals.length; i += 3) {
                const normal = Vector3.multiplyBasicByMatrix4(normals[i + 0], normals[i + 1], normals[i + 2], this.#glNormalMatrix_);

                this.#glNormals_[i + 0] = normal[0];
                this.#glNormals_[i + 1] = normal[1];
                this.#glNormals_[i + 2] = normal[2];
            }
        }
    }
}

Application.registerScript(MeshRenderer);