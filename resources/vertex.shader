Resources.parseShader({
    name: "Assets/vertex.shader",
    type: "Shader",
    data: {
        shaderType: "Vertex",
        src:
        "attribute vec4 aVertexPosition;" + "\n" +
        "" + "\n" +
        "uniform mat4 uModelViewMatrix;" + "\n" +
        "uniform mat4 uProjectionMatrix;" + "\n" +
        "" + "\n" +
        "void main() {" + "\n" +
        "   gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;" + "\n" +
        "}" + "\n"
    }
});