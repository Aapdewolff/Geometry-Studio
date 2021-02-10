class LibBuilder {
    static #scripts_ = [
        "Resources", "Application", "Actor", "GameLoop", "Scene", "Command",
        "Components/MeshRenderer",
        "Utils/Utils", "Utils/Type", "Utils/Logger", 
        "Graphics/Canvas", "Graphics/Mesh",
            "Graphics/Shaders/Shader", "Graphics/Shaders/ShaderProgram", "Graphics/Shaders/Material",
            "Graphics/Renderer/Renderer", "Graphics/Renderer/RenderBatch",
        "Mathf/Mathf", "Mathf/Vector2", "Mathf/Vector3", "Mathf/Matrix4"
    ];

    static get components() { return [
        "MeshRenderer"
    ]; };
    
    static #resources_ = [
        "vertex.shader", "fragment.shader"
    ];
    
    static #loadedScripts_;
    static #loadedResources_;
    static #callback_;

    static build(callback = null) {
        LibBuilder.#loadedResources_ = 0;
        LibBuilder.#loadedScripts_= 0;
        LibBuilder.#callback_ = callback;

        LibBuilder.#buildScripts();
    }

    static #buildScripts() {
        for(const script of LibBuilder.#scripts_) {
            var scriptElement = document.createElement("script");
            scriptElement.src = "lib/" + script + ".js";
            scriptElement.type = "text/javascript";

            scriptElement.onload = LibBuilder.#scriptCallback;

            document.head.appendChild(scriptElement);
        }
    }

    static #scriptCallback() {
        if(++LibBuilder.#loadedScripts_ >= LibBuilder.#scripts_.length) {
            LibBuilder.#loadedScripts_ = 0;

            Resources.init(false);
            LibBuilder.#buildResources();
        }
    }

    static #buildResources() {
        for(const resource of LibBuilder.#resources_) {
            var scriptElement = document.createElement("script");
            scriptElement.src = "resources/" + resource;
            scriptElement.type = "text/javascript";

            scriptElement.onload = LibBuilder.#resourceCallback;

            document.head.appendChild(scriptElement);
        }
    }

    static #resourceCallback() {
        if(++LibBuilder.#loadedResources_ >= LibBuilder.#resources_.length) {
            LibBuilder.#loadedResources_ = 0;

            if(LibBuilder.#callback_ != null)
                LibBuilder.#callback_();

            LibBuilder.#callback_ = null;
        }
    }
}