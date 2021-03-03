class Shader {
    #name_;
    #shaderType_;
    #glShader_;

    constructor(name) {
        if(!Type.isString(name)) {
            console.error("Shader constructor name must be a string!");
            return null;
        }

        this.#name_ = name;

        const shader = Shaders.getShader(this.#name_);
        if(shader == null || shader == undefined) {
            console.error("Can't find a shader named: \"" + this.#name_ + "\n!");
            return null;
        }
        this.#shaderType_ = shader.type;

        this.#glShader_ = Canvas.gl.createShader(this.#shaderType_ == 0 ? Canvas.gl.VERTEX_SHADER : Canvas.gl.FRAGMENT_SHADER);
        Canvas.gl.shaderSource(this.#glShader_, shader.src);

        Canvas.gl.compileShader(this.#glShader_);
        if (!Canvas.gl.getShaderParameter(this.#glShader_, Canvas.gl.COMPILE_STATUS)) {
            console.error("Error compiling " + (this.#shaderType_ == 0 ? "vertex" : "fragment") + " shader (" + this.#name_ + ")\n" + Canvas.gl.getShaderInfoLog(this.#glShader_) + "\n");
            Canvas.gl.deleteShader(this.#glShader_);
            return null;
        }
    }

    get name() { return this.#name_; }
    set name(value) { console.error("Shader name is readonly!"); }

    get shaderType() { return this.#shaderType_; }
    set shaderType(value) { console.error("Shader shaderType is readonly!"); }

    get glShader() { return this.#glShader_; }
    set glShader(value) { console.error("Shader glShader is readonly!"); }
}

const ShaderType = Object.freeze({
    vertex: 0,
    fragment: 1
});