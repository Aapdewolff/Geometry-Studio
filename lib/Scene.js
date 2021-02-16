class Scene {
    static #ambientColor_;

    static actors = [];
    static lights = [];

    static get ambientColor() { return Scene.#ambientColor_; }
    static set ambientColor(value) {
        if(!Type.isInstance(value, Color)) {
            console.error("Scene.ambientColor must be a Color!");
            return;
        }

        Scene.#ambientColor_ = value;
    }
}