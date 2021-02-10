class Material {
    #shaderProgram_;

    #properties_;

    constructor(shaderProgram, properties = {}) {
        if(!Type.isInstance(shaderProgram, ShaderProgram)) {
            console.error("Material constructor shaderProgram must be a ShaderProgram!");
            return null;
        }

        if(!Type.isObject(properties)) {
            console.error("Material constructor properties must be an Object!");
            return null;
        }

        this.#shaderProgram_ = shaderProgram;
        this.#properties_ = properties;
    }

    get shaderProgram() { return this.#shaderProgram_; }
    set shaderProgram(value) { console.error("Material shaderProgram is readonly!"); }

    get properties() { return this.#properties_; }
    set properties(value) {
        if(!Type.isObject(value)) {
            console.error("Material properties must be an object!");
            return;
        }

        this.#properties_ = value;
    }

    equals(material) {
        if(!Type.isInstance(material, Material)) {
            console.error("Material equals material must be a Material!");
            return false;
        }

        return Utils.CompareObjects(material.#properties_, this.#properties_) && material.shaderProgram.vertShader.fileName == this.#shaderProgram_.vertShader.fileName && material.shaderProgram.fragShader.fileName == this.#shaderProgram_.fragShader.fileName;
    }

    enable() {
        this.#shaderProgram_.enable();

        Canvas.gl.useProgram(this.#shaderProgram_.glProgram);

        var locations = this.#shaderProgram_.getUniformLocations(["uProjectionMatrix", "uModelViewMatrix"].concat(Utils.PropertiesToArray(this.#properties_)));

        Canvas.gl.uniformMatrix4fv(locations["uProjectionMatrix"], false, Matrix4.perspective(60, Application.width / Application.height, 0.1, 100).elementsf32);
        delete locations["uProjectionMatrix"];
        Canvas.gl.uniformMatrix4fv(locations["uModelViewMatrix"], false, Matrix4.translation(Vector3.zero).elementsf32);
        delete locations["uModelViewMatrix"];

        for(var location in locations) {
            var value = this.#properties_[location.toString()];
            
            if(Type.isInstance(value, Vector3))
                Canvas.gl.uniform3f(locations[location], value.x, value.y, value.z);
        }
    }
}