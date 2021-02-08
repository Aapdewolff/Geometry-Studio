window.onload = function() {
    LibBuilder.Build(function() {
        Canvas.Init();

        window.onresize = Canvas.Resize;
    });
}