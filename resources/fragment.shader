Resources.parseShader({
    name: "Assets/fragment.shader",
    type: "Shader",
    data: {
        shaderType: "Fragment",
        src:
        "varying highp vec2 vTextureCoord;" + "\n" +
        "uniform mediump vec4 color;" + "\n" +
        "uniform sampler2D mainTex;" + "\n" +
        "" + "\n" +
        "void main() {" + "\n" +
        "   gl_FragColor = color.rgba * texture2D(mainTex, vTextureCoord);" + "\n" +
        "}" + "\n"
    }
});