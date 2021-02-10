window.onload = function() {
    LibBuilder.build(function() {
        Application.init(true);

        var vertShader = new Shader("Assets/vertex.shader");
        var fragShader = new Shader("Assets/fragment.shader");

        var shaderProgram = new ShaderProgram(vertShader, fragShader);

        var material = new Material(shaderProgram, {
            color: Color.teal,
        });

        const vertices = [
            new Vector3(-1.0, 1.0, 0.0),
            new Vector3(1.0, 1.0, 0.0),
            new Vector3(-1.0, -1.0, 0.0),
            new Vector3(1.0, -1.0, 0.0)
        ];
        var mesh = new Mesh(vertices);

        var actor = new Actor(new Vector3(0, 0, -5), new Vector3(0, 0, 0), Vector3.one.multiplyByNumber(1.5));
        var meshRenderer = actor.addComponent(MeshRenderer);
        meshRenderer.mesh = mesh;
        meshRenderer.material = material;

        var actor2 = new Actor(new Vector3(3, 0, -5), new Vector3(0, 0, 0), Vector3.one);
        var meshRenderer2 = actor2.addComponent(MeshRenderer);
        meshRenderer2.mesh = mesh;
        meshRenderer2.material = material;

        GameLoop.init();
    });
}