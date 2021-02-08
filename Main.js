window.onload = function() {
    LibBuilder.Build(function() {
        Logger.init(true);
        Canvas.init();

        window.onresize = Canvas.resize;

        var vec3A = new Vector3(3, 10, 30);
        vec3A.onChange = function() { console.log("Change!"); }
        console.log(vec3A.magnitude);
        vec3A.magnitude = 3;
        console.log(vec3A.magnitude);
        console.log(vec3A.toString());
    });
}