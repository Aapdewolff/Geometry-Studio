class CameraMovement {
    lookSensitivity = 0.1;
    panSensitivity = 2;
    scrollSensitivity = 1.5;

    smoothing = 6;

    #targetPosition_;

    start() {
        this.#targetPosition_ = new Vector3().set(this.actor.position);
    }

    update() {
        if(Input.getMouseButton(KeyCode.MIDDLE_MOUSE)) {
            if(!Input.getKey(KeyCode.SHIFT)) {
                const delta = new Vector3();

                delta.y += Input.getAxis("horizontal") * this.lookSensitivity;
                delta.x += Input.getAxis("vertical") * this.lookSensitivity;

                this.actor.rotation.add(delta);
            } else {
                const delta = new Vector3();

                delta.add(this.actor.right.multiplyByNumber(Input.getAxis("horizontal") * Time.deltaTime * this.panSensitivity));
                delta.add(this.actor.up.multiplyByNumber(Input.getAxis("vertical") * Time.deltaTime * this.panSensitivity));

                this.#targetPosition_.add(delta);
            }
        }

        if(Input.getMouseWheel("up")) {
            this.#targetPosition_.add(this.actor.forward.multiplyByNumber(this.scrollSensitivity));
        } else if(Input.getMouseWheel("down")) {
            this.#targetPosition_.add(this.actor.forward.multiplyByNumber(-this.scrollSensitivity));
        }
    }

    lateUpdate() {
        this.actor.position.set(Vector3.lerp(this.actor.position, this.#targetPosition_, 100 / this.smoothing * Time.deltaTime));
    }
}

Application.registerScript(CameraMovement);