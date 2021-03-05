class Shaders {
    static #shaders_ = {};

    static addShader(name, type, src) {
        Shaders.#shaders_[name] = {
            type: type,
            src: src
        };
    }

    static getShader(name) {
        if(!Type.isString(name)) {
            console.error("Shaders.getShader name must be a string!")
            return;
        }

        return Shaders.#shaders_[name];
    }
}

Shaders.addShader("default_vertex", ShaderType.vertex, `
    attribute vec4 aVertexPosition;   
    attribute vec3 aVertexNormal;   
    attribute vec2 aTextureCoord;   
       
    uniform mat4 uProjectionMatrix;   
       
    varying vec2 vTextureCoord;   
    varying vec3 vNormal;   
    varying vec3 vFragPos;   
       
    void main() {   
        gl_Position = uProjectionMatrix * aVertexPosition;   
        
        vTextureCoord = aTextureCoord;   
        vNormal = aVertexNormal;   
        vFragPos = vec3(aVertexPosition);   
    }  
`);

Shaders.addShader("default_fragment", ShaderType.fragment, `
    // Calculation precision: LOW_PRECISION, MEDIUM_PRECISION or HIGH_PRECISION   
    #define LOW_PRECISION   
    // Maximum amount of lights   
    const int DIRECTIONAL_LIGHTS = 5;   
    const int POINT_LIGHTS = 20;   
    
    #ifdef GL_FRAGMENT_PRECISION_HIGH   
    precision highp float;   
    #else   
    precision mediump float;    
    #endif   
    
    struct DirLight {   
        vec3 direction;   
    
        vec3 diffuse;   
        vec3 specular;   
    };   
    
    struct PointLight {   
        vec3 position;   
    
        vec3 diffuse;   
        vec3 specular;   
    };   
    
    struct Material {   
        // PBR properties   
        float shininess;   
    
        // Custom properties   
        vec4 color;   
        sampler2D diffuse;   
    };   
    uniform Material uMaterial;   
    
    uniform vec3 uAmbientColor;   
    uniform DirLight uDirLights[DIRECTIONAL_LIGHTS];   
    uniform PointLight uPointLights[POINT_LIGHTS];   
    
    uniform vec3 uViewPos;   
    
    varying vec2 vTextureCoord;   
    varying vec3 vNormal;   
    varying vec3 vFragPos;   
    
    vec3 CalcDirLight(DirLight light, vec3 normal, vec3 viewDir)   
    {   
        vec3 lightDir = normalize(-light.direction);   
    
        float diff = max(dot(normal, lightDir), 0.0);   
    
        vec3 reflectDir = reflect(-lightDir, normal);   
        float spec = pow(max(dot(viewDir, reflectDir), 0.0), uMaterial.shininess);   
    
        vec3 diffuse = light.diffuse * vec3(uMaterial.color) * diff * vec3(texture2D(uMaterial.diffuse, vTextureCoord));   
        vec3 specular = light.specular * spec * vec3(texture2D(uMaterial.diffuse, vTextureCoord));   
        return (diffuse + specular);   
    }   
    
    vec3 CalcPointLight(PointLight light, vec3 normal, vec3 viewDir)   
    {   
        vec3 lightDir = normalize(light.position - vFragPos);   
    
        float diff = max(dot(normal, lightDir), 0.0);   
    
        vec3 reflectDir = reflect(-lightDir, normal);   
        float spec = pow(max(dot(viewDir, reflectDir), 0.0), uMaterial.shininess);   
    
        float intensity = 5.0 / length(light.position - vFragPos);   
        vec3 diffuse = intensity * light.diffuse * vec3(uMaterial.color) * diff * vec3(texture2D(uMaterial.diffuse, vTextureCoord));   
        vec3 specular = intensity * light.specular * spec * vec3(texture2D(uMaterial.diffuse, vTextureCoord));   
        return (diffuse + specular);   
    }   
    
    void main() {   
        vec3 normal = normalize(vNormal);  
        vec3 viewDir = normalize(uViewPos - vFragPos);   
    
        vec3 result = vec3(0.0);

        for(int i = 0; i < DIRECTIONAL_LIGHTS; i++)   
            if(uDirLights[i].diffuse != vec3(0.0)) result = CalcDirLight(uDirLights[i], normal, viewDir);   
        for(int i = 0; i < POINT_LIGHTS; i++)   
            if(uPointLights[i].diffuse != vec3(0.0)) result = CalcPointLight(uPointLights[i], normal, viewDir);
        
        result += uAmbientColor * vec3(uMaterial.color) * vec3(texture2D(uMaterial.diffuse, vTextureCoord));

        gl_FragColor = vec4(result, 1.0);   
    }
`);