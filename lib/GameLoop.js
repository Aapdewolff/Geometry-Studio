class GameLoop {
    static init() {
        requestAnimationFrame(GameLoop.#loop);
    }

    static #loop() {
        GameLoop.#start();
        GameLoop.#update();
        GameLoop.#lateUpdate();
        GameLoop.#render();

        Scene.actors[0].rotation.add(new Vector3(0, 1, 0));

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