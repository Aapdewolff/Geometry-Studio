class Vector2 {
    #x_;
    #y_;
    #onChange_;

    /**
     * Creates a new Vector2
     * @param {number} x x component
     * @param {number} y y component
     */
    constructor(x = 0, y = 0) {
        if(!Type.isNumber(x)) {
            console.error("Vector2 constructor x must be a number!")
            return null;
        }

        if(!Type.isNumber(y)) {
            console.error("Vector2 constructor y must be a number!")
            return null;
        }

        this.#x_ = x;
        this.#y_ = y;
        this.#onChange_ = null;
    }

    /**
     * X component of the vector
     */
    get x() { return this.#x_; }
    set x(value) {
        if(!Type.isNumber(value)) {
            console.error("Vector2 x must be a number!");
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
            console.error("Vector2 y must be a number!");
            return;
        }

        this.#y_ = value;
        
        this.#validateChange();
    }

    /**
     * Command called when the x or y component changes
     */
    get onChange() { return this.#onChange_; }
    set onChange(value) {
        if(!Type.isInstance(value, Command)) {
            console.error("Vector2 onChange must be a Command!");
            return;
        }

        this.#onChange_ = value;
    }

    /**
     * Returns the length of this vector
     */
    get magnitude() {
        return Math.sqrt(this.#x_ * this.#x_ + this.#y_ * this.#y_);
    }
    set magnitude(value) {
        if(!Type.isNumber(value, Vector2)) {
            console.error("Vector2 magnitude must be a number!");
            return;
        }

        this.divideByNumber(this.magnitude / value);
    }

    /**
     * Returns the squared length of this vector
     */
    get sqrMagnitude() {
        return Math.sqrt(this.#x_ * this.#x_ + this.#y_ * this.#y_) * Math.sqrt(this.#x_ * this.#x_ + this.#y_ * this.#y_);
    }

    /**
     * Returns this vector with a magnitude of 1
     */
    get normalized() {
        var length = this.magnitude;
        return new Vector2(this.#x_ / length, this.#y_ / length);
    }

    #validateChange() {
        if(this.#onChange_ != null) 
            this.#onChange_.execute();
    }

    /**
     * Returns a string representing this vector
     */
    toString() {
        return "Vector2(" + this.#x_ + ", " + this.#y_ + ")";
    }

    /**
     * Returns true if this vectors x and y components match with the given vector
     * @param {Vector2} vec2 vector to compare with
     */
    equals(vec2) {
        if(!Type.isInstance(vec2, Vector2)) {
            console.error("Vector2 equals vec2 must be a Vector2!");
            return;
        }

        return vec2.x == this.#x_ && vec2.y == this.#y_;
    }

    /**
     * Set this vectors x and y components to the given vector
     * @param {Vector2} vec2 vector to copy
     */
    set(vec2) {
        if(!Type.isInstance(vec2, Vector2)) {
            console.error("Vector2 set vec2 must be a Vector2!");
            return;
        }

        this.#x_ = vec2.x;
        this.#y_ = vec2.y;

        this.#validateChange();

        return this;
    }

    /**
     * Returns this vector with a magnitude of 1
     */
    normalize() {
        var length = this.magnitude();
        this.divide(length);

        return this;
    }

    /**
     * Add given vector to this vector
     * @param {Vector2} vec2 vector to add
     */
    add(vec2) {
        if(!Type.isInstance(vec2, Vector2)) {
            console.error("Vector2 add vec2 must be a Vector2!");
            return null;
        }

        this.#x_ += vec2.x;
        this.#y_ += vec2.y;

        this.#validateChange();

        return this;
    }

    /**
     * Substract given vector from this vector
     * @param {Vector2} vec2 vector to substract
     */
    substract(vec2) {
        if(!Type.isInstance(vec2, Vector2)) {
            console.error("Vector2 substract vec2 must be a Vector2!");
            return null;
        }

        this.#x_ -= vec2.x;
        this.#y_ -= vec2.y;

        this.#validateChange();

        return this;
    }

    /**
     * Multiply this vector with given vector
     * @param {Vector2} vec2 vector to multiply with
     */
    multiply(vec2) {
        if(!Type.isInstance(vec2, Vector2)) {
            console.error("Vector2 multiply vec2 must be a Vector2!");
            return null;
        }

        this.#x_ *= vec2.x;
        this.#y_ *= vec2.y;

        this.#validateChange();

        return this;
    }

    /**
     * Multiply this vector with given number
     * @param {number} num number to multiply with
     */
    multiplyByNumber(num) {
        if(!Type.isNumber(num)) {
            console.error("Vector2 multiplyByNumber num must be a number!");
            return null;
        }

        this.#x_ *= num;
        this.#y_ *= num;

        this.#validateChange();

        return this;
    }

    /**
     * Divide this vector by given vector
     * @param {Vector2} vec2 vector to divide by
     */
    divide(vec2) {
        if(!Type.isInstance(vec2, Vector2)) {
            console.error("Vector2 divide vec2 must be a Vector2!");
            return null;
        }

        this.#x_ /= vec2.x;
        this.#y_ /= vec2.y;

        this.#validateChange();

        return this;
    }

    /**
     * Divide this vector by given number
     * @param {number} num number to divide by
     */
    divideByNumber(num) {
        if(!Type.isNumber(num)) {
            console.error("Vector2 divideByNumber num must be a number!");
            return null;
        }

        this.#x_ /= num;
        this.#y_ /= num;

        this.#validateChange();

        return this;
    }

    /**
     * Add given vector A to vector B
     * @param {Vector2} vec2A vectorA to add
     * @param {Vector2} vec2B vectorB to add
     */
    static add(vec2A, vec2B) {
        if(!Type.isInstance(vec2A, Vector2)) {
            console.error("Vector2.add vec2A must be a Vector2!");
            return null;
        }

        if(!Type.isInstance(vec2B, Vector2)) {
            console.error("Vector2.add vec2B must be a Vector2!");
            return null;
        }

        return new Vector2(vec2A.x + vec2B.x, vec2A.y + vec2B.y);
    }

    /**
     * Substract given vector B from vector A
     * @param {Vector2} vec2A vectorA to substract
     * @param {Vector2} vec2B vectorB to substract
     */
    static substract(vec2A, vec2B) {
        if(!Type.isInstance(vec2A, Vector2)) {
            console.error("Vector2.substract vec2A must be a Vector2!");
            return null;
        }

        if(!Type.isInstance(vec2B, Vector2)) {
            console.error("Vector2.substract vec2B must be a Vector2!");
            return null;
        }

        return new Vector2(vec2A.x - vec2B.x, vec2A.y - vec2B.y);
    }

    /**
     * Multiply given vector A with vector B
     * @param {Vector2} vec2A vectorA to multiply with
     * @param {Vector2} vec2B vectorB to multiply with
     */
    static multiply(vec2A, vec2B) {
        if(!Type.isInstance(vec2A, Vector2)) {
            console.error("Vector2.multiply vec2A must be a Vector2!");
            return null;
        }

        if(!Type.isInstance(vec2B, Vector2)) {
            console.error("Vector2.multiply vec2B must be a Vector2!");
            return null;
        }

        return new Vector2(vec2A.x * vec2B.x, vec2A.y * vec2B.y);
    }

    /**
     * Multiply given vector with a given number
     * @param {Vector2} vec2 vector to multiply
     * @param {number} num number to multiply by
     */
    static multiplyByNumber(vec2, num) {
        if(!Type.isInstance(vec2, Vector2)) {
            console.error("Vector2.multiplyByNumber vec2 must be a Vector2!");
            return null;
        }

        if(!Type.isNumber(num)) {
            console.error("Vector2.multiplyByNumber num must be a number!");
            return null;
        }

        return new Vector2(vec2.x * num, vec2.y * num);
    }

    /**
     * Divide given vector A by vector B
     * @param {Vector2} vec2A vectorA to divide
     * @param {Vector2} vec2B vectorB to divide by
     */
    static divide(vec2A, vec2B) {
        if(!Type.isInstance(vec2A, Vector2)) {
            console.error("Vector2.divide vec2A must be a Vector2!");
            return null;
        }

        if(!Type.isInstance(vec2B, Vector2)) {
            console.error("Vector2.divide vec2B must be a Vector2!");
            return null;
        }

        return new Vector2(vec2A.x / vec2B.x, vec2A.y / vec2B.y);
    }

    /**
     * Divide given vector by a given number
     * @param {Vector2} vec2 vector to divide
     * @param {number} num number to divide by
     */
    static divideByNumber(vec2, num) {
        if(!Type.isInstance(vec2, Vector2)) {
            console.error("Vector2.divideByNumber vec2 must be a Vector2!");
            return null;
        }

        if(!Type.isNumber(num)) {
            console.error("Vector2.divideByNumber num must be a number!");
            return null;
        }

        return new Vector2(vec2.x / num, vec2.y / num);
    }

    /**
     * Linearly interpolate between vector A and vector B by a given value
     * @param {Vector2} vec2A vectorA to interpolate
     * @param {Vector2} vec2B vectorB to interpolate
     * @param {number} value value to control the interpolation
     */
    static lerp(vec2A, vec2B, value) {
        if(!Type.isInstance(vec2A, Vector2)) {
            console.error("Vector2.lerp vec2A must be a Vector2!");
            return null;
        }

        if(!Type.isInstance(vec2B, Vector2)) {
            console.error("Vector2.lerp vec2B must be a Vector2!");
            return null;
        }

        if(!Type.isNumber(value)) {
            console.error("Vector2.lerp value must be a number!");
            return null;
        }

        value = Mathf.clamp01(value);
        return new Vector2(Mathf.lerp(vec2A.x, vec2B.x, value), Mathf.lerp(vec2A.y, vec2B.y, value));
    }

    /**
     * Linearly interpolate between vector A and vector B by a given value, which will not be clamped between 0 and 1
     * @param {Vector2} vec2A vectorA to interpolate
     * @param {Vector2} vec2B vectorB to interpolate
     * @param {number} value value to control the interpolation
     */
    static lerpUnclamped(vec2A, vec2B, value) {
        if(!Type.isInstance(vec2A, Vector2)) {
            console.error("Vector2.lerpUnclamped vec2A must be a Vector2!");
            return null;
        }

        if(!Type.isInstance(vec2B, Vector2)) {
            console.error("Vector2.lerpUnclamped vec2B must be a Vector2!");
            return null;
        }

        if(!Type.isNumber(value)) {
            console.error("Vector2.lerpUnclamped value must be a number!");
            return null;
        }

        return new Vector2(Mathf.lerpUnclamped(vec2A.x, vec2B.x, value), Mathf.lerpUnclamped(vec2A.y, vec2B.y, value));
    }

    /**
     * Clamp a vectors magnitude to a given magnitude
     * @param {Vector2} vec2 vector to clamp its magnitude
     * @param {number} magnitude maximum magnitude
     */
    static clampMagnitude(vec2, magnitude) {
        if(!Type.isInstance(vec2, Vector2)) {
            console.error("Vector2.clampMagnitude vec2 must be a Vector2!");
            return null;
        }

        if(!Type.isNumber(magnitude)) {
            console.error("Vector2.clampMagnitude magnitude must be a number!");
            return null;
        }

        var length = vec2.magnitude;
        if(length > magnitude) {
            vec2.divideByNumber(length / magnitude);
        }

        return vec2;
    }

    /**
     * Returns the absolute distance between the given vectors A and B
     * @param {Vector2} vec2A vectorA
     * @param {Vector2} vec2B vectorB
     */
    static distance(vec2A, vec2B) {
        if(!Type.isInstance(vec2A, Vector2)) {
            console.error("Vector2.distance vec2A must be a Vector2!");
            return 0;
        }

        if(!Type.isInstance(vec2B, Vector2)) {
            console.error("Vector2.distance vec2B must be a Vector2!");
            return 0;
        }

        return Math.sqrt((vec2A.x - vec2B.x) * (vec2A.x - vec2B.x) + (vec2A.y - vec2B.y) * (vec2A.y - vec2B.y));
    }

    /**
     * Returns the angle between given vectors A and B in degrees
     * @param {Vector2} vec2A vectorA
     * @param {Vector2} vec2B vectorB
     */
    static angle(vec2A, vec2B) {
        if(!Type.isInstance(vec2A, Vector2)) {
            console.error("Vector2.angle vec2A must be a Vector2!");
            return 0;
        }

        if(!Type.isInstance(vec2B, Vector2)) {
            console.error("Vector2.angle vec2B must be a Vector2!");
            return 0;
        }

        return Mathf.Rad2Deg(Math.acos(Vector2.dot(vec2A, vec2B) / (Math.sqrt(vec2A.x * vec2A.x + vec2A.y * vec2A.y) * Math.sqrt(vec2B.x * vec2B.x + vec2B.y * vec2B.y))));
    }

    /**
     * Returns the dot product of the given vectors A and B
     * @param {Vector2} vec2A vectorA
     * @param {Vector2} vec2B vectorB
     */
    static dot(vec2A, vec2B) {
        if(!Type.isInstance(vec2A, Vector2)) {
            console.error("Vector2.dot vec2A must be a Vector2!");
            return 0;
        }

        if(!Type.isInstance(vec2B, Vector2)) {
            console.error("Vector2.dot vec2B must be a Vector2!");
            return 0;
        }

        return vec2A.x * vec2B.x + vec2A.y * vec2B.y;
    }

    /**
     * Returns a new empty vector
     */
    static get zero() {
        return new Vector2();
    }

    /**
     * Returns a new vector with both components set to 1
     */
    static get one() {
        return new Vector2(1, 1);
    }

    /**
     * Returns a new vector pointing up
     */
    static get up() {
        return new Vector2(0, 1);
    }

    /**
     * Returns a new vector pointing down
     */
    static get down() {
        return new Vector2(0, -1);
    }

    /**
     * Returns a new vector pointing left
     */
    static get left() {
        return new Vector2(-1, 0);
    }

    /**
     * Returns a new vector pointing right
     */
    static get right() {
        return new Vector2(1, 0);
    }
}