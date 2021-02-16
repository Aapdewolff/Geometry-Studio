class Actor {
    #position_;
    #rotation_;
    #scale_;

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

        var onChangeCommand = new Command(this.#recalculateGraphics, this);
        this.#position_.onChange = onChangeCommand;
        this.#rotation_.onChange = onChangeCommand;
        this.#scale_.onChange = onChangeCommand;

        this.#components_ = [];

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

    

    addComponent(component) {
        if(!Type.isComponent(component)) {
            console.error("Actor addComponent component must be a Component type!");
            return null;
        }

        const comp = new component(this);
        this.#components_.push(comp);
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

    #recalculateGraphics(actor) {
        if(!Type.isInstance(actor, Actor)) {
            console.error("Actor #recalculateGraphics actor must be an Actor!");
            return;
        }

        const meshRenderer = actor.getComponent(MeshRenderer);
        if(meshRenderer != null) {
            meshRenderer.recalculate();
        }
    }
}