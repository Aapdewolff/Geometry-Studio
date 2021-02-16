Resources.parseShader({
    name: "Assets/fragment.shader",
    type: "Shader",
    data: {
        shaderType: "Fragment",
        src:
        "// Calculation precision: LOW_PRECISION, MEDIUM_PRECISION or HIGH_PRECISION" + "\n" +
        "#define LOW_PRECISION" + "\n" +
        "// Maximum amount of lights" + "\n" +
        "const int DIRECTIONAL_LIGHTS = 5;" + "\n" +
        "const int POINT_LIGHTS = 20;" + "\n" +
        "" + "\n" +
        "#ifdef GL_FRAGMENT_PRECISION_HIGH" + "\n" +
        "precision highp float;" + "\n" +
        "#else" + "\n" +
        "precision mediump float;" + "\n" +
        "#endif" + "\n" +
        "" + "\n" +
        "struct DirLight {" + "\n" +
        "    vec3 direction;" + "\n" +
        "" + "\n" +
        "    vec3 diffuse;" + "\n" +
        "    vec3 specular;" + "\n" +
        "};" + "\n" +
        "" + "\n" +
        "struct PointLight {" + "\n" +
        "    vec3 position;" + "\n" +
        "" + "\n" +
        "    vec3 diffuse;" + "\n" +
        "    vec3 specular;" + "\n" +
        "};" + "\n" +
        "" + "\n" +
        "struct Material {" + "\n" +
        "   // PBR properties" + "\n" +
        "   float shininess;" + "\n" +
        "" + "\n" +
        "   // Custom properties" + "\n" +
        "   vec4 color;" + "\n" +
        "   sampler2D diffuse;" + "\n" +
        "};" + "\n" +
        "uniform Material uMaterial;" + "\n" +
        "" + "\n" +
        "uniform vec3 uAmbientColor;" + "\n" +
        "uniform DirLight uDirLights[DIRECTIONAL_LIGHTS];" + "\n" +
        "uniform PointLight uPointLights[POINT_LIGHTS];" + "\n" +
        "" + "\n" +
        "uniform vec3 uViewPos;" + "\n" +
        "" + "\n" +
        "varying vec2 vTextureCoord;" + "\n" +
        "varying vec3 vNormal;" + "\n" +
        "varying vec3 vFragPos;" + "\n" +
        "" + "\n" +
        "vec3 CalcDirLight(DirLight light, vec3 normal, vec3 viewDir)" + "\n" +
        "{" + "\n" +
        "    vec3 lightDir = normalize(-light.direction);" + "\n" +
        "" + "\n" +
        "    float diff = max(dot(normal, lightDir), 0.0);" + "\n" +
        "" + "\n" +
        "    vec3 reflectDir = reflect(-lightDir, normal);" + "\n" +
        "    float spec = pow(max(dot(viewDir, reflectDir), 0.0), uMaterial.shininess);" + "\n" +
        "" + "\n" +
        "    vec3 diffuse = light.diffuse * vec3(uMaterial.color) * diff * vec3(texture2D(uMaterial.diffuse, vTextureCoord));" + "\n" +
        "    vec3 specular = light.specular * spec * vec3(texture2D(uMaterial.diffuse, vTextureCoord));" + "\n" +
        "    return (diffuse + specular);" + "\n" +
        "}" + "\n" +
        "" + "\n" +
        "vec3 CalcPointLight(PointLight light, vec3 normal, vec3 viewDir)" + "\n" +
        "{" + "\n" +
        "    vec3 lightDir = normalize(light.position - vFragPos);" + "\n" +
        "" + "\n" +
        "    float diff = max(dot(normal, lightDir), 0.0);" + "\n" +
        "" + "\n" +
        "    vec3 reflectDir = reflect(-lightDir, normal);" + "\n" +
        "    float spec = pow(max(dot(viewDir, reflectDir), 0.0), uMaterial.shininess);" + "\n" +
        "" + "\n" +
        "    float intensity = 5.0 / length(light.position - vFragPos);" + "\n" +
        "    vec3 diffuse = intensity * light.diffuse * vec3(uMaterial.color) * diff * vec3(texture2D(uMaterial.diffuse, vTextureCoord));" + "\n" +
        "    vec3 specular = intensity * light.specular * spec * vec3(texture2D(uMaterial.diffuse, vTextureCoord));" + "\n" +
        "    return (diffuse + specular);" + "\n" +
        "}" + "\n" +
        "" + "\n" +
        "void main() {" + "\n" +
        "   vec3 normal = normalize(vNormal);"+ "\n" +
        "   vec3 viewDir = normalize(uViewPos - vFragPos);" + "\n" +
        "" + "\n" +
        "   vec3 result = vec3(0.0);" + "\n" +
        "   for(int i = 0; i < DIRECTIONAL_LIGHTS; i++)" + "\n" +
        "       if(uDirLights[i].diffuse != vec3(0.0)) result += CalcDirLight(uDirLights[i], normal, viewDir);" + "\n" +
        "   for(int i = 0; i < POINT_LIGHTS; i++)" + "\n" +
        "       if(uPointLights[i].diffuse != vec3(0.0)) result += CalcPointLight(uPointLights[i], normal, viewDir);" + "\n" +
        "   result += uAmbientColor * vec3(uMaterial.color) * vec3(texture2D(uMaterial.diffuse, vTextureCoord));" + "\n" +
        "   gl_FragColor = vec4(result, 1.0);" + "\n" +
        "}"
    }
});