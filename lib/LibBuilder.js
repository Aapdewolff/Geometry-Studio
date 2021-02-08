class LibBuilder {
    static #scripts = ["Type", "Logger", "Graphics/Canvas", "Mathf/Mathf", "Mathf/Vector2", "Mathf/Vector3"];
    static #loadedScripts = 0;
    static #callback;

    static RegisterScript(script) {
        LibBuilder.#scripts.push(script);
    }

    static Build(callback) {
        LibBuilder.#callback = callback;

        for(const script of LibBuilder.#scripts) {
            var scriptElement = document.createElement("script");
            scriptElement.src = "lib/" + script + ".js";
            scriptElement.type = "text/javascript";

            scriptElement.onload = LibBuilder.#BuildCallback;

            document.head.appendChild(scriptElement);
        }
    }

    static #BuildCallback() {
        if(++LibBuilder.#loadedScripts >= LibBuilder.#scripts.length) {
            LibBuilder.#loadedScripts = 0;

            LibBuilder.#callback();

            LibBuilder.#callback = null;
        }
    }
}