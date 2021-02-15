window.onload = function() {
    LibBuilder.build(function() {
        Application.init(true);

        var vertShader = new Shader("Assets/vertex.shader");
        var fragShader = new Shader("Assets/fragment.shader");

        var shaderProgram = new ShaderProgram(vertShader, fragShader);

        var texture = new Texture("resources/crate.png", TextureFormat.RGBA, TextureFiltering.LINEAR);
        var material = new Material(shaderProgram, {
            color: Color.white,
            mainTex: texture
        });

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
        var mesh = new Mesh(vertices, indices, uvs);

        for(var x = -12; x <= 12; x += 2) {
            for(var y = -6; y <= 6; y += 2) {
                var actor = new Actor(new Vector3(x, y, -10), new Vector3(0, 0, 0), Vector3.one.multiplyByNumber(0.5));
                var meshRenderer = actor.addComponent(MeshRenderer);
                meshRenderer.mesh = mesh;
                meshRenderer.material = material;
            }
        }      

        GameLoop.init();
    });
}