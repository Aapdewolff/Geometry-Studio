class Light {
    #actor_;

    #type_;
    #color_;

    constructor(actor) {
        if(!Type.isInstance(actor, Actor)) {
            console.error("Light constructor actor must be an Actor!");
            return null;
        }

        this.#actor_ = actor;

        this.type = LightType.DIRECTIONAL;
        this.color = Color.white;

        Scene.lights.push(this);
    }

    get actor() { return this.#actor_; }
    set actor(value) { console.error("Light actor is readonly!"); }

    get type() { return this.#type_; }
    set type(value) {
        if(!Type.isEnum(value, LightType)) {
            console.error("Light lightType must be a LightType enum!");
            return;
        }

        this.#type_ = value;
    }

    get color() { return this.#color_; }
    set color(value) {
        if(!Type.isInstance(value, Color)) {
            console.error("Light color must be a Color!");
            return;
        }

        this.#color_ = value;
    }
}

const LightType = Object.freeze({
    DIRECTIONAL: 0,
    POINT: 1
});