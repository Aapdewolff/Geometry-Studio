class Renderer {
    static #vertexBuffer_;
    static #indexBuffer_;
    static #uvBuffer_;

    static #batches_;

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
    }

    static submit(meshRenderer) {
        if(!Type.isInstance(meshRenderer, MeshRenderer)) {
            console.error("Renderer.submit meshRenderer must be a MeshRenderer!");
            return;
        }

        if(meshRenderer.mesh == null || meshRenderer.material == null)
            return;

        for(var i = 0; i < Renderer.#batches_.length; i++) {
            if(Renderer.#batches_[i].material.equals(meshRenderer.material)) {
                Renderer.#batches_[i].submit(meshRenderer);
                return;
            }
        }

        const renderBatch = new RenderBatch(meshRenderer.material);
        renderBatch.submit(meshRenderer);
        Renderer.#batches_.push(renderBatch);
    }

    static flush() {
        for(var i = 0; i < Renderer.#batches_.length; i++) {
            Canvas.gl.bindBuffer(Canvas.gl.ARRAY_BUFFER, Renderer.#vertexBuffer_);
            Canvas.gl.bufferData(Canvas.gl.ARRAY_BUFFER, new Float32Array(Renderer.#batches_[i].vertices), Canvas.gl.STATIC_DRAW);
            Canvas.gl.bufferData(Canvas.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(Renderer.#batches_[i].indices), Canvas.gl.STATIC_DRAW);
            Canvas.gl.bindBuffer(Canvas.gl.ARRAY_BUFFER, Renderer.#uvBuffer_);
            Canvas.gl.bufferData(Canvas.gl.ARRAY_BUFFER, new Float32Array(Renderer.#batches_[i].uvs), Canvas.gl.STATIC_DRAW);

            Renderer.#batches_[i].material.enable(this.#vertexBuffer_, this.#uvBuffer_);
            
            //Canvas.gl.drawArrays(Canvas.gl.TRIANGLE_STRIP, 0, Renderer.#batches_[i].vertices.length / 3);
            Canvas.gl.drawElements(Canvas.gl.TRIANGLES, Renderer.#batches_[i].indices.length, Canvas.gl.UNSIGNED_SHORT, 0);
        }

        Renderer.#batches_.length = 0;
    }
}