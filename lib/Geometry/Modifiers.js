class Modifiers {
    static #selected_ = null;
    static #prevSelected_ = null;

    static get selected() { return Modifiers.#selected_; }
    static set selected(value) { console.error("selected is readonly! (Use select(mesh))"); }

    static select(mesh) {
        if(!Type.isInstance(mesh, Mesh) && mesh != null) {
            console.error("select mesh must be a Mesh!");
            return;
        }

        this.#prevSelected_ = null;
        this.#selected_ = mesh;
    }

    static shortSelect(mesh) {
        if(!Type.isInstance(mesh, Mesh) && mesh != null) {
            console.error("shortSelect mesh must be a Mesh!");
            return;
        }

        this.#prevSelected_ = this.#selected_;
        this.#selected_ = mesh;
    }

    static translate(translation) {
        if(!Type.isInstance(translation, Vector3)) {
            console.error("translate translation must be a Vector3!");
            return;
        }

        if(Modifiers.#selected_ == null) return;
        const { vertices, indices, normals, uvs } = Modifiers.#selected_.modifiables;

        for(var i = 0; i < vertices.length; i++) {
            vertices[i].x += translation.x;
            vertices[i].y += translation.y;
            vertices[i].z += translation.z;
        }

        Modifiers.#selected_.modify();
        if(this.#prevSelected_ != null)
            this.#selected_ = this.#prevSelected_;
    }

    static scale(scale) {
        if(!Type.isInstance(scale, Vector3)) {
            console.error("scale scale must be a Vector3!");
            return;
        }

        if(Modifiers.#selected_ == null) return;
        const { vertices, indices, normals, uvs } = Modifiers.#selected_.modifiables;

        for(var i = 0; i < vertices.length; i++) {
            vertices[i].x *= scale.x;
            vertices[i].y *= scale.y;
            vertices[i].z *= scale.z;
        }

        Modifiers.#selected_.modify();
        if(this.#prevSelected_ != null)
            this.#selected_ = this.#prevSelected_;
    }

    static calculateNormals() {
        if(Modifiers.#selected_ == null) return;
        const { vertices, indices, normals, uvs } = Modifiers.#selected_.modifiables;

        normals.length = 0;
        normals.length = vertices.length;

        for(var i = 0; i < indices.length; i += 3) {
            const vertex1 = vertices[indices[i + 0]];
            const vertex2 = vertices[indices[i + 1]];
            const vertex3 = vertices[indices[i + 2]];

            const vec2_1 = Vector3.substract(vertex2, vertex1).normalize();
            const vec3_1 = Vector3.substract(vertex3, vertex1).normalize();

            normals[indices[i + 0]] = new Vector3(vec2_1.y * vec3_1.z - vec2_1.z * vec3_1.y, vec2_1.z * vec3_1.x - vec2_1.x * vec3_1.z, vec2_1.x * vec3_1.y - vec2_1.y * vec3_1.x).normalize();
            normals[indices[i + 1]] = new Vector3(vec2_1.y * vec3_1.z - vec2_1.z * vec3_1.y, vec2_1.z * vec3_1.x - vec2_1.x * vec3_1.z, vec2_1.x * vec3_1.y - vec2_1.y * vec3_1.x).normalize();
            normals[indices[i + 2]] = new Vector3(vec2_1.y * vec3_1.z - vec2_1.z * vec3_1.y, vec2_1.z * vec3_1.x - vec2_1.x * vec3_1.z, vec2_1.x * vec3_1.y - vec2_1.y * vec3_1.x).normalize();
        }

        Modifiers.#selected_.modify();
        if(this.#prevSelected_ != null)
            this.#selected_ = this.#prevSelected_;
    }

    static getInterface() {
        return {
            selected:       Modifiers.selected,
            select:         Modifiers.selected,
            shortSelect:    Modifiers.shortSelect,

            translate: Modifiers.translate,
            scale: Modifiers.scale,

            calculateNormals: Modifiers.calculateNormals
        };
    }
}