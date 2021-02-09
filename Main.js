window.onload = function() {
    LibBuilder.build(function() {
        Application.init(true);

        var vertShader = new Shader("Assets/vertex.shader");
        var fragShader = new Shader("Assets/fragment.shader");

        var shaderProgram = new ShaderProgram(vertShader, fragShader);

        var material = new Material(shaderProgram);

        const vertices = [
            new Vector3(-1.0, 1.0, -3.0),
            new Vector3(1.0, 1.0, -3.0),
            new Vector3(-1.0, -1.0, -3.0),
            new Vector3(1.0, -1.0, -3.0)
        ];
        var mesh = new Mesh(vertices);

        Renderer.submit(mesh, material);

        Canvas.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        Canvas.gl.clearDepth(1.0);
        Canvas.gl.enable(Canvas.gl.DEPTH_TEST);
        Canvas.gl.depthFunc(Canvas.gl.LEQUAL);
        Canvas.gl.clear(Canvas.gl.COLOR_BUFFER_BIT | Canvas.gl.DEPTH_BUFFER_BIT);
        
        Renderer.flush();
    });
}