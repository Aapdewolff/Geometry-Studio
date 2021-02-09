class Utils {
    static CompareObjects(a, b) {
        for(var property in a) {
            if(Object.prototype.hasOwnProperty.call(b, property)) {
                if(a[property] !== b[property])
                    return false;
            } else {
                return false;
            }
        }
      
        return true; 
    }
}