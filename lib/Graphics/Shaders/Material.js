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

        return Utils.CompareObjectsAsString(material.#properties_, this.#properties_) && material.shaderProgram.vertShader.fileName == this.#shaderProgram_.vertShader.fileName && material.shaderProgram.fragShader.fileName == this.#shaderProgram_.fragShader.fileName;
    }

    enable(positionBuffer, uvBuffer) {
        this.#shaderProgram_.enable(positionBuffer, uvBuffer);

        var locations = this.#shaderProgram_.getUniformLocations(["uProjectionMatrix", "uModelViewMatrix"].concat(Utils.PropertiesToArray(this.#properties_)));

        Canvas.gl.uniformMatrix4fv(locations["uProjectionMatrix"], false, Matrix4.perspective(60, Application.width / Application.height, 0.1, 100).elementsf32);
        delete locations["uProjectionMatrix"];
        Canvas.gl.uniformMatrix4fv(locations["uModelViewMatrix"], false, Matrix4.translation(Vector3.zero).elementsf32);
        delete locations["uModelViewMatrix"];

        var textureIndex = 0;

        for(var location in locations) {
            var value = this.#properties_[location.toString()];

            if(value === undefined || value == null)
                continue;
            
            const validation = this.#isLegalPropertyInput(value, location);
            if(validation == false) {
                console.warn("Material property \"" + location + "\" was not found!");
                continue;
            }

            if(!validation.legal) {
                console.error("Material property \"" + location + "\" must be a " + validation.requested + "!");
                continue;
            }

            if(validation.requested == "number")
                Canvas.gl.uniform1f(locations[location], value);
            else if(validation.requested == "Vector2")
                Canvas.gl.uniform2f(locations[location], value.x, value.y);
            else if(validation.requested == "Vector3")
                Canvas.gl.uniform3f(locations[location], value.x, value.y, value.z);
            else if(validation.requested == "Color")
                Canvas.gl.uniform4f(locations[location], value.r, value.g, value.b, value.a);
            else if(validation.requested == "number (int)")
                Canvas.gl.uniform1i(locations[location], value);
            else if(validation.requested == "Vector2 (int)")
                Canvas.gl.uniform2i(locations[location], value.x, value.y);
            else if(validation.requested == "Vector3 (int)")
                Canvas.gl.uniform3i(locations[location], value.x, value.y, value.z);
            else if(validation.requested == "Color (int)")
                Canvas.gl.uniform4i(locations[location], value.r, value.g, value.b, value.a);
            else if(validation.requested == "bool")
                Canvas.gl.uniform1i(locations[location], value);
            else if(validation.requested == "Matrix4")
                Canvas.gl.uniformMatrix4fv(locations[location], false, value);
            else if(validation.requested == "Texture") {
                if(textureIndex >= 32) {
                    console.warn("Material can't have more then 32 textures!");
                    return;
                }

                Canvas.gl.activeTexture(Canvas.gl.TEXTURE0 + textureIndex);
                Canvas.gl.bindTexture(Canvas.gl.TEXTURE_2D, value.glTexture);

                Canvas.gl.uniform1i(locations[location], textureIndex);
                textureIndex++;
            }
        }
    }

    #isLegalPropertyInput(input, uniformName) {
        const info = this.#shaderProgram_.getUniformInfo(uniformName);
        if(info == null || info == undefined)
            return false;
        
        switch(info.type) {
            case Canvas.gl.FLOAT:
                return { 
                    legal: Type.isNumber(input),
                    requested: "number"
                };
            case Canvas.gl.FLOAT_VEC2:
                return { 
                    legal: Type.isInstance(input, Vector2),
                    requested: "Vector2"
                };
            case Canvas.gl.FLOAT_VEC3:
                return { 
                    legal: Type.isInstance(input, Vector3),
                    requested: "Vector3"
                };
            case Canvas.gl.FLOAT_VEC4:
                return { 
                    legal: Type.isInstance(input, Color),
                    requested: "Color"
                };
            case Canvas.gl.INT:
                return { 
                    legal: Type.isNumber(input),
                    requested: "number (int)"
                };
            case Canvas.gl.INT_VEC2:
                return { 
                    legal: Type.isInstance(input, Vector2),
                    requested: "Vector2 (int)"
                };
            case Canvas.gl.INT_VEC3:
                return { 
                    legal: Type.isInstance(input, Vector3),
                    requested: "Vector3 (int)"
                };
            case Canvas.gl.INT_VEC4:
                return { 
                    legal: Type.isInstance(input, Color),
                    requested: "Color (int)"
                };
            case Canvas.gl.BOOL:
                return { 
                    legal: Type.isBool(input),
                    requested: "bool"
                };
            case Canvas.gl.FLOAT_MAT4:
                return { 
                    legal: Type.isInstance(input, Matrix4),
                    requested: "Matrix4"
                };
            case Canvas.gl.SAMPLER_2D:
                return { 
                    legal: Type.isInstance(input, Texture),
                    requested: "Texture"
                };
            default:
                return { 
                    legal: false,
                    requested: "undefined"
                };
        }
    }
}