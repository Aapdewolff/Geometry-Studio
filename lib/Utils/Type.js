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

    /**
     * Returns true if the given value is an object
     * @param {Object} object value to check
     */
    static isObject(value) {
        return typeof value === "object" && value !== null;
    }

    /**
     * Returns true if the given value is a core or an user component
     * @param {Object} component value to check
     */
    static isComponent(value) {
        if(!Type.isFunction(value) || value.name === undefined || Type.isComponentInstance(value))
            return false;
        return LibBuilder.components.includes(value.name);
    }

    /**
     * Returns true if the given value is an instance of a core or an user component
     * @param {Object} instance value to check
     */
    static isComponentInstance(value) {
        if(!Type.isObject(value) || value.constructor === undefined)
            return false;
        return LibBuilder.components.includes(value.constructor.name);
    }
}