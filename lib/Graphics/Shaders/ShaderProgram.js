class ShaderProgram {
    #vertShader_;
    #fragShader_;
    #glProgram_;

    #attributeLocations_;
    #uniforms_;

    constructor(vertShader, fragShader) {
        if(!Type.isInstance(vertShader, Shader)) {
            console.error("ShaderProgram constructor vertShader must be a Shader!");
            return null;
        }

        if(!Type.isInstance(fragShader, Shader)) {
            console.error("ShaderProgram constructor fragShader must be a Shader!");
            return null;
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
            return null;
        }

        this.#attributeLocations_ = {
            vertexPosition: Canvas.gl.getAttribLocation(this.#glProgram_, "aVertexPosition")
        };

        this.#uniforms_ = [];
        const numUniforms = Canvas.gl.getProgramParameter(this.#glProgram_, Canvas.gl.ACTIVE_UNIFORMS);
        for (var i = 0; i < numUniforms; i++) {
            this.#uniforms_.push(Canvas.gl.getActiveUniform(this.#glProgram_, i));
        }
    }

    get vertShader() { return this.#vertShader_; }
    set vertShader(value) { console.error("ShaderProgram vertShader is readonly!"); }

    get fragShader() { return this.#fragShader_; }
    set fragShader(value) { console.error("ShaderProgram fragShader is readonly!"); }

    get glProgram() { return this.#glProgram_; }
    set glProgram(value) { console.error("ShaderProgram glProgram is readonly!"); }

    getUniformInfo(name) {
        if(!Type.isString(name)) {
            console.error("ShaderProgram getUniformInfo name must be a string!");
            return null;
        }

        for(var i = 0; i < this.#uniforms_.length; i++) {
            if(this.#uniforms_[i].name == name)
                return this.#uniforms_[i];
        }

        return null;
    }

    getUniformLocations(uniforms) {
        if(!Array.isArray(uniforms)) {
            console.error("ShaderProgram getuniformLocations uniforms must be an array!")
            return null;
        }

        var locations = {};
        for(var i = 0; i < uniforms.length; i++) {
            locations[uniforms[i]] = Canvas.gl.getUniformLocation(this.#glProgram_, uniforms[i]);
        }

        return locations;
    }

    enable() {
        Canvas.gl.vertexAttribPointer(this.#attributeLocations_.vertexPosition, 3, Canvas.gl.FLOAT, false, 0, 0);
        Canvas.gl.enableVertexAttribArray(this.#attributeLocations_.vertexPosition);
    }
}