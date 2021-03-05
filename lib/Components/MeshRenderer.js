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
            this.#glVertices_.length = 0;
            var vertices = this.#mesh_.vertices;
            for(var i = 0; i < vertices.length; i++) {
                vertices[i].multiplyByMatrix4(this.#glMatrix_).add(this.actor.position);

                this.#glVertices_.push(vertices[i].x, vertices[i].y, vertices[i].z);
            }

            this.#glNormals_.length = 0;
            var normals = this.#mesh_.normals;
            for(var i = 0; i < normals.length; i++) {
                normals[i].multiplyByMatrix4(this.#glNormalMatrix_);

                this.#glNormals_.push(normals[i].x, normals[i].y, normals[i].z);
            }
        }
    }
}

Application.registerScript(MeshRenderer);