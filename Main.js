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

    const vertices = [
        new Vector3(-1.0, -1.0,  1.0),
        new Vector3( 1.0, -1.0,  1.0),
        new Vector3( 1.0,  1.0,  1.0),
        new Vector3(-1.0,  1.0,  1.0),

        new Vector3(-1.0, -1.0, -1.0),
        new Vector3(-1.0,  1.0, -1.0),
        new Vector3( 1.0,  1.0, -1.0),
        new Vector3( 1.0, -1.0, -1.0),

        new Vector3(-1.0,  1.0, -1.0),
        new Vector3(-1.0,  1.0,  1.0),
        new Vector3( 1.0,  1.0,  1.0),
        new Vector3( 1.0,  1.0, -1.0),

        new Vector3(-1.0, -1.0, -1.0),
        new Vector3( 1.0, -1.0, -1.0),
        new Vector3( 1.0, -1.0,  1.0),
        new Vector3(-1.0, -1.0,  1.0),

        new Vector3( 1.0, -1.0, -1.0),
        new Vector3( 1.0,  1.0, -1.0),
        new Vector3( 1.0,  1.0,  1.0),
        new Vector3( 1.0, -1.0,  1.0),

        new Vector3(-1.0, -1.0, -1.0),
        new Vector3(-1.0, -1.0,  1.0),
        new Vector3(-1.0,  1.0,  1.0),
        new Vector3(-1.0,  1.0, -1.0)
    ];

    const indices = [
        0,  1,  2,      0,  2,  3,
        4,  5,  6,      4,  6,  7,
        8,  9,  10,     8,  10, 11,
        12, 13, 14,     12, 14, 15,
        16, 17, 18,     16, 18, 19,
        20, 21, 22,     20, 22, 23,
    ];

    const uvs = [
        new Vector2(0.0,  0.0),
        new Vector2(1.0,  0.0),
        new Vector2(1.0,  1.0),
        new Vector2(0.0,  1.0),
        new Vector2(0.0,  0.0),
        new Vector2(1.0,  0.0),
        new Vector2(1.0,  1.0),
        new Vector2(0.0,  1.0),
        new Vector2(0.0,  0.0),
        new Vector2(1.0,  0.0),
        new Vector2(1.0,  1.0),
        new Vector2(0.0,  1.0),
        new Vector2(0.0,  0.0),
        new Vector2(1.0,  0.0),
        new Vector2(1.0,  1.0),
        new Vector2(0.0,  1.0),
        new Vector2(0.0,  0.0),
        new Vector2(1.0,  0.0),
        new Vector2(1.0,  1.0),
        new Vector2(0.0,  1.0),
        new Vector2(0.0,  0.0),
        new Vector2(1.0,  0.0),
        new Vector2(1.0,  1.0),
        new Vector2(0.0,  1.0)
    ];

    const normals = [
        new Vector3(0.0,  0.0,  1.0),
        new Vector3(0.0,  0.0,  1.0),
        new Vector3(0.0,  0.0,  1.0),
        new Vector3(0.0,  0.0,  1.0),

        new Vector3(0.0,  0.0, -1.0),
        new Vector3(0.0,  0.0, -1.0),
        new Vector3(0.0,  0.0, -1.0),
        new Vector3(0.0,  0.0, -1.0),

        new Vector3(0.0,  1.0,  0.0),
        new Vector3(0.0,  1.0,  0.0),
        new Vector3(0.0,  1.0,  0.0),
        new Vector3(0.0,  1.0,  0.0),

        new Vector3(0.0, -1.0,  0.0),
        new Vector3(0.0, -1.0,  0.0),
        new Vector3(0.0, -1.0,  0.0),
        new Vector3(0.0, -1.0,  0.0),
        
        new Vector3(1.0,  0.0,  0.0),
        new Vector3(1.0,  0.0,  0.0),
        new Vector3(1.0,  0.0,  0.0),
        new Vector3(1.0,  0.0,  0.0),
    
        new Vector3(-1.0,  0.0,  0.0),
        new Vector3(-1.0,  0.0,  0.0),
        new Vector3(-1.0,  0.0,  0.0),
        new Vector3(-1.0,  0.0,  0.0)
    ];
    var mesh = new Mesh(vertices, indices, uvs, normals);
    
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
    var cam = camera.addComponent(Camera);
    camera.addComponent(CameraMovement);

    GameLoop.init();
}