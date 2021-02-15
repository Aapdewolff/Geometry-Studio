class GameLoop {
    static #elapsedTime_ = 0;
    static #frameCount_ = 0;
    static #lastTime_ = 0;

    static init() {
        GameLoop.#lastTime_ = new Date().getTime();
        requestAnimationFrame(GameLoop.#loop);
    }

    static #loop() {
        GameLoop.#start();
        GameLoop.#update();
        GameLoop.#lateUpdate();
        GameLoop.#render();

        for(var i = 0; i < Scene.actors.length; i++) {
            Scene.actors[i].rotation.add(new Vector3((i % 3 == 0 ? -1 : 1), 1, (i % 2 == 0 ? -1 : 1)));
        }

        const now = new Date().getTime();
        GameLoop.#frameCount_++;
        GameLoop.#elapsedTime_ += (now - GameLoop.#lastTime_);
        GameLoop.#lastTime_ = now;

        if(GameLoop.#elapsedTime_ >= 1000) {
            console.log("FPS: " + GameLoop.#frameCount_);
            console.log("Drawcalls: " + Renderer.drawCalls);
            GameLoop.#frameCount_ = 0;
            GameLoop.#elapsedTime_ -= 1000;
        }

        requestAnimationFrame(GameLoop.#loop);
    }

    static #start() {

    }

    static #update() {

    }

    static #lateUpdate() {

    }

    static #render() {
        Canvas.clear();

        for(var i = 0; i < Scene.actors.length; i++) {
            const meshRenderer = Scene.actors[i].getComponent(MeshRenderer);
            if(meshRenderer != null) {
                Renderer.submit(meshRenderer);
            }
        }
        
        Renderer.flush();
    }
}