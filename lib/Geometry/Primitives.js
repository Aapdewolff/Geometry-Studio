class Primitives {
    static Cube(position = Vector3.zero, rotation = Vector3.zero, scale = Vector3.one) {
        if(!Type.isInstance(position, Vector3)) {
            console.error("Primitives.Cube position must be a Vector3!");
            return null;
        }

        if(!Type.isInstance(rotation, Vector3)) {
            console.error("Primitives.Cube rotation must be a Vector3!");
            return null;
        }

        if(!Type.isInstance(scale, Vector3)) {
            console.error("Primitives.Cube scale must be a Vector3!");
            return null;
        }

        const vertices = [
            new Vector3(-1.0, -1.0,  1.0),
            new Vector3( 1.0, -1.0,  1.0),
            new Vector3( 1.0,  1.0,  1.0),
            new Vector3(-1.0,  1.0,  1.0),
    
            new Vector3(-1.0, -1.0, -1.0),
            new Vector3(-1.0,  1.0, -1.0),
            new Vector3( 1.0,  1.0, -1.0),
            new Vector3( 1.0, -1.0, -1.0),
    
            new Vector3(-1.0,  1.0, -1.0),
            new Vector3(-1.0,  1.0,  1.0),
            new Vector3( 1.0,  1.0,  1.0),
            new Vector3( 1.0,  1.0, -1.0),
    
            new Vector3(-1.0, -1.0, -1.0),
            new Vector3( 1.0, -1.0, -1.0),
            new Vector3( 1.0, -1.0,  1.0),
            new Vector3(-1.0, -1.0,  1.0),
    
            new Vector3( 1.0, -1.0, -1.0),
            new Vector3( 1.0,  1.0, -1.0),
            new Vector3( 1.0,  1.0,  1.0),
            new Vector3( 1.0, -1.0,  1.0),
    
            new Vector3(-1.0, -1.0, -1.0),
            new Vector3(-1.0, -1.0,  1.0),
            new Vector3(-1.0,  1.0,  1.0),
            new Vector3(-1.0,  1.0, -1.0)
        ];

        const indices = [
            0,  1,  2,      0,  2,  3,
            4,  5,  6,      4,  6,  7,
            8,  9,  10,     8,  10, 11,
            12, 13, 14,     12, 14, 15,
            16, 17, 18,     16, 18, 19,
            20, 21, 22,     20, 22, 23,
        ];
    
        const uvs = [
            new Vector2(0.0,  0.0),
            new Vector2(1.0,  0.0),
            new Vector2(1.0,  1.0),
            new Vector2(0.0,  1.0),
            new Vector2(0.0,  0.0),
            new Vector2(1.0,  0.0),
            new Vector2(1.0,  1.0),
            new Vector2(0.0,  1.0),
            new Vector2(0.0,  0.0),
            new Vector2(1.0,  0.0),
            new Vector2(1.0,  1.0),
            new Vector2(0.0,  1.0),
            new Vector2(0.0,  0.0),
            new Vector2(1.0,  0.0),
            new Vector2(1.0,  1.0),
            new Vector2(0.0,  1.0),
            new Vector2(0.0,  0.0),
            new Vector2(1.0,  0.0),
            new Vector2(1.0,  1.0),
            new Vector2(0.0,  1.0),
            new Vector2(0.0,  0.0),
            new Vector2(1.0,  0.0),
            new Vector2(1.0,  1.0),
            new Vector2(0.0,  1.0)
        ];

        const mesh = new Mesh(vertices, indices, uvs);

        const usersMesh = Modifiers.selected;
        Modifiers.select(mesh);
        Modifiers.scale(scale);
        Modifiers.translate(position);
        Modifiers.calculateNormals();
        Modifiers.select(usersMesh);
        
        return mesh;
    }

    static Sphere(position = Vector3.zero, rotation = Vector3.zero, scale = Vector3.one) {
        if(!Type.isInstance(position, Vector3)) {
            console.error("Primitives.Sphere position must be a Vector3!");
            return null;
        }

        if(!Type.isInstance(rotation, Vector3)) {
            console.error("Primitives.Sphere rotation must be a Vector3!");
            return null;
        }

        if(!Type.isInstance(scale, Vector3)) {
            console.error("Primitives.Sphere scale must be a Vector3!");
            return null;
        }

        /*const horizontal = 20;
        const vertical = 20;

        const vertices = [];
        for(var h = 0; h < horizontal; h++) {
            for(var v = 0; v < vertical; v++) {
                vertices.push(new Vector3(Math.sin(Math.PI * h/horizontal) * Math.cos(2 * Math.PI * v/vertical), Math.sin(Math.PI * h/horizontal) * Math.sin(2 * Math.PI * v/vertical), Math.cos(Math.PI * h/horizontal)));
            }
        }*/
    }
}