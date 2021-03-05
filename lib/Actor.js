class Actor {
    #position_;
    #rotation_;
    #scale_;

    #forward_;
    #right_;
    #up_;

    #components_;

    constructor(position = Vector3.zero, rotation = Vector3.zero, scale = Vector3.one) {
        if(!Type.isInstance(position, Vector3)) {
            console.error("Actor constructor position must be a Vector3!");
            return null;
        }

        if(!Type.isInstance(rotation, Vector3)) {
            console.error("Actor constructor rotation must be a Vector3!");
            return null;
        }

        if(!Type.isInstance(scale, Vector3)) {
            console.error("Actor constructor scale must be a Vector3!");
            return null;
        }

        this.#position_ = position;
        this.#rotation_ = rotation;
        this.#scale_ = scale;

        this.#forward_ = new Vector3();
        this.#right_ = new Vector3();
        this.#up_ = new Vector3();

        var onChangeCommand = new Command(this.#recalculate, this, this.#forward_, this.#right_, this.#up_);
        this.#position_.onChange = onChangeCommand;
        this.#rotation_.onChange = onChangeCommand;
        this.#scale_.onChange = onChangeCommand;

        this.#components_ = [];

        this.#recalculate(this);

        Scene.actors.push(this);
    }

    get position() { return this.#position_; }
    set position(value) {
        if(!Type.isInstance(value, Vector3)) {
            console.error("Actor position must be a Vector3!");
            return;
        }

        this.#position_ = value;
    }

    get rotation() { return this.#rotation_; }
    set rotation(value) {
        if(!Type.isInstance(value, Vector3)) {
            console.error("Actor rotation must be a Vector3!");
            return;
        }

        if((value.x %= 360) < 0) value.x += 360;
        if((value.y %= 360) < 0) value.y += 360;
        if((value.z %= 360) < 0) value.z += 360;

        this.#rotation_ = value;
    }

    get scale() { return this.#scale_; }
    set scale(value) {
        if(!Type.isInstance(value, Vector3)) {
            console.error("Actor scale must be a Vector3!");
            return;
        }

        this.#scale_ = value;
    }

    get forward() { return new Vector3().set(this.#forward_); }
    set forward(value) { console.error("Actor forward is readonly!"); }

    get right() { return new Vector3().set(this.#right_); }
    set right(value) { console.error("Actor right is readonly!"); }

    get up() { return new Vector3().set(this.#up_); }
    set up(value) { console.error("Actor up is readonly!"); }

    start() {
        for(var i = 0; i < this.#components_.length; i++) {
            if(Type.isFunction(this.#components_[i].start))
                this.#components_[i].start();
        }
    }

    update() {
        for(var i = 0; i < this.#components_.length; i++) {
            if(Type.isFunction(this.#components_[i].update))
                this.#components_[i].update();
        }
    }

    lateUpdate() {
        for(var i = 0; i < this.#components_.length; i++) {
            if(Type.isFunction(this.#components_[i].lateUpdate))
                this.#components_[i].lateUpdate();
        }
    }

    addComponent(component) {
        if(!Type.isComponent(component)) {
            console.error("Actor addComponent component must be a Component type!");
            return null;
        }

        for(var i = 0; i < this.#components_.length; i++) {
            if(Type.isInstance(this.#components_[i], component)) {
                console.error("Actor can't have more than one components of the same type!");
                return null;
            }
        }

        const comp = new component(this);
        comp.actor = this;
        this.#components_.push(comp);
        if(Type.isFunction(comp.start))
            comp.start();
        
        return comp;
    }

    getComponent(component) {
        if(!Type.isComponent(component)) {
            console.error("Actor getComponent component must be a Component type!");
            return null;
        }

        for(var i = 0; i < this.#components_.length; i++) {
            if(this.#components_[i].constructor.name == component.name)
                return this.#components_[i];
        }

        return null;
    }

    removeComponent(component) {
        if(!Type.isComponent(component)) {
            console.error("Actor removeComponent component must be a Component type!");
            return false;
        }

        for(var i = 0; i < this.#components_.length; i++) {
            if(Type.isInstance(this.#components_[i], component)) {
                this.#components_.splice(i, 1);
                return true;
            }
        }

        return false;
    }

    #recalculate(actor, forward, right, up) {
        if(!Type.isInstance(actor, Actor)) {
            console.error("Actor #recalculateGraphics actor must be an Actor!");
            return;
        }

        var x = actor.rotation.x;
        var y = actor.rotation.y;
        var z = actor.rotation.z;
        if((x %= 360) < 0) x += 360;
        if((y %= 360) < 0) y += 360;
        if((z %= 360) < 0) z += 360;
        actor.rotation.setRaw(new Vector3(x, y, z));

        const sinY = Math.sin(Mathf.deg2Rad(actor.rotation.y));
        const sinX = Math.sin(Mathf.deg2Rad(actor.rotation.x));
        const sinZ = Math.sin(Mathf.deg2Rad(actor.rotation.z));
        const cosY = Math.cos(Mathf.deg2Rad(actor.rotation.y));
        const cosX = Math.cos(Mathf.deg2Rad(actor.rotation.x));
        const cosZ = Math.cos(Mathf.deg2Rad(actor.rotation.z));

        const f = new Vector3();
        f.x = sinY * cosX;
        f.y = -sinX;
        f.z = -cosX * cosY;

        const r = new Vector3();
        r.z = -sinY * cosZ;
        r.y = -sinZ;
        r.x = -cosZ * cosY;

        const u = new Vector3();
        u.x = sinZ * cosX;
        u.z = sinX;
        u.y = cosX * cosZ;

        if(forward !== undefined) forward.set(f);
        if(right !== undefined) right.set(r);
        if(up !== undefined) up.set(u);

        const meshRenderer = actor.getComponent(MeshRenderer);
        if(meshRenderer != null) {
            meshRenderer.recalculate();
        }

        const camera = actor.getComponent(Camera);
        if(camera != null) {
            camera.recalculate();
        }
    }
}