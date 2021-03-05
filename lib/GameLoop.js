class GameLoop {
    static #elapsedTime_ = 0;
    static #frameCount_ = 0;
    static #lastTime_ = 0;

    static init() {
        GameLoop.#lastTime_ = new Date().getTime();

        GameLoop.#start();
        requestAnimationFrame(GameLoop.#loop);
    }

    static #loop() {
        GameLoop.#update();
        GameLoop.#lateUpdate();
        GameLoop.#render();

        const now = new Date().getTime();
        GameLoop.#frameCount_++;
        GameLoop.#elapsedTime_ += (now - GameLoop.#lastTime_);
        GameLoop.#lastTime_ = now;

        if(GameLoop.#elapsedTime_ >= 1000) {
            console.log("FPS: " + GameLoop.#frameCount_);
            console.log("Drawcalls: " + Renderer.drawCalls);
            console.log("Vertices: " + Renderer.vertices);
            GameLoop.#frameCount_ = 0;
            GameLoop.#elapsedTime_ -= 1000;
        }

        Time.update();
        Input.update();

        requestAnimationFrame(GameLoop.#loop);
    }

    static #start() {
        for(var i = 0; i < Scene.actors.length; i++) {
            Scene.actors[i].start();
        }
    }

    static #update() {
        for(var i = 0; i < Scene.actors.length; i++) {
            Scene.actors[i].update();
        }
    }

    static #lateUpdate() {
        for(var i = 0; i < Scene.actors.length; i++) {
            Scene.actors[i].lateUpdate();
        }
    }

    static #render() {
        Canvas.clear();

        const meshRenderers = Scene.findComponents(MeshRenderer);
        for(var i = 0; i < meshRenderers.length; i++) {
            Renderer.submit(meshRenderers[i]);
        }
        
        Renderer.flush();
    }
}