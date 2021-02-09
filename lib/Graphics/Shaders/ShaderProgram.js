class ShaderProgram {
    #vertShader_;
    #fragShader_;
    #glProgram_;

    #attributes_;
    #uniforms_;

    constructor(vertShader, fragShader) {
        if(!Type.isInstance(vertShader, Shader)) {
            console.error("ShaderProgram constructor vertShader must be a Shader!");
            return;
        }

        if(!Type.isInstance(fragShader, Shader)) {
            console.error("ShaderProgram constructor fragShader must be a Shader!");
            return;
        }

        this.#vertShader_ = vertShader;
        this.#fragShader_ = fragShader;

        this.#glProgram_ = Canvas.gl.createProgram();
        Canvas.gl.attachShader(this.#glProgram_, this.#vertShader_.glShader);
        Canvas.gl.attachShader(this.#glProgram_, this.#fragShader_.glShader);

        if(Application.debugBuild)
            Canvas.gl.linkProgram(this.#glProgram_);
      
        if (!Canvas.gl.getProgramParameter(this.#glProgram_, Canvas.gl.LINK_STATUS)) {
            console.error("Error linking shader program (" + this.#vertShader_.fileName + ", " + this.#fragShader_.fileName + ")\n" + gl.getProgramInfoLog(shaderProgram));
            return;
        }

        this.#attributes_ = {
            vertexPosition: Canvas.gl.getAttribLocation(this.#glProgram_, "aVertexPosition")
        };

        this.#uniforms_ = {
            projectionMatrix: Canvas.gl.getUniformLocation(this.#glProgram_, "uProjectionMatrix"),
            modelViewMatrix: Canvas.gl.getUniformLocation(this.#glProgram_, "uModelViewMatrix")
        };
    }

    get vertShader() { return this.#vertShader_; }
    set vertShader(value) { console.error("ShaderProgram vertShader is readonly!"); }

    get fragShader() { return this.#fragShader_; }
    set fragShader(value) { console.error("ShaderProgram fragShader is readonly!"); }

    get glProgram() { return this.#glProgram_; }
    set glProgram(value) { console.error("ShaderProgram glProgram is readonly!"); }

    get uniforms() { return this.#uniforms_; }
    set uniforms(value) { console.error("ShaderProgram uniforms is readonly!"); }

    enable() {
        Canvas.gl.vertexAttribPointer(this.#attributes_.vertexPosition, 3, Canvas.gl.FLOAT, false, 0, 0);
        Canvas.gl.enableVertexAttribArray(this.#attributes_.vertexPosition);
    }
}