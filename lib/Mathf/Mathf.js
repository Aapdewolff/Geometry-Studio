class Mathf {
    /**
     * Returns the given radians in degrees
     * @param {number} radians radians to convert
     */
    static Rad2Deg(radians) {
        if(!Type.isNumber(radians)) {
            console.error("Mathf.Rad2Deg radians must be a number!");
            return 0;
        }

        return radians * (180 / Math.PI);
    }

    /**
     * Returns the given degrees in radians
     * @param {number} degrees degrees to convert
     */
    static Deg2Rad(degrees) {
        if(!Type.isNumber(degrees)) {
            console.error("Mathf.Deg2Rad degrees must be a number!");
            return 0;
        }

        return radians * (Math.PI / 180);
    }

    /**
     * Linearly interpolate between number A and number B by a given value
     * @param {number} numA numberA to interpolate
     * @param {number} numB numberB to interpolate
     * @param {number} value value to control the interpolation
     */
    static lerp(numA, numB, value) {
        if(!Type.isNumber(numA)) {
            console.error("Mathf.lerp numA must be a number!");
            return 0;
        }

        if(!Type.isNumber(numB)) {
            console.error("Mathf.lerp numB must be a number!");
            return 0;
        }

        if(!Type.isNumber(value)) {
            console.error("Mathf.lerp value must be a number!");
            return 0;
        }

        value = Mathf.clamp01(value);
        return numA * (1 - value) + numB * value;
    }

    /**
     * Linearly interpolate between number A and number B by a given value, which will not be clamped between 0 and 1
     * @param {number} numA numberA to interpolate
     * @param {number} numB numberB to interpolate
     * @param {number} value value to control the interpolation
     */
    static lerpUnclamped(numA, numB, value) {
        if(!Type.isNumber(numA)) {
            console.error("Mathf.lerp numA must be a number!");
            return 0;
        }

        if(!Type.isNumber(numB)) {
            console.error("Mathf.lerp numB must be a number!");
            return 0;
        }

        if(!Type.isNumber(value)) {
            console.error("Mathf.lerp value must be a number!");
            return 0;
        }

        return numA * (1 - value) + numB * value;
    }

    /**
     * Clamps a given value between a minimum and a maximum
     * @param {number} value value to clamp
     * @param {number} min maximum value
     * @param {number} max minimum value
     */
    static clamp(value, min, max) {
        if(!Type.isNumber(value)) {
            console.error("Mathf.clamp value must be a number!");
            return 0;
        }

        if(!Type.isNumber(min)) {
            console.error("Mathf.min value must be a number!");
            return 0;
        }

        if(!Type.isNumber(max)) {
            console.error("Mathf.max value must be a number!");
            return 0;
        }

        if(value >= max)
            return max;
        else if(value <= min)
            return min;
        return value;
    }

    /**
     * Clamps a given value between 0 and 1
     * @param {number} value value to clamp
     */
    static clamp01(value) {
        if(!Type.isNumber(value)) {
            console.error("Mathf.clamp value must be a number!");
            return 0;
        }

        if(value >= 1)
            return 1;
        else if(value <= 0)
            return 0;
        return value;
    }
}