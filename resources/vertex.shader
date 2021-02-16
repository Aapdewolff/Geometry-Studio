Resources.parseShader({
    name: "Assets/vertex.shader",
    type: "Shader",
    data: {
        shaderType: "Vertex",
        src:
        "attribute vec4 aVertexPosition;" + "\n" +
        "attribute vec3 aVertexNormal;" + "\n" +
        "attribute vec2 aTextureCoord;" + "\n" +
        "" + "\n" +
        "uniform mat4 uProjectionMatrix;" + "\n" +
        "" + "\n" +
        "varying vec2 vTextureCoord;" + "\n" +
        "varying vec3 vNormal;" + "\n" +
        "varying vec3 vFragPos;" + "\n" +
        "" + "\n" +
        "void main() {" + "\n" +
        "   gl_Position = uProjectionMatrix * aVertexPosition;" + "\n" +
        "" + "\n" +
        "   vTextureCoord = aTextureCoord;" + "\n" +
        "   vNormal = aVertexNormal;" + "\n" +
        "   vFragPos = vec3(aVertexPosition);" + "\n" +
        "}" + "\n"
    }
});