class Matrix4 {
    #elements_;
    #onChange_;

    constructor() {
        this.#elements_ = [];
        this.#onChange_ = null;

        for(var i = 0; i < 16; i++) {
            this.#elements_.push(0);
        }
    }

    /**
     * Get matrix elements as an array
     */
    get elements() { return this.#elements_; }
    set elements(value) {
        if(!(Array.isArray(value) && value.length == 16)) {
            console.error("Matrix4 elements should be an array with a length of 16!");
            return;
        }

        this.#elements_ = value;
    }

    get elementsf32() { return new Float32Array(this.#elements_); }

    /**
     * Callback called when the matrix elements change
     */
    get onChange() { return this.#onChange_; }
    set onChange(value) {
        if(!Type.isFunction(value)) {
            console.error("Matrix4 onChange must be a function!");
            return;
        }

        this.#onChange_ = value;
    }

    #validateChange() {
        if(this.#onChange_ != null) 
            this.#onChange_();
    }

    /**
     * Returns a string representing this matrix its elements
     */
    toString() {
        return "Matrix4 \n" +
        this.#elements_[0] + ", " + this.#elements_[1] + ", " + this.#elements_[2] + ", " + this.#elements_[3] + "\n" +
        this.#elements_[4] + ", " + this.#elements_[5] + ", " + this.#elements_[6] + ", " + this.#elements_[7] + "\n" +
        this.#elements_[8] + ", " + this.#elements_[9] + ", " + this.#elements_[10] + ", " + this.#elements_[11] + "\n" +
        this.#elements_[12] + ", " + this.#elements_[13] + ", " + this.#elements_[14] + ", " + this.#elements_[15] + "\n";
    }

    /**
     * Returns true if this matrix its elements match with the given matrix
     * @param {Matrix4} mat4 matrix to compare with
     */
    equals(mat4) {
        if(!Type.isInstance(mat4, Matrix4)) {
            console.error("Matrix4 equals mat4 must be a Matrix4!");
            return;
        }

        var match = true;

        for(var i = 0; i < 16; i++) {
            if(this.#elements_[i] != mat4.elements[i])
                match = false;
        }

        return match;
    }

    /**
     * Set this matrix its elements to the given matrix
     * @param {Matrix4} mat4 matrix to copy
     */
    set(mat4) {
        if(!Type.isInstance(mat4, Matrix4)) {
            console.error("Matrix4 set mat4 must be a Matrix4!");
            return;
        }

        this.#elements_ = mat4.elements;

        this.#validateChange();

        return this;
    }

    /**
     * Multiply this matrix with given matrix
     * @param {Matrix4} mat4 matrix to multiply with
     */
    multiply(mat4) {
        if(!Type.isInstance(mat4, Matrix4)) {
            console.error("Matrix4 multiply mat4 must be a Matrix4!");
            return;
        }

		var result = new Matrix4();

		for (var y = 0; y < 4; y++)
		{
			for (var x = 0; x < 4; x++)
			{
				var sum = 0.0;
				for (var e = 0; e < 4; e++)
				{
					sum += this.#elements_[x + e * 4] * mat4.elements[e + y * 4];
				}
				result.elements[x + y * 4] = sum;
			}
		}

        this.set(result);

        return this;
    }

    /**
     * Returns an identity matrix with a diagonal of 1
     */
    static identity() {
        var mat4 = new Matrix4();

        mat4.elements[0] = 1;
		mat4.elements[5] = 1;
		mat4.elements[10] = 1;
		mat4.elements[15] = 1;
        
        return mat4;
    }

    /**
     * Returns an orthographics view matrix
     * @param {number} left left view boundry
     * @param {number} right right view boundry
     * @param {number} bottom bottom view boundry
     * @param {number} top top view boundry
     * @param {number} near minimum view distance
     * @param {number} far maximum view distance
     */
    static orthographic(left, right, bottom, top, near, far) {
        if(!Type.isNumber(left)) {
            console.error("Matrix4.orthographic left must be a number!");
            return null;
        }

        if(!Type.isNumber(right)) {
            console.error("Matrix4.orthographic right must be a number!");
            return null;
        }

        if(!Type.isNumber(bottom)) {
            console.error("Matrix4.orthographic bottom must be a number!");
            return null;
        }

        if(!Type.isNumber(top)) {
            console.error("Matrix4.orthographic top must be a number!");
            return null;
        }

        if(!Type.isNumber(near)) {
            console.error("Matrix4.orthographic near must be a number!");
            return null;
        }

        if(!Type.isNumber(far)) {
            console.error("Matrix4.orthographic far must be a number!");
            return null;
        }

        var result = Matrix4.identity();
        
        result.elements[0 + 0 * 4] = 2.0 / (right - left);
        result.elements[1 + 1 * 4] = 2.0 / (top - bottom);
        result.elements[2 + 2 * 4] = 2.0 / (near - far);

        result.elements[0 + 3 * 4] = (left + right) / (left - right);
        result.elements[1 + 3 * 4] = (bottom + top) / (bottom - top);
        result.elements[2 + 3 * 4] = (far + near) / (far - near);

        return result;
    }

    /**
     * Returns an perspective view matrix
     * @param {number} fov field of view of the matrix
     * @param {number} aspectRatio width height ratio
     * @param {number} near minimum view distance
     * @param {number} far maximum view distance
     */
    static perspective(fov, aspectRatio, near, far) {
        if(!Type.isNumber(fov)) {
            console.error("Matrix4.perspective fov must be a number!");
            return null;
        }

        if(!Type.isNumber(aspectRatio)) {
            console.error("Matrix4.perspective aspectRatio must be a number!");
            return null;
        }

        if(!Type.isNumber(near)) {
            console.error("Matrix4.perspective near must be a number!");
            return null;
        }

        if(!Type.isNumber(far)) {
            console.error("Matrix4.perspective far must be a number!");
            return null;
        }

        var result = Matrix4.identity();

        var q = 1.0 / Math.tan(Mathf.Deg2Rad(0.5 * fov));
        var a = q / aspectRatio;
        var b = (near + far) / (near - far);
        var c = (2.0 * near * far) / (near - far);

        result.elements[0 + 0 * 4] = a;
        result.elements[1 + 1 * 4] = q;
        result.elements[2 + 2 * 4] = b;
        result.elements[3 + 2 * 4] = -1.0;
        result.elements[2 + 3 * 4] = c;

        return result;
    }

    /**
     * Returns an translation matrix
     * @param {Vector3} translation vector to translate by
     */
    static translation(translation) {
        if(!Type.isInstance(translation, Vector3)) {
            console.error("Matrix4.translation translation must be a Vector3!");
            return null;
        }

        var result = Matrix4.identity();

        result.elements[0 + 3 * 4] = translation.x;
        result.elements[1 + 3 * 4] = translation.y;
        result.elements[2 + 3 * 4] = translation.z;

        return result;
    }

    /**
     * Returns an rotation matrix around a given axis
     * @param {number} angle angle in degrees to rotate by
     * @param {Vector3} axis axis to rotate around
     */
    static rotation(angle, axis) {
        if(!Type.isNumber(angle)) {
            console.error("Matrix4.rotation angle must be a number!");
            return null;
        }

        if(!Type.isInstance(axis, Vector3)) {
            console.error("Matrix4.rotation axis must be a Vector3!");
            return null;
        }

        var result = Matrix4.identity();

        var r = Mathf.Deg2Rad(angle);
        var c = Math.cos(r);
        var s = Math.sin(r);
        var omc = 1.0 - c;

        result.elements[0 + 0 * 4] = axis.x * omc + c;
        result.elements[1 + 0 * 4] = axis.y * axis.x * omc + axis.z * s;
        result.elements[2 + 0 * 4] = axis.z * axis.x * omc - axis.y * s;

        result.elements[0 + 1 * 4] = axis.x * axis.y * omc - axis.z * s;
        result.elements[1 + 1 * 4] = axis.y * omc + c;
        result.elements[2 + 1 * 4] = axis.y * axis.z * omc + axis.x * s;

        result.elements[0 + 2 * 4] = axis.x * axis.z * omc + axis.y * s;
        result.elements[1 + 2 * 4] = axis.y * axis.z * omc - axis.x * s;
        result.elements[2 + 2 * 4] = axis.z * omc + c;

        return result;
    }

    /**
     * Returns an scale matrix
     * @param {Vector3} scale vector to scale from
     */
    static scale(scale) {
        if(!Type.isInstance(scale, Vector3)) {
            console.error("Matrix4.scale scale must be a Vector3!");
            return null;
        }

        var result = Matrix4.identity();

        result.elements[0 + 0 * 4] = scale.x;
        result.elements[1 + 1 * 4] = scale.y;
        result.elements[2 + 2 * 4] = scale.z;

        return result;
    }
}