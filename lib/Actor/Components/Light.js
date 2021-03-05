class Light {
    #type_;
    #color_;

    constructor() {
        this.type = LightType.DIRECTIONAL;
        this.color = Color.white;
    }

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

Application.registerScript(Light);