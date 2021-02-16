class Renderer {
    static #vertexBuffer_;
    static #indexBuffer_;
    static #uvBuffer_;
    static #normalBuffer_;

    static #batches_;

    static #drawCalls_;
    static #vertices_;

    static #initialized_ = false;

    static init() {
        if(Renderer.#initialized_)
            return;
        
        Renderer.#initialized_ = true;

        Renderer.#batches_ = [];

        Renderer.#vertexBuffer_ = Canvas.gl.createBuffer();
        Renderer.#indexBuffer_ = Canvas.gl.createBuffer();
        Canvas.gl.bindBuffer(Canvas.gl.ELEMENT_ARRAY_BUFFER, Renderer.#indexBuffer_);
        Renderer.#uvBuffer_ = Canvas.gl.createBuffer();
        Renderer.#normalBuffer_ = Canvas.gl.createBuffer();
    }

    static submit(meshRenderer) {
        if(!Type.isInstance(meshRenderer, MeshRenderer)) {
            console.error("Renderer.submit meshRenderer must be a MeshRenderer!");
            return;
        }

        if(meshRenderer.mesh == null || meshRenderer.material == null)
            return;

        for(var i = 0; i < Renderer.#batches_.length; i++) {
            if(Renderer.#batches_[i].material.equalProgram(meshRenderer.material)) {
                Renderer.#batches_[i].submit(meshRenderer);
                return;
            }
        }

        const renderBatch = new RenderBatch(meshRenderer.material);
        renderBatch.submit(meshRenderer);
        Renderer.#batches_.push(renderBatch);
    }

    static flush() {
        Renderer.#drawCalls_ = 0;
        Renderer.#vertices_ = 0;

        for(var i = 0; i < Renderer.#batches_.length; i++) {
            Renderer.#batches_[i].material.enable(this.#vertexBuffer_, this.#normalBuffer_, this.#uvBuffer_);

            for(var b = 0; b < Renderer.#batches_[i].subBatches.length; b++) {
                const batch = Renderer.#batches_[i].subBatches[b];

                batch.material.assignProperties();

                Canvas.gl.bindBuffer(Canvas.gl.ARRAY_BUFFER, Renderer.#vertexBuffer_);
                Canvas.gl.bufferData(Canvas.gl.ARRAY_BUFFER, new Float32Array(batch.vertices), Canvas.gl.DYNAMIC_DRAW);
                Canvas.gl.bindBuffer(Canvas.gl.ARRAY_BUFFER, Renderer.#uvBuffer_);
                Canvas.gl.bufferData(Canvas.gl.ARRAY_BUFFER, new Float32Array(batch.uvs), Canvas.gl.DYNAMIC_DRAW);
                Canvas.gl.bindBuffer(Canvas.gl.ARRAY_BUFFER, Renderer.#normalBuffer_);
                Canvas.gl.bufferData(Canvas.gl.ARRAY_BUFFER, new Float32Array(batch.normals), Canvas.gl.DYNAMIC_DRAW);

                Canvas.gl.bufferData(Canvas.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(batch.indices), Canvas.gl.DYNAMIC_DRAW);

                //Canvas.gl.drawArrays(Canvas.gl.TRIANGLE_STRIP, 0, Renderer.#batches_[i].vertices.length / 3);
                Canvas.gl.drawElements(Canvas.gl.TRIANGLES, batch.indices.length, Canvas.gl.UNSIGNED_SHORT, 0);

                Renderer.#drawCalls_++;
                Renderer.#vertices_ += batch.vertices.length / 3;
            }
        }

        Renderer.#batches_.length = 0;
    }

    static get drawCalls() { return Renderer.#drawCalls_; }
    static set drawCalls(value) { console.error("Renderer.drawCalls is readonly!"); }

    static get vertices() { return Renderer.#vertices_; }
    static set vertices(value) { console.error("Renderer.vertices is readonly!"); }
}