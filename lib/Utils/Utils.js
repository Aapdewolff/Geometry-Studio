class Utils {
    static CompareObjects(a, b) {
        for(const property in a) {
            if(Object.prototype.hasOwnProperty.call(b, property)) {
                if(a[property] !== b[property])
                    return false;
            } else {
                return false;
            }
        }
      
        return true; 
    }

    static PropertiesToArray(object) {
        var properties = [];
        for(var property in object) {
            properties.push(property.toString());
        }

        return properties;
    }
}