class Vector3 {
    #x_;
    #y_;
    #z_;
    #onChange_;

    /**
     * Creates a new Vector3
     * @param {number} x x component
     * @param {number} y y component
     * @param {number} z z component
     */
    constructor(x = 0, y = 0, z = 0) {
        if(!Type.isNumber(x)) {
            console.error("Vector3 constructor x must be a number!")
            return null;
        }

        if(!Type.isNumber(y)) {
            console.error("Vector3 constructor y must be a number!")
            return null;
        }

        if(!Type.isNumber(z)) {
            console.error("Vector3 constructor z must be a number!")
            return null;
        }

        this.#x_ = x;
        this.#y_ = y;
        this.#z_ = z;
        this.#onChange_ = null;
    }

    /**
     * X component of the vector
     */
    get x() { return this.#x_; }
    set x(value) {
        if(!Type.isNumber(value)) {
            console.error("Vector3 x must be a number!");
            return;
        }

        this.#x_ = value;
        
        this.#validateChange();
    }

    /**
     * Y component of the vector
     */
    get y() { return this.#y_; }
    set y(value) {
        if(!Type.isNumber(value)) {
            console.error("Vector3 y must be a number!");
            return;
        }

        this.#y_ = value;
        
        this.#validateChange();
    }

    /**
     * Z component of the vector
     */
    get z() { return this.#z_; }
    set z(value) {
        if(!Type.isNumber(value)) {
            console.error("Vector3 z must be a number!");
            return;
        }

        this.#z_ = value;
        
        this.#validateChange();
    }

    /**
     * Command called when the x, y or z component changes
     */
    get onChange() { return this.#onChange_; }
    set onChange(value) {
        if(!Type.isInstance(value, Command)) {
            console.error("Vector3 onChange must be a Command!");
            return;
        }

        this.#onChange_ = value;
    }

    /**
     * Returns the length of this vector
     */
    get magnitude() {
        return Math.sqrt(this.#x_ * this.#x_ + this.#y_ * this.#y_ + this.#z_ * this.#z_);
    }
    set magnitude(value) {
        if(!Type.isNumber(value, Vector3)) {
            console.error("Vector3 magnitude must be a number!");
            return;
        }

        this.divideByNumber(this.magnitude / value);
    }

    /**
     * Returns the squared length of this vector
     */
    get sqrMagnitude() {
        return Math.sqrt(this.#x_ * this.#x_ + this.#y_ * this.#y_ + this.#z_ * this.#z_) * Math.sqrt(this.#x_ * this.#x_ + this.#y_ * this.#y_ + this.#z_ * this.#z_);
    }

    /**
     * Returns this vector with a magnitude of 1
     */
    get normalized() {
        var length = this.magnitude;
        return new Vector3().set(this).divideByNumber(length);
    }

    #validateChange() {
        if(this.#onChange_ != null) 
            this.#onChange_.execute();
    }

    /**
     * Returns a string representing this vector
     */
    toString() {
        return "Vector3(" + this.#x_ + ", " + this.#y_ + ", " + this.#z_ + ")";
    }

    /**
     * Returns true if this vectors xyz components match with the given vector
     * @param {Vector3} vec3 vector to compare with
     */
    equals(vec3) {
        if(!Type.isInstance(vec3, Vector3)) {
            console.error("Vector3 equals vec3 must be a Vector3!");
            return;
        }

        return vec3.x == this.#x_ && vec3.y == this.#y_ && vec3.z == this.#z_;
    }

    /**
     * Set this vectors xyz components to the given vector
     * @param {Vector3} vec3 vector to copy
     */
    set(vec3) {
        if(!Type.isInstance(vec3, Vector3)) {
            console.error("Vector3 set vec3 must be a Vector3!");
            return;
        }

        this.#x_ = vec3.x;
        this.#y_ = vec3.y;
        this.#z_ = vec3.z;

        this.#validateChange();

        return this;
    }

    setRaw(vec3) {
        if(!Type.isInstance(vec3, Vector3)) {
            console.error("Vector3 setRaw vec3 must be a Vector3!");
            return;
        }

        this.#x_ = vec3.x;
        this.#y_ = vec3.y;
        this.#z_ = vec3.z;

        return this;
    }

    /**
     * Returns this vector with a magnitude of 1
     */
    normalize() {
        var length = this.magnitude;
        this.divideByNumber(length);

        return this;
    }

    /**
     * Add given vector to this vector
     * @param {Vector3} vec3 vector to add
     */
    add(vec3) {
        if(!Type.isInstance(vec3, Vector3)) {
            console.error("Vector3 add vec3 must be a Vector3!");
            return null;
        }

        this.#x_ += vec3.x;
        this.#y_ += vec3.y;
        this.#z_ += vec3.z;

        this.#validateChange();

        return this;
    }

    /**
     * Substract given vector from this vector
     * @param {Vector3} vec3 vector to substract
     */
    substract(vec3) {
        if(!Type.isInstance(vec3, Vector3)) {
            console.error("Vector3 substract vec3 must be a Vector3!");
            return null;
        }

        this.#x_ -= vec3.x;
        this.#y_ -= vec3.y;
        this.#z_ -= vec3.z;

        this.#validateChange();

        return this;
    }

    /**
     * Multiply this vector with given vector
     * @param {Vector3} vec3 vector to multiply with
     */
    multiply(vec3) {
        if(!Type.isInstance(vec3, Vector3)) {
            console.error("Vector3 multiply vec3 must be a Vector3!");
            return null;
        }

        this.#x_ *= vec3.x;
        this.#y_ *= vec3.y;
        this.#z_ *= vec3.z;

        this.#validateChange();

        return this;
    }

    /**
     * Multiply this vector with given number
     * @param {number} num number to multiply with
     */
    multiplyByNumber(num) {
        if(!Type.isNumber(num)) {
            console.error("Vector3 multiplyByNumber num must be a number!");
            return null;
        }

        this.#x_ *= num;
        this.#y_ *= num;
        this.#z_ *= num;

        this.#validateChange();

        return this;
    }

    multiplyByMatrix4(mat4) {
        if(!Type.isInstance(mat4, Matrix4)) {
            console.error("Vector3 multiplyByMatrix4 mat4 must be a Matrix4!");
            return null;
        }

        var x = this.#x_;
        var y = this.#y_;
        var z = this.#z_;

        this.#x_ = mat4.elements[0] * x + mat4.elements[1] * y + mat4.elements[2] * z + mat4.elements[3];
		this.#y_ = mat4.elements[4] * x + mat4.elements[5] * y + mat4.elements[6] * z + mat4.elements[7];
		this.#z_ = mat4.elements[8] * x + mat4.elements[9] * y + mat4.elements[10] * z + mat4.elements[11];

        this.#validateChange();

        return this;
    }

    /**
     * Divide this vector by given vector
     * @param {Vector3} vec3 vector to divide by
     */
    divide(vec3) {
        if(!Type.isInstance(vec3, Vector3)) {
            console.error("Vector3 divide vec3 must be a Vector3!");
            return null;
        }

        if(vec3.x == 0) this.#x_ = 0; else this.#x_ /= vec3.x;
        if(vec3.y == 0) this.#y_ = 0; else this.#y_ /= vec3.y;
        if(vec3.z == 0) this.#z_ = 0; else this.#z_ /= vec3.z;

        this.#validateChange();

        return this;
    }

    /**
     * Divide this vector by given number
     * @param {number} num number to divide by
     */
    divideByNumber(num) {
        if(!Type.isNumber(num)) {
            console.error("Vector3 divideByNumber num must be a number!");
            return null;
        }

        if(num == 0) {
            this.#x_ = 0;
            this.#y_ = 0;
            this.#z_ = 0;
        } else {
            this.#x_ /= num;
            this.#y_ /= num;
            this.#z_ /= num;
        }
        
        this.#validateChange();

        return this;
    }

    /**
     * Add given vector A to vector B
     * @param {Vector3} vec3A vectorA to add
     * @param {Vector3} vec3B vectorB to add
     */
    static add(vec3A, vec3B) {
        if(!Type.isInstance(vec3A, Vector3)) {
            console.error("Vector3.add vec3A must be a Vector3!");
            return null;
        }

        if(!Type.isInstance(vec3B, Vector3)) {
            console.error("Vector3.add vec3B must be a Vector3!");
            return null;
        }

        return new Vector3(vec3A.x + vec3B.x, vec3A.y + vec3B.y, vec3A.z + vec3B.z);
    }

    /**
     * Substract given vector B from vector A
     * @param {Vector3} vec3A vectorA to substract
     * @param {Vector3} vec3B vectorB to substract
     */
    static substract(vec3A, vec3B) {
        if(!Type.isInstance(vec3A, Vector3)) {
            console.error("Vector3.substract vec3A must be a Vector3!");
            return null;
        }

        if(!Type.isInstance(vec3B, Vector3)) {
            console.error("Vector3.substract vec3B must be a Vector3!");
            return null;
        }

        return new Vector3(vec3A.x - vec3B.x, vec3A.y - vec3B.y, vec3A.z - vec3B.z);
    }

    /**
     * Multiply given vector A with vector B
     * @param {Vector3} vec3A vectorA to multiply with
     * @param {Vector3} vec3B vectorB to multiply with
     */
    static multiply(vec3A, vec3B) {
        if(!Type.isInstance(vec3A, Vector3)) {
            console.error("Vector3.multiply vec3A must be a Vector3!");
            return null;
        }

        if(!Type.isInstance(vec3B, Vector3)) {
            console.error("Vector3.multiply vec3B must be a Vector3!");
            return null;
        }

        return new Vector3(vec3A.x * vec3B.x, vec3A.y * vec3B.y, vec3A.z * vec3B.z);
    }

    /**
     * Multiply given vector with a given number
     * @param {Vector3} vec3 vector to multiply
     * @param {number} num number to multiply by
     */
    static multiplyByNumber(vec3, num) {
        if(!Type.isInstance(vec3, Vector3)) {
            console.error("Vector3.multiplyByNumber vec3 must be a Vector3!");
            return null;
        }

        if(!Type.isNumber(num)) {
            console.error("Vector3.multiplyByNumber num must be a number!");
            return null;
        }

        return new Vector3(vec3.x * num, vec3.y * num, vec3.z * num);
    }

    /**
     * Divide given vector A by vector B
     * @param {Vector3} vec3A vectorA to divide
     * @param {Vector3} vec3B vectorB to divide by
     */
    static divide(vec3A, vec3B) {
        if(!Type.isInstance(vec3A, Vector3)) {
            console.error("Vector3.divide vec3A must be a Vector3!");
            return null;
        }

        if(!Type.isInstance(vec3B, Vector3)) {
            console.error("Vector3.divide vec3B must be a Vector3!");
            return null;
        }

        return new Vector3(vec3A.x / vec3B.x, vec3A.y / vec3B.y, vec3A.z / vec3B.z);
    }

    /**
     * Divide given vector by a given number
     * @param {Vector3} vec3 vector to divide
     * @param {number} num number to divide by
     */
    static divideByNumber(vec3, num) {
        if(!Type.isInstance(vec3, Vector3)) {
            console.error("Vector3.divideByNumber vec3 must be a Vector3!");
            return null;
        }

        if(!Type.isNumber(num)) {
            console.error("Vector3.divideByNumber num must be a number!");
            return null;
        }

        return new Vector3(vec3.x / num, vec3.y / num, vec3.z / num);
    }

    /**
     * Linearly interpolate between vector A and vector B by a given value
     * @param {Vector3} vec3A vectorA to interpolate
     * @param {Vector3} vec3B vectorB to interpolate
     * @param {number} value value to control the interpolation
     */
    static lerp(vec3A, vec3B, value) {
        if(!Type.isInstance(vec3A, Vector3)) {
            console.error("Vector3.lerp vec3A must be a Vector3!");
            return null;
        }

        if(!Type.isInstance(vec3B, Vector3)) {
            console.error("Vector3.lerp vec3B must be a Vector3!");
            return null;
        }

        if(!Type.isNumber(value)) {
            console.error("Vector3.lerp value must be a number!");
            return null;
        }

        value = Mathf.clamp01(value);
        return new Vector3(Mathf.lerp(vec3A.x, vec3B.x, value), Mathf.lerp(vec3A.y, vec3B.y, value), Mathf.lerp(vec3A.z, vec3B.z, value));
    }

    /**
     * Linearly interpolate between vector A and vector B by a given value, which will not be clamped between 0 and 1
     * @param {Vector3} vec3A vectorA to interpolate
     * @param {Vector3} vec3B vectorB to interpolate
     * @param {number} value value to control the interpolation
     */
    static lerpUnclamped(vec3A, vec3B, value) {
        if(!Type.isInstance(vec3A, Vector3)) {
            console.error("Vector3.lerpUnclamped vec3A must be a Vector3!");
            return null;
        }

        if(!Type.isInstance(vec3B, Vector3)) {
            console.error("Vector3.lerpUnclamped vec3B must be a Vector3!");
            return null;
        }

        if(!Type.isNumber(value)) {
            console.error("Vector3.lerpUnclamped value must be a number!");
            return null;
        }

        return new Vector3(Mathf.lerpUnclamped(vec3A.x, vec3B.x, value), Mathf.lerpUnclamped(vec3A.y, vec3B.y, value), Mathf.lerpUnclamped(vec3A.z, vec3B.z, value));
    }

    /**
     * Clamp a vectors magnitude to a given magnitude
     * @param {Vector3} vec3 vector to clamp its magnitude
     * @param {number} magnitude maximum magnitude
     */
    static clampMagnitude(vec3, magnitude) {
        if(!Type.isInstance(vec3, Vector3)) {
            console.error("Vector3.clampMagnitude vec3 must be a Vector3!");
            return null;
        }

        if(!Type.isNumber(magnitude)) {
            console.error("Vector3.clampMagnitude magnitude must be a number!");
            return null;
        }

        var length = vec3.magnitude;
        if(length > magnitude) {
            vec3.divideByNumber(length / magnitude);
        }

        return vec3;
    }

    /**
     * Returns the absolute distance between the given vectors A and B
     * @param {Vector3} vec3A vectorA
     * @param {Vector3} vec3B vectorB
     */
    static distance(vec3A, vec3B) {
        if(!Type.isInstance(vec3A, Vector3)) {
            console.error("Vector3.distance vec3A must be a Vector3!");
            return 0;
        }

        if(!Type.isInstance(vec3B, Vector3)) {
            console.error("Vector3.distance vec3B must be a Vector3!");
            return 0;
        }

        return Math.sqrt((vec3A.x - vec3B.x) * (vec3A.x - vec3B.x) + (vec3A.y - vec3B.y) * (vec3A.y - vec3B.y) + (vec3A.z - vec3B.z) * (vec3A.z - vec3B.z));
    }

    /**
     * Returns the angle between given vectors A and B in degrees
     * @param {Vector3} vec3A vectorA
     * @param {Vector3} vec3B vectorB
     */
    static angle(vec3A, vec3B) {
        if(!Type.isInstance(vec3A, Vector3)) {
            console.error("Vector3.angle vec3A must be a Vector3!");
            return 0;
        }

        if(!Type.isInstance(vec3B, Vector3)) {
            console.error("Vector3.angle vec3B must be a Vector3!");
            return 0;
        }

        return Mathf.Rad2Deg(Math.acos(Vector3.dot(vec3A, vec3B) / (Math.sqrt(vec3A.x * vec3A.x + vec3A.y * vec3A.y + vec3A.z * vec3A.z) * Math.sqrt(vec3B.x * vec3B.x + vec3B.y * vec3B.y + vec3B.z * vec3B.z))));
    }

    /**
     * Returns the dot product of the given vectors A and B
     * @param {Vector3} vec3A vectorA
     * @param {Vector3} vec3B vectorB
     */
    static dot(vec3A, vec3B) {
        if(!Type.isInstance(vec3A, Vector3)) {
            console.error("Vector3.dot vec3A must be a Vector3!");
            return 0;
        }

        if(!Type.isInstance(vec3B, Vector3)) {
            console.error("Vector3.dot vec3B must be a Vector3!");
            return 0;
        }

        return vec3A.x * vec3B.x + vec3A.y * vec3B.y + vec3A.z + vec3B.z;
    }

    static multiplyBasicByMatrix4(x, y, z, mat4) {
        if(!Type.isNumber(x)) {
            console.error("Vector3 multiplyBasicByMatrix4 x must be a number!");
            return null;
        }

        if(!Type.isNumber(y)) {
            console.error("Vector3 multiplyBasicByMatrix4 y must be a number!");
            return null;
        }

        if(!Type.isNumber(z)) {
            console.error("Vector3 multiplyBasicByMatrix4 z must be a number!");
            return null;
        }

        if(!Type.isInstance(mat4, Matrix4)) {
            console.error("Vector3 multiplyByMatrix4 mat4 must be a Matrix4!");
            return null;
        }

        const rX = mat4.elements[0] * x + mat4.elements[1] * y + mat4.elements[2] * z + mat4.elements[3];
		const rY = mat4.elements[4] * x + mat4.elements[5] * y + mat4.elements[6] * z + mat4.elements[7];
		const rZ = mat4.elements[8] * x + mat4.elements[9] * y + mat4.elements[10] * z + mat4.elements[11];

        return [rX, rY, rZ];
    }

    /**
     * Returns a new empty vector
     */
    static get zero() {
        return new Vector3();
    }

    /**
     * Returns a new vector with both components set to 1
     */
    static get one() {
        return new Vector3(1, 1, 1);
    }

    /**
     * Returns a new vector pointing up
     */
    static get up() {
        return new Vector3(0, 1, 0);
    }

    /**
     * Returns a new vector pointing down
     */
    static get down() {
        return new Vector3(0, -1, 0);
    }

    /**
     * Returns a new vector pointing left
     */
    static get left() {
        return new Vector3(-1, 0, 0);
    }

    /**
     * Returns a new vector pointing right
     */
    static get right() {
        return new Vector3(1, 0, 0);
    }

    /**
     * Returns a new vector pointing forward
     */
    static get forward() {
        return new Vector3(0, 0, 1);
    }

    /**
     * Returns a new vector pointing back
     */
    static get back() {
        return new Vector3(0, 0, -1);
    }
}