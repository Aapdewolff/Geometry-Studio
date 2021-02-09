class Resources {
    static #shaders_ = [];
    
    static #useSessionStorage_;

    static init(useSessionStorage = true) {
        Resources.#useSessionStorage_ = useSessionStorage;

        if( Resources.#useSessionStorage_) {
            window.sessionStorage.setItem("shaders", "[]");
        }
    }

    static getShader(filename) {
        if(!Type.isString(filename)) {
            console.error("Resources.GetShader filename must be a string!");
            return null;
        }

        if(Resources.#useSessionStorage_) {
            const shaders = JSON.parse(window.sessionStorage.getItem("shaders"));
            for(var i = 0; i < shaders.length; i++) {
                if(shaders[i].name == filename)
                    return shaders[i];
            }
        } else {
            for(var i = 0; i < this.#shaders_.length; i++) {
                if(this.#shaders_[i].name == filename)
                    return this.#shaders_[i];
            }
        }

        return null;
    }

    static parseShader(source) {
        if(source.type != "Shader") {
            console.error("Resources.ParseShader source must be a shader source object!");
            return;
        }

        if(Resources.#useSessionStorage_) {
            var shaders = JSON.parse(window.sessionStorage.getItem("shaders"));
            shaders.push(source);
            window.sessionStorage.setItem("shaders", JSON.stringify(shaders));
        } else {
            Resources.#shaders_.push(source);
        }
    }
}