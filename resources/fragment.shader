Resources.parseShader({
    name: "Assets/fragment.shader",
    type: "Shader",
    data: {
        shaderType: "Fragment",
        src:
        "uniform mediump vec4 color;" + "\n" +
        "" + "\n" +
        "void main() {" + "\n" +
        "   gl_FragColor = vec4(color.r, color.g, color.b, color.a);" + "\n" +
        "}" + "\n"
    }
});