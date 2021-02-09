class Material {
    #shaderProgram_;

    #properties_;

    constructor(shaderProgram, properties = {}) {
        if(!Type.isInstance(shaderProgram, ShaderProgram)) {
            console.error("Material constructor shaderProgram must be a ShaderProgram!");
            return;
        }

        if(!Type.isObject(properties)) {
            console.error("Material constructor properties must be an Object!");
            return;
        }

        this.#shaderProgram_ = shaderProgram;
        this.#properties_ = properties;
    }

    get shaderProgram() { return this.#shaderProgram_; }
    set shaderProgram(value) { console.error("Material shaderProgram is readonly!"); }

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

        Canvas.gl.uniformMatrix4fv(this.#shaderProgram_.uniforms.projectionMatrix, false, Matrix4.perspective(60, Application.width / Application.height, 0.1, 100).elementsf32);
        Canvas.gl.uniformMatrix4fv(this.#shaderProgram_.uniforms.modelViewMatrix, false, Matrix4.translation(Vector3.zero).elementsf32);

        // TODO: properties
    }
}