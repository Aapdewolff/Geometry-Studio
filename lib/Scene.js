class Scene {
    static #actors_;
    static #ambientColor_;

    static init() {
        Scene.#actors_ = [];
        Scene.#ambientColor_ = Color.white;
    }

    static get actors() { return Scene.#actors_; }
    static set actors(value) { console.error("Scene.actors is readonly!"); }

    static get ambientColor() { return Scene.#ambientColor_; }
    static set ambientColor(value) {
        if(!Type.isInstance(value, Color)) {
            console.error("Scene.ambientColor must be a Color!");
            return;
        }

        Scene.#ambientColor_ = value;
    }

    static findComponent(component) {
        for(var i = 0; i < Scene.#actors_.length; i++) {
            const found = Scene.#actors_[i].getComponent(component);
            if(found != null)
                return found;
        }

        return null;
    }

    static findComponents(component) {
        var result = [];
        for(var i = 0; i < Scene.#actors_.length; i++) {
            const found = Scene.#actors_[i].getComponent(component);
            if(found != null)
                result.push(found);
        }

        return result;
    }
}