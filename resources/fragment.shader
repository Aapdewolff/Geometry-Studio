Resources.parseShader({
    name: "Assets/fragment.shader",
    type: "Shader",
    data: {
        shaderType: "Fragment",
        src:
        "void main() {" + "\n" +
        "   gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);" + "\n" +
        "}" + "\n"
    }
});