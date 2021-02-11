Resources.parseShader({
    name: "Assets/vertex.shader",
    type: "Shader",
    data: {
        shaderType: "Vertex",
        src:
        "attribute vec4 aVertexPosition;" + "\n" +
        "attribute vec2 aTextureCoord;" + "\n" +
        "" + "\n" +
        "uniform mat4 uModelViewMatrix;" + "\n" +
        "uniform mat4 uProjectionMatrix;" + "\n" +
        "" + "\n" +
        "varying highp vec2 vTextureCoord;" + "\n" +
        "" + "\n" +
        "void main() {" + "\n" +
        "   gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;" + "\n" +
        "   vTextureCoord = aTextureCoord;" + "\n" +
        "}" + "\n"
    }
});