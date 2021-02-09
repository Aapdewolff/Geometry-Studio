class Type {
    /**
     * Returns true if the given value is a boolean
     * @param {boolean} bool value to check
     */
    static isBool(value) {
        return (typeof value) == "boolean";
    }

    /**
     * Returns true if the given value is a number
     * @param {number} number value to check
     */
    static isNumber(value) {
        return (typeof value) == "number";
    }

    /**
     * Returns true if the given value is a string
     * @param {string} string value to check
     */
    static isString(value) {
        return (typeof value) == "string";
    }

    /**
     * Returns true if the given value is a function
     * @param {function} function value to check
     */
    static isFunction(value) {
        return (typeof value) == "function";
    }

    /**
     * Returns true if the given value is an instance of the given base object
     * @param {Object} instance instance to check
     * @param {Object} base base object to compare to
     */
    static isInstance(value, base) {
        return value instanceof base;
    }
}