class Renderer {
    static #vertexBuffer_;

    static #batches_;

    static #initialized_ = false;

    static init() {
        if(Renderer.#initialized_)
            return;
        
        Renderer.#initialized_ = true;

        Renderer.#batches_ = [];

        Renderer.#vertexBuffer_ = Canvas.gl.createBuffer();
        Canvas.gl.bindBuffer(Canvas.gl.ARRAY_BUFFER, Renderer.#vertexBuffer_);
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
            Canvas.gl.bufferData(Canvas.gl.ARRAY_BUFFER, new Float32Array(Renderer.#batches_[i].vertices), Canvas.gl.STATIC_DRAW);

            Renderer.#batches_[i].material.enable();
            
            Canvas.gl.drawArrays(Canvas.gl.TRIANGLE_STRIP, 0, Renderer.#batches_[i].vertices.length / 3);
        }

        Renderer.#batches_.length = 0;
    }
}