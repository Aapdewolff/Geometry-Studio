window.onload = function() {
    Start();
}

async function Start() {
    await Application.init(true);

    Scene.ambientColor = new Color(.2, .2, .2);

    var vertShader = new Shader("default_vertex");
    var fragShader = new Shader("default_fragment");

    var shaderProgram = new ShaderProgram(vertShader, fragShader);

    var texture = new Texture("resources/crate.png", TextureFormat.RGBA, TextureFiltering.LINEAR);

    var mesh = Primitives.Cube(new Vector3(1, 1, 0), Vector3.zero, new Vector3(1, 0.5, 1));
    
    for(var x = -12; x <= 12; x += 2) {
        for(var y = -6; y <= 6; y += 2) {
            var material = new Material(shaderProgram, {
                shininess: 1,
                color: Color.random,
                diffuse: texture
            });

            var actor = new Actor(new Vector3(x, y, -10), new Vector3(0, 0, 0), Vector3.one.multiplyByNumber(0.5));
            var meshRenderer = actor.addComponent(MeshRenderer);
            meshRenderer.mesh = mesh;
            meshRenderer.material = material;

            actor.addComponent(CubeRotator);
        }
    }

    var sun = new Actor(new Vector3(0, 0, -10), new Vector3(-50, 30, 0));
    sun.addComponent(Light);
    var light = sun.getComponent(Light);
    light.color = new Color(1, 1, .9);
    light.type = LightType.DIRECTIONAL;

    var camera = new Actor(new Vector3(0, 0, -30), new Vector3(0, 180, 0));
    camera.addComponent(Camera);
    camera.addComponent(CameraMovement);

    GameLoop.init();
}