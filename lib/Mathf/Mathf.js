class Mathf {
    static Rad2Deg(radians) {
        if(!Type.isNumber(radians)) {
            console.error("Mathf.Rad2Deg radians must be a number!");
            return 0;
        }

        return radians * (180 / Math.PI);
    }

    static Deg2Rad(degrees) {
        if(!Type.isNumber(degrees)) {
            console.error("Mathf.Deg2Rad degrees must be a number!");
            return 0;
        }

        return radians * (Math.PI / 180);
    }

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