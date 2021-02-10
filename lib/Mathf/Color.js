class Color {
    #r_;
    #g_;
    #b_;
    #a_;
    #onChange_;

    /**
     * Creates a new Color
     * @param {number} r r component
     * @param {number} g g component
     * @param {number} b b component
     * @param {number} a a component
     */
    constructor(r = 0, g = 0, b = 0, a = 1) {
        if(!Type.isNumber(r)) {
            console.error("Color constructor r must be a number!")
            return null;
        }

        if(!Type.isNumber(g)) {
            console.error("Color constructor g must be a number!")
            return null;
        }

        if(!Type.isNumber(b)) {
            console.error("Color constructor b must be a number!")
            return null;
        }

        if(!Type.isNumber(a)) {
            console.error("Color constructor a must be a number!")
            return null;
        }

        this.#r_ = r;
        this.#g_ = g;
        this.#b_ = b;
        this.#a_ = a;
        this.#onChange_ = null;
    }

    /**
     * R component of the color
     */
    get r() { return this.#r_; }
    set r(value) {
        if(!Type.isNumber(value)) {
            console.error("Color r must be a number!");
            return;
        }

        this.#r_ = value;
        
        this.#validateChange();
    }

    /**
     * G component of the color
     */
    get g() { return this.#g_; }
    set g(value) {
        if(!Type.isNumber(value)) {
            console.error("Color g must be a number!");
            return;
        }

        this.#g_ = value;
        
        this.#validateChange();
    }

    /**
     * B component of the color
     */
    get b() { return this.#b_; }
    set b(value) {
        if(!Type.isNumber(value)) {
            console.error("Color b must be a number!");
            return;
        }

        this.#b_ = value;
        
        this.#validateChange();
    }

    /**
     * B component of the color
     */
    get a() { return this.#a_; }
    set a(value) {
        if(!Type.isNumber(value)) {
            console.error("Color a must be a number!");
            return;
        }

        this.#a_ = value;
        
        this.#validateChange();
    }

    /**
     * Command called when the r, g or b component changes
     */
    get onChange() { return this.#onChange_; }
    set onChange(value) {
        if(!Type.isInstance(value, Command)) {
            console.error("Color onChange must be a Command!");
            return;
        }

        this.#onChange_ = value;
    }

    #validateChange() {
        this.#r_ = Mathf.clamp01(this.#r_);
        this.#g_ = Mathf.clamp01(this.#g_);
        this.#b_ = Mathf.clamp01(this.#b_);
        this.#a_ = Mathf.clamp01(this.#a_);

        if(this.#onChange_ != null) 
            this.#onChange_.execute();
    }

    /**
     * Returns a string representing this color
     */
    toString() {
        return "Color(" + this.#r_ + ", " + this.#g_ + ", " + this.#b_ + ", " + this.#a_ + ")";
    }

    /**
     * Returns true if this colors rgba components match with the given color
     * @param {Color} color color to compare with
     */
    equals(color) {
        if(!Type.isInstance(color, Color)) {
            console.error("Color equals color must be a Color!");
            return;
        }

        return color.r == this.#r_ && color.g == this.#g_ && color.b == this.#b_ && color.a == this.#a_;
    }

    /**
     * Set this colors rgba components to the given color
     * @param {Color} color color to copy
     */
    set(color) {
        if(!Type.isInstance(color, Color)) {
            console.error("Color set color must be a Color!");
            return;
        }

        this.#r_ = color.r;
        this.#g_ = color.g;
        this.#b_ = color.b;
        this.#a_ = color.a;

        this.#validateChange();

        return this;
    }

    /**
     * Add given color to this color
     * @param {Color} color color to add
     */
    add(color) {
        if(!Type.isInstance(color, Color)) {
            console.error("Color add color must be a Color!");
            return null;
        }

        this.#r_ += color.r;
        this.#g_ += color.g;
        this.#b_ += color.b;
        this.#a_ += color.a;

        this.#validateChange();

        return this;
    }

    /**
     * Substract given color from this color
     * @param {Color} color color to substract
     */
    substract(color) {
        if(!Type.isInstance(color, Color)) {
            console.error("Color substract color must be a Color!");
            return null;
        }

        this.#r_ -= color.r;
        this.#g_ -= color.g;
        this.#b_ -= color.b;
        this.#a_ -= color.a;

        this.#validateChange();

        return this;
    }

    /**
     * Multiply this color with given color
     * @param {Color} color color to multiply with
     */
    multiply(color) {
        if(!Type.isInstance(color, Color)) {
            console.error("Color multiply color must be a Color!");
            return null;
        }

        this.#r_ *= color.r;
        this.#g_ *= color.g;
        this.#b_ *= color.b;
        this.#a_ *= color.a;

        this.#validateChange();

        return this;
    }

    /**
     * Multiply this color with given number
     * @param {number} num number to multiply with
     */
    multiplyByNumber(num) {
        if(!Type.isNumber(num)) {
            console.error("Color multiplyByNumber num must be a number!");
            return null;
        }

        this.#r_ *= num;
        this.#g_ *= num;
        this.#b_ *= num;
        this.#a_ *= num;

        this.#validateChange();

        return this;
    }

    /**
     * Divide this color by given color
     * @param {Color} color color to divide by
     */
    divide(color) {
        if(!Type.isInstance(color, Color)) {
            console.error("Color divide color must be a Color!");
            return null;
        }

        this.#r_ /= color.r;
        this.#g_ /= color.g;
        this.#b_ /= color.b;
        this.#a_ /= color.a;

        this.#validateChange();

        return this;
    }

    /**
     * Divide this color by given number
     * @param {number} num number to divide by
     */
    divideByNumber(num) {
        if(!Type.isNumber(num)) {
            console.error("Color divideByNumber num must be a number!");
            return null;
        }

        this.#r_ /= num;
        this.#g_ /= num;
        this.#b_ /= num;
        this.#a_ /= num;

        this.#validateChange();

        return this;
    }

    /**
     * Add given color A to color B
     * @param {Color} colorA colorA to add
     * @param {Color} colorB colorB to add
     */
    static add(colorA, colorB) {
        if(!Type.isInstance(colorA, Color)) {
            console.error("Color.add colorA must be a Color!");
            return null;
        }

        if(!Type.isInstance(colorB, Color)) {
            console.error("Color.add colorB must be a Color!");
            return null;
        }

        return new Color(colorA.r + colorB.r, colorA.g + colorB.g, colorA.b + colorB.b, colorA.a + colorB.b);
    }

    /**
     * Substract given color B from color A
     * @param {Color} colorA colorA to substract
     * @param {Color} colorB colorB to substract
     */
    static substract(colorA, colorB) {
        if(!Type.isInstance(colorA, Color)) {
            console.error("Color.substract colorA must be a Color!");
            return null;
        }

        if(!Type.isInstance(colorB, Color)) {
            console.error("Color.substract colorB must be a Color!");
            return null;
        }

        return new Color(colorA.r - colorB.r, colorA.g - colorB.g, colorA.b - colorB.b, colorA.a - colorB.a);
    }

    /**
     * Multiply given color A with color B
     * @param {Color} colorA colorA to multiply with
     * @param {Color} colorB colorB to multiply with
     */
    static multiply(colorA, colorB) {
        if(!Type.isInstance(colorA, Color)) {
            console.error("Color.multiply colorA must be a Color!");
            return null;
        }

        if(!Type.isInstance(colorB, Color)) {
            console.error("Color.multiply colorB must be a Color!");
            return null;
        }

        return new Color(colorA.r * colorB.r, colorA.g * colorB.g, colorA.b * colorB.b, colorA.a * colorB.a);
    }

    /**
     * Multiply given color with a given number
     * @param {Color} color color to multiply
     * @param {number} num number to multiply by
     */
    static multiplyByNumber(color, num) {
        if(!Type.isInstance(color, Color)) {
            console.error("Color.multiplyByNumber color must be a Color!");
            return null;
        }

        if(!Type.isNumber(num)) {
            console.error("Color.multiplyByNumber num must be a number!");
            return null;
        }

        return new Color(color.r * num, color.g * num, color.b * num, color.a * num);
    }

    /**
     * Divide given color A by color B
     * @param {Color} colorA colorA to divide
     * @param {Color} colorB colorB to divide by
     */
    static divide(colorA, colorB) {
        if(!Type.isInstance(colorA, Color)) {
            console.error("Color.divide colorA must be a Color!");
            return null;
        }

        if(!Type.isInstance(colorB, Color)) {
            console.error("Color.divide colorB must be a Color!");
            return null;
        }

        return new Color(colorA.r / colorB.r, colorA.g / colorB.g, colorA.b / colorB.b, colorA.a / colorB.a);
    }

    /**
     * Divide given color by a given number
     * @param {Color} color color to divide
     * @param {number} num number to divide by
     */
    static divideByNumber(color, num) {
        if(!Type.isInstance(color, Color)) {
            console.error("Color.divideByNumber color must be a Color!");
            return null;
        }

        if(!Type.isNumber(num)) {
            console.error("Color.divideByNumber num must be a number!");
            return null;
        }

        return new Color(color.r / num, color.g / num, color.b / num, color.a / num);
    }

    /**
     * Blend colorA and colorB by a given value
     * @param {Color} colorA colorA to blend
     * @param {Color} colorB colorB to blend
     */
    static blend(colorA, colorB, value) {
        if(!Type.isInstance(colorA, Color)) {
            console.error("Color.blend colorA must be a Color!");
            return null;
        }

        if(!Type.isInstance(colorB, Color)) {
            console.error("Color.blend colorB must be a Color!");
            return null;
        }

        if(!Type.isNumber(value)) {
            console.error("Color.blend value must be a number!");
            return null;
        }

        return new Color(Mathf.lerp(colorA.r, colorB.r, value), Mathf.lerp(colorA.g, colorB.g, value), Mathf.lerp(colorA.b, colorB.b, value), Mathf.lerp(colorA.a, colorB.a, value))
    }

    static get white() {
        return new Color(1, 1, 1, 1);
    }

    static get silver() {
        return new Color(0.75, 0.75, 0.75, 1);
    }

    static get gray() {
        return new Color(0.5, 0.5, 0.5, 1);
    }

    static get black() {
        return new Color(0, 0, 0, 1);
    }

    static get red() {
        return new Color(1, 0, 0, 1);
    }

    static get maroon() {
        return new Color(0.5, 0, 0, 1);
    }

    static get yellow() {
        return new Color(1, 1, 0, 1);
    }

    static get olive() {
        return new Color(0.5, 0.5, 0, 1);
    }

    static get lime() {
        return new Color(0, 1, 0, 1);
    }

    static get green() {
        return new Color(0, 0.5, 0, 1);
    }

    static get aqua() {
        return new Color(0, 1, 1, 1);
    }

    static get teal() {
        return new Color(0, 0.5, 0.5, 1);
    }

    static get blue() {
        return new Color(0, 0, 1, 1);
    }

    static get navy() {
        return new Color(0, 0, 0.5, 1);
    }

    static get fuchsia() {
        return new Color(1, 0, 1, 1);
    }

    static get purple() {
        return new Color(0.5, 0, 0.5, 1);
    }

    static get transparent() {
        return new Color(0, 0, 0, 0);
    }

    static get random() {
        return new Color(Math.random(), Math.random(), Math.random(), Math.random());
    }
}