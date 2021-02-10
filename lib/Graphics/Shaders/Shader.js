class Shader {
    #fileName_;
    #shaderType_;
    #glShader_;

    constructor(fileName) {
        if(!Type.isString(fileName)) {
            console.error("Shader constructor fileName must be a string!");
            return null;
        }

        this.#fileName_ = fileName;

        const shaderSrc = Resources.getShader(this.#fileName_);
        if(shaderSrc == null) {
            console.error("Can't find a .shader at \"" + filename + "\n!");
            return null;
        }
        this.#shaderType_ = shaderSrc.data.shaderType == "Vertex" ? ShaderType.vertex : ShaderType.fragment;

        this.#glShader_ = Canvas.gl.createShader(this.#shaderType_ == 0 ? Canvas.gl.VERTEX_SHADER : Canvas.gl.FRAGMENT_SHADER);
        Canvas.gl.shaderSource(this.#glShader_, shaderSrc.data.src);

        Canvas.gl.compileShader(this.#glShader_);
        if (!Canvas.gl.getShaderParameter(this.#glShader_, Canvas.gl.COMPILE_STATUS)) {
            console.error("Error compiling " + (this.#shaderType_ == 0 ? "vertex" : "fragment") + " shader (" + this.#fileName_ + ")\n" + Canvas.gl.getShaderInfoLog(this.#glShader_) + "\n");
            Canvas.gl.deleteShader(this.#glShader_);
            return null;
        }
    }

    get fileName() { return this.#fileName_; }
    set fileName(value) { console.error("Shader fileName is readonly!"); }

    get shaderType() { return this.#shaderType_; }
    set shaderType(value) { console.error("Shader shaderType is readonly!"); }

    get glShader() { return this.#glShader_; }
    set glShader(value) { console.error("Shader glShader is readonly!"); }
}

const ShaderType = Object.freeze({
    vertex: 0,
    fragment: 1
});