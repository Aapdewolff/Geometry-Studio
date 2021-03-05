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
            vertexPosition: Canvas.gl.getAttribLocation(this.#glProgram_, "aVertexPosition"),
            vertexNormal: Canvas.gl.getAttribLocation(this.#glProgram_, "aVertexNormal"),
            textureCoord: Canvas.gl.getAttribLocation(this.#glProgram_, 'aTextureCoord')
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
            console.error("ShaderProgram getUniformLocations uniforms must be an array!")
            return null;
        }

        var locations = {};
        for(var i = 0; i < uniforms.length; i++) {
            locations[uniforms[i]] = Canvas.gl.getUniformLocation(this.#glProgram_, uniforms[i]);
        }

        return locations;
    }

    enable(positionBuffer, normalBuffer, uvBuffer) {
        if(!Type.isInstance(positionBuffer, WebGLBuffer)) {
            console.error("ShaderProgram enable positionBuffer must be a WebGLBuffer!");
            return;
        }

        if(!Type.isInstance(uvBuffer, WebGLBuffer)) {
            console.error("ShaderProgram enable uvBuffer must be a WebGLBuffer!");
            return;
        }

        Canvas.gl.bindBuffer(Canvas.gl.ARRAY_BUFFER, positionBuffer);
        Canvas.gl.vertexAttribPointer(this.#attributeLocations_.vertexPosition, 3, Canvas.gl.FLOAT, false, 0, 0);
        Canvas.gl.enableVertexAttribArray(this.#attributeLocations_.vertexPosition);

        Canvas.gl.bindBuffer(Canvas.gl.ARRAY_BUFFER, normalBuffer);
        Canvas.gl.vertexAttribPointer(this.#attributeLocations_.vertexNormal, 3, Canvas.gl.FLOAT, false, 0, 0);
        Canvas.gl.enableVertexAttribArray(this.#attributeLocations_.vertexNormal);

        Canvas.gl.bindBuffer(Canvas.gl.ARRAY_BUFFER, uvBuffer);
        Canvas.gl.vertexAttribPointer(this.#attributeLocations_.textureCoord, 2, Canvas.gl.FLOAT, false, 0, 0);
        Canvas.gl.enableVertexAttribArray(this.#attributeLocations_.textureCoord);

        Canvas.gl.useProgram(this.#glProgram_);
    }

    applyLighting() {
        var lights = Scene.findComponents(Light);

        var dirLights = [];
        var pointLights = [];
        for(var i = 0; i < lights.length; i++) {
            if(lights[i].type == LightType.DIRECTIONAL)
                dirLights.push(lights[i]);
            else if(lights[i].type == LightType.POINT)
                pointLights.push(lights[i]);
        }

        var locations = this.getUniformLocations(["uAmbientColor", "uViewPos"]);

        Canvas.gl.uniform3f(locations["uAmbientColor"], Scene.ambientColor.r, Scene.ambientColor.g, Scene.ambientColor.b);
        Canvas.gl.uniform3f(locations["uViewPos"], 0, 0, 0);
        
        for(var i = 0; i < dirLights.length; i++) {
            const direction = Canvas.gl.getUniformLocation(this.#glProgram_, "uDirLights[" + i + "].direction");
            Canvas.gl.uniform3f(direction, dirLights[i].actor.rotation.normalized.x, dirLights[i].actor.rotation.normalized.y, dirLights[i].actor.rotation.normalized.z);
            const diffuse = Canvas.gl.getUniformLocation(this.#glProgram_, "uDirLights[" + i + "].diffuse");
            Canvas.gl.uniform3f(diffuse, dirLights[i].color.r, dirLights[i].color.g, dirLights[i].color.b);
            const specular = Canvas.gl.getUniformLocation(this.#glProgram_, "uDirLights[" + i + "].specular");
            Canvas.gl.uniform3f(specular, dirLights[i].color.r * 1, dirLights[i].color.g * 1, dirLights[i].color.b * 1);
        }

        for(var i = 0; i < pointLights.length; i++) {
            const position = Canvas.gl.getUniformLocation(this.#glProgram_, "uPointLights[" + i + "].position");
            Canvas.gl.uniform3f(position, pointLights[i].actor.position.x, pointLights[i].actor.position.y, pointLights[i].actor.position.z);
            const diffuse = Canvas.gl.getUniformLocation(this.#glProgram_, "uPointLights[" + i + "].diffuse");
            Canvas.gl.uniform3f(diffuse, pointLights[i].color.r, pointLights[i].color.g, pointLights[i].color.b);
            const specular = Canvas.gl.getUniformLocation(this.#glProgram_, "uPointLights[" + i + "].specular");
            Canvas.gl.uniform3f(specular, pointLights[i].color.r * 0.1, pointLights[i].color.g * 0.1, pointLights[i].color.b * 0.1);
        }
    }
}