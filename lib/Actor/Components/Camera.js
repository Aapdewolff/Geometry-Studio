class Camera {
    #fov_;
    #near_;
    #far_;
    #mode_;

    #right_;
    #up_;
    #forward_;

    #matrix_;

    constructor(actor) {
        this.actor = actor;

        this.#fov_ = 60;
        this.#near_ = 0.1;
        this.#far_ = 100.0;
        this.#mode_ = CameraMode.PERSPECTIVE;

        this.#right_ = Vector3.right;
        this.#up_ = Vector3.up;
        this.#forward_ = Vector3.forward;

        this.recalculate();
    }

    get fov() { return this.#fov_; }
    set fov(value) {
        if(!Type.isNumber(value)) {
            console.error("Camera fov must be a number!");
            return;
        }

        this.#fov_ = value;

        this.recalculate();
    }

    get near() { return this.#near_; }
    set near(value) {
        if(!Type.isNumber(value)) {
            console.error("Camera near must be a number!");
            return;
        }

        this.#near_ = value;

        this.recalculate();
    }

    get far() { return this.#far_; }
    set far(value) {
        if(!Type.isNumber(value)) {
            console.error("Camera far must be a number!");
            return;
        }

        this.#far_ = value;

        this.recalculate();
    }

    get mode() { return this.#mode_; }
    set mode(value) {
        if(!Type.isEnum(value)) {
            console.error("Camera mode must be a CameraMode enum!");
            return;
        }

        this.#mode_ = value;

        this.recalculate();
    }

    get matrix() { return this.#matrix_.elementsf32; }
    set matrix(value) { console.error("Camera matrix is readonly!"); }

    recalculate() {
        this.#matrix_ = Matrix4.perspective(this.#fov_, Application.width / Application.height, this.#near_, this.#far_);

        this.#matrix_.multiply(Matrix4.rotation(this.actor.rotation.x, this.#right_));
        this.#matrix_.multiply(Matrix4.rotation(this.actor.rotation.y, this.#up_));
        this.#matrix_.multiply(Matrix4.rotation(this.actor.rotation.z, this.#forward_));
        this.#matrix_.multiply(Matrix4.translation(Vector3.multiplyByNumber(this.actor.position, -1)));
    }
}

const CameraMode = Object.freeze({
    PERSPECTIVE: 0,
    ORTHOGRAPHIC: 1
});

Application.registerScript(Camera);