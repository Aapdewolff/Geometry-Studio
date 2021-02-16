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

        for(var i = 0; i < 16; i++) {
            this.#elements_[i] = mat4.elements[i];
        }

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
    static identity(mat4 = null) {
        if(!Type.isInstance(mat4, Matrix4) && mat4 != null) {
            console.error("Matrix4.identity mat4 must be a Matrix4 or null!");
            return null;
        }

        if(mat4 == null)
            mat4 = new Matrix4();

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
    static orthographic(left, right, bottom, top, near, far, mat4 = null) {
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

        if(!Type.isInstance(mat4, Matrix4) && mat4 != null) {
            console.error("Matrix4.orthographics mat4 must be a Matrix4 or null!");
            return null;
        }

        mat4 = Matrix4.identity(mat4);
        
        mat4.elements[0 + 0 * 4] = 2.0 / (right - left);
        mat4.elements[1 + 1 * 4] = 2.0 / (top - bottom);
        mat4.elements[2 + 2 * 4] = 2.0 / (near - far);

        mat4.elements[0 + 3 * 4] = (left + right) / (left - right);
        mat4.elements[1 + 3 * 4] = (bottom + top) / (bottom - top);
        mat4.elements[2 + 3 * 4] = (far + near) / (far - near);

        return mat4;
    }

    /**
     * Returns an perspective view matrix
     * @param {number} fov field of view of the matrix
     * @param {number} aspectRatio width height ratio
     * @param {number} near minimum view distance
     * @param {number} far maximum view distance
     */
    static perspective(fov, aspectRatio, near, far, mat4 = null) {
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

        if(!Type.isInstance(mat4, Matrix4) && mat4 != null) {
            console.error("Matrix4.perspective mat4 must be a Matrix4 or null!");
            return null;
        }

        mat4 = Matrix4.identity(mat4);

        var q = 1.0 / Math.tan(Mathf.Deg2Rad(0.5 * fov));
        var a = q / aspectRatio;
        var b = (near + far) / (near - far);
        var c = (2.0 * near * far) / (near - far);

        mat4.elements[0 + 0 * 4] = a;
        mat4.elements[1 + 1 * 4] = q;
        mat4.elements[2 + 2 * 4] = b;
        mat4.elements[3 + 2 * 4] = -1.0;
        mat4.elements[2 + 3 * 4] = c;

        return mat4;
    }

    /**
     * Returns an translation matrix
     * @param {Vector3} translation vector to translate by
     */
    static translation(translation, mat4 = null) {
        if(!Type.isInstance(translation, Vector3)) {
            console.error("Matrix4.translation translation must be a Vector3!");
            return null;
        }

        if(!Type.isInstance(mat4, Matrix4) && mat4 != null) {
            console.error("Matrix4.translation mat4 must be a Matrix4 or null!");
            return null;
        }

        mat4 = Matrix4.identity(mat4);

        mat4.elements[0 + 3 * 4] = translation.x;
        mat4.elements[1 + 3 * 4] = translation.y;
        mat4.elements[2 + 3 * 4] = translation.z;

        return mat4;
    }

    /**
     * Returns an rotation matrix around a given axis
     * @param {number} angle angle in degrees to rotate by
     * @param {Vector3} axis axis to rotate around
     */
    static rotation(angle, axis, mat4 = null) {
        if(!Type.isNumber(angle)) {
            console.error("Matrix4.rotation angle must be a number!");
            return null;
        }

        if(!Type.isInstance(axis, Vector3)) {
            console.error("Matrix4.rotation axis must be a Vector3!");
            return null;
        }

        if(!Type.isInstance(mat4, Matrix4) && mat4 != null) {
            console.error("Matrix4.rotation mat4 must be a Matrix4 or null!");
            return null;
        }

        mat4 = Matrix4.identity(mat4);

        var r = Mathf.Deg2Rad(angle);
        var c = Math.cos(r);
        var s = Math.sin(r);
        var omc = 1.0 - c;

        mat4.elements[0 + 0 * 4] = axis.x * omc + c;
        mat4.elements[1 + 0 * 4] = axis.y * axis.x * omc + axis.z * s;
        mat4.elements[2 + 0 * 4] = axis.z * axis.x * omc - axis.y * s;

        mat4.elements[0 + 1 * 4] = axis.x * axis.y * omc - axis.z * s;
        mat4.elements[1 + 1 * 4] = axis.y * omc + c;
        mat4.elements[2 + 1 * 4] = axis.y * axis.z * omc + axis.x * s;

        mat4.elements[0 + 2 * 4] = axis.x * axis.z * omc + axis.y * s;
        mat4.elements[1 + 2 * 4] = axis.y * axis.z * omc - axis.x * s;
        mat4.elements[2 + 2 * 4] = axis.z * omc + c;

        return mat4;
    }

    /**
     * Returns an scale matrix
     * @param {Vector3} scale vector to scale from
     */
    static scale(scale, mat4 = null) {
        if(!Type.isInstance(scale, Vector3)) {
            console.error("Matrix4.scale scale must be a Vector3!");
            return null;
        }

        if(!Type.isInstance(mat4, Matrix4) && mat4 != null) {
            console.error("Matrix4.scale mat4 must be a Matrix4 or null!");
            return null;
        }

        mat4 = Matrix4.identity(mat4);

        mat4.elements[0 + 0 * 4] = scale.x;
        mat4.elements[1 + 1 * 4] = scale.y;
        mat4.elements[2 + 2 * 4] = scale.z;

        return mat4;
    }

    static invert(mat4) {
        if(!Type.isInstance(mat4, Matrix4)) {
            console.error("Matrix4.invert mat4 must be a Matrix4!");
            return null;
        }

        /*var temp = [];
        temp[0] = mat4.elements[5] * mat4.elements[10] * mat4.elements[15] -
            mat4.elements[5] * mat4.elements[11] * mat4.elements[14] -
            mat4.elements[9] * mat4.elements[6] * mat4.elements[15] +
            mat4.elements[9] * mat4.elements[7] * mat4.elements[14] +
            mat4.elements[13] * mat4.elements[6] * mat4.elements[11] -
            mat4.elements[13] * mat4.elements[7] * mat4.elements[10];

        temp[4] = -mat4.elements[4] * mat4.elements[10] * mat4.elements[15] +
            mat4.elements[4] * mat4.elements[11] * mat4.elements[14] +
            mat4.elements[8] * mat4.elements[6] * mat4.elements[15] -
            mat4.elements[8] * mat4.elements[7] * mat4.elements[14] -
            mat4.elements[12] * mat4.elements[6] * mat4.elements[11] +
            mat4.elements[12] * mat4.elements[7] * mat4.elements[10];

        temp[8] = mat4.elements[4] * mat4.elements[9] * mat4.elements[15] -
            mat4.elements[4] * mat4.elements[11] * mat4.elements[13] -
            mat4.elements[8] * mat4.elements[5] * mat4.elements[15] +
            mat4.elements[8] * mat4.elements[7] * mat4.elements[13] +
            mat4.elements[12] * mat4.elements[5] * mat4.elements[11] -
            mat4.elements[12] * mat4.elements[7] * mat4.elements[9];

        temp[12] = -mat4.elements[4] * mat4.elements[9] * mat4.elements[14] +
            mat4.elements[4] * mat4.elements[10] * mat4.elements[13] +
            mat4.elements[8] * mat4.elements[5] * mat4.elements[14] -
            mat4.elements[8] * mat4.elements[6] * mat4.elements[13] -
            mat4.elements[12] * mat4.elements[5] * mat4.elements[10] +
            mat4.elements[12] * mat4.elements[6] * mat4.elements[9];

        temp[1] = -mat4.elements[1] * mat4.elements[10] * mat4.elements[15] +
            mat4.elements[1] * mat4.elements[11] * mat4.elements[14] +
            mat4.elements[9] * mat4.elements[2] * mat4.elements[15] -
            mat4.elements[9] * mat4.elements[3] * mat4.elements[14] -
            mat4.elements[13] * mat4.elements[2] * mat4.elements[11] +
            mat4.elements[13] * mat4.elements[3] * mat4.elements[10];

        temp[5] = mat4.elements[0] * mat4.elements[10] * mat4.elements[15] -
            mat4.elements[0] * mat4.elements[11] * mat4.elements[14] -
            mat4.elements[8] * mat4.elements[2] * mat4.elements[15] +
            mat4.elements[8] * mat4.elements[3] * mat4.elements[14] +
            mat4.elements[12] * mat4.elements[2] * mat4.elements[11] -
            mat4.elements[12] * mat4.elements[3] * mat4.elements[10];

        temp[9] = -mat4.elements[0] * mat4.elements[9] * mat4.elements[15] +
            mat4.elements[0] * mat4.elements[11] * mat4.elements[13] +
            mat4.elements[8] * mat4.elements[1] * mat4.elements[15] -
            mat4.elements[8] * mat4.elements[3] * mat4.elements[13] -
            mat4.elements[12] * mat4.elements[1] * mat4.elements[11] +
            mat4.elements[12] * mat4.elements[3] * mat4.elements[9];

        temp[13] = mat4.elements[0] * mat4.elements[9] * mat4.elements[14] -
            mat4.elements[0] * mat4.elements[10] * mat4.elements[13] -
            mat4.elements[8] * mat4.elements[1] * mat4.elements[14] +
            mat4.elements[8] * mat4.elements[2] * mat4.elements[13] +
            mat4.elements[12] * mat4.elements[1] * mat4.elements[10] -
            mat4.elements[12] * mat4.elements[2] * mat4.elements[9];

        temp[2] = mat4.elements[1] * mat4.elements[6] * mat4.elements[15] -
            mat4.elements[1] * mat4.elements[7] * mat4.elements[14] -
            mat4.elements[5] * mat4.elements[2] * mat4.elements[15] +
            mat4.elements[5] * mat4.elements[3] * mat4.elements[14] +
            mat4.elements[13] * mat4.elements[2] * mat4.elements[7] -
            mat4.elements[13] * mat4.elements[3] * mat4.elements[6];

        temp[6] = -mat4.elements[0] * mat4.elements[6] * mat4.elements[15] +
            mat4.elements[0] * mat4.elements[7] * mat4.elements[14] +
            mat4.elements[4] * mat4.elements[2] * mat4.elements[15] -
            mat4.elements[4] * mat4.elements[3] * mat4.elements[14] -
            mat4.elements[12] * mat4.elements[2] * mat4.elements[7] +
            mat4.elements[12] * mat4.elements[3] * mat4.elements[6];

        temp[10] = mat4.elements[0] * mat4.elements[5] * mat4.elements[15] -
            mat4.elements[0] * mat4.elements[7] * mat4.elements[13] -
            mat4.elements[4] * mat4.elements[1] * mat4.elements[15] +
            mat4.elements[4] * mat4.elements[3] * mat4.elements[13] +
            mat4.elements[12] * mat4.elements[1] * mat4.elements[7] -
            mat4.elements[12] * mat4.elements[3] * mat4.elements[5];

        temp[14] = -mat4.elements[0] * mat4.elements[5] * mat4.elements[14] +
            mat4.elements[0] * mat4.elements[6] * mat4.elements[13] +
            mat4.elements[4] * mat4.elements[1] * mat4.elements[14] -
            mat4.elements[4] * mat4.elements[2] * mat4.elements[13] -
            mat4.elements[12] * mat4.elements[1] * mat4.elements[6] +
            mat4.elements[12] * mat4.elements[2] * mat4.elements[5];

        temp[3] = -mat4.elements[1] * mat4.elements[6] * mat4.elements[11] +
            mat4.elements[1] * mat4.elements[7] * mat4.elements[10] +
            mat4.elements[5] * mat4.elements[2] * mat4.elements[11] -
            mat4.elements[5] * mat4.elements[3] * mat4.elements[10] -
            mat4.elements[9] * mat4.elements[2] * mat4.elements[7] +
            mat4.elements[9] * mat4.elements[3] * mat4.elements[6];

        temp[7] = mat4.elements[0] * mat4.elements[6] * mat4.elements[11] -
            mat4.elements[0] * mat4.elements[7] * mat4.elements[10] -
            mat4.elements[4] * mat4.elements[2] * mat4.elements[11] +
            mat4.elements[4] * mat4.elements[3] * mat4.elements[10] +
            mat4.elements[8] * mat4.elements[2] * mat4.elements[7] -
            mat4.elements[8] * mat4.elements[3] * mat4.elements[6];

        temp[11] = -mat4.elements[0] * mat4.elements[5] * mat4.elements[11] +
            mat4.elements[0] * mat4.elements[7] * mat4.elements[9] +
            mat4.elements[4] * mat4.elements[1] * mat4.elements[11] -
            mat4.elements[4] * mat4.elements[3] * mat4.elements[9] -
            mat4.elements[8] * mat4.elements[1] * mat4.elements[7] +
            mat4.elements[8] * mat4.elements[3] * mat4.elements[5];

        temp[15] = mat4.elements[0] * mat4.elements[5] * mat4.elements[10] -
            mat4.elements[0] * mat4.elements[6] * mat4.elements[9] -
            mat4.elements[4] * mat4.elements[1] * mat4.elements[10] +
            mat4.elements[4] * mat4.elements[2] * mat4.elements[9] +
            mat4.elements[8] * mat4.elements[1] * mat4.elements[6] -
            mat4.elements[8] * mat4.elements[2] * mat4.elements[5];

        var determinant = mat4.elements[0] * temp[0] + mat4.elements[1] * temp[4] + mat4.elements[2] * temp[8] + mat4.elements[3] * temp[12];
        determinant = 1.0 / determinant;

        for (var i = 0; i < 16; i++)
            mat4.elements[i] = temp[i] * determinant;*/

        var a00 = mat4.elements[0], a01 = mat4.elements[1], a02 = mat4.elements[2], a03 = mat4.elements[3];
        var a10 = mat4.elements[4], a11 = mat4.elements[5], a12 = mat4.elements[6], a13 = mat4.elements[7];
        var a20 = mat4.elements[8], a21 = mat4.elements[9], a22 = mat4.elements[10], a23 = mat4.elements[11];
        var a30 = mat4.elements[12], a31 = mat4.elements[13], a32 = mat4.elements[14], a33 = mat4.elements[15];
        var b00 = a00 * a11 - a01 * a10;
        var b01 = a00 * a12 - a02 * a10;
        var b02 = a00 * a13 - a03 * a10;
        var b03 = a01 * a12 - a02 * a11;
        var b04 = a01 * a13 - a03 * a11;
        var b05 = a02 * a13 - a03 * a12;
        var b06 = a20 * a31 - a21 * a30;
        var b07 = a20 * a32 - a22 * a30;
        var b08 = a20 * a33 - a23 * a30;
        var b09 = a21 * a32 - a22 * a31;
        var b10 = a21 * a33 - a23 * a31;
        var b11 = a22 * a33 - a23 * a32;
        var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    
        if (!det)
          return null;
    
        det = 1.0 / det;
        mat4.elements[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
        mat4.elements[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
        mat4.elements[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
        mat4.elements[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
        mat4.elements[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
        mat4.elements[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
        mat4.elements[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
        mat4.elements[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
        mat4.elements[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
        mat4.elements[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
        mat4.elements[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
        mat4.elements[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
        mat4.elements[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
        mat4.elements[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
        mat4.elements[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
        mat4.elements[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

        return mat4;
    }

    static transpose(mat4) {
        if(!Type.isInstance(mat4, Matrix4)) {
            console.error("Matrix4.transpose mat4 must be a Matrix4!");
            return null;
        }

        /*var elements = [];
        for(var x = 0; x < 4; x++) {
            for(var y = 0; y < 4; y++) {
                elements[x + y * 4] = mat4.elements[y + x * 4];
            }
        }

        mat4.elements = elements;*/

        var a01 = mat4.elements[1], a02 = mat4.elements[2], a03 = mat4.elements[3];
        var a12 = mat4.elements[6], a13 = mat4.elements[7];
        var a23 = mat4.elements[11];

        mat4.elements[1] = mat4.elements[4];
        mat4.elements[2] = mat4.elements[8];
        mat4.elements[3] = mat4.elements[12];
        mat4.elements[4] = a01;
        mat4.elements[6] = mat4.elements[9];
        mat4.elements[7] = mat4.elements[13];
        mat4.elements[8] = a02;
        mat4.elements[9] = a12;
        mat4.elements[11] = mat4.elements[14];
        mat4.elements[12] = a03;
        mat4.elements[13] = a13;
        mat4.elements[14] = a23;
        return mat4;
    }
}