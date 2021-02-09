window.onload = function() {
    LibBuilder.build(function() {
        Logger.init(true);

        Canvas.init();
        Renderer.init();

        var vertShader = new Shader("Assets/fragment.shader");

        console.log(Matrix4.identity().toString());
        console.log(Resources.getShader("Assets/fragment.shader").data.src);
    });
}