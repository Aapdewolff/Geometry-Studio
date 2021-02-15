class Utils {
    static CompareObjects(a, b) {
        for(const property in a) {
            if(Object.prototype.hasOwnProperty.call(b, property)) {
                if(Type.isObject(a[property])) {
                    if(!Utils.CompareObjects(a[property], b[property]))
                        return false;
                } else {
                    if(a[property] !== b[property])
                        return false;
                }
            } else {
                return false;
            }
        }
      
        return true; 
    }

    static CompareObjectsAsString(a, b) {
        for(const property in a) {
            if(Object.prototype.hasOwnProperty.call(b, property)) {
                if(a[property] == undefined || b[property] == undefined)
                    return false;

                if(a[property].toString() !== b[property].toString())
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