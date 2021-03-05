class Input {
    static #input_;
    static #prevInput_;

    static #mousePosition_;
    static #prevMousePosition_;

    static init() {
        Canvas.element.ondragstart = function(e) {
            if (e && e.preventDefault) { e.preventDefault(); }
            if (e && e.stopPropagation) { e.stopPropagation(); }
            return false;
        }
         
        Canvas.element.onselectstart = function(e) {
            if (e && e.preventDefault) { e.preventDefault(); }
            if (e && e.stopPropagation) { e.stopPropagation(); }
            return false;
        }

        document.body.ontouchstart = function(e) {
            if (e && e.preventDefault) { e.preventDefault(); }
            if (e && e.stopPropagation) { e.stopPropagation(); }
            return false;
        }
        
        document.body.ontouchmove = function(e) {
            if (e && e.preventDefault) { e.preventDefault(); }
            if (e && e.stopPropagation) { e.stopPropagation(); }
            return false;
        }

        Input.#input_ = {
            mouseButtons: [], keys: [], wheel: ""
        };

        Input.#prevInput_ = {
            mouseButtons: [], keys: [], wheel: ""
        };

        Input.#mousePosition_ = new Vector2();

        Canvas.element.addEventListener("wheel", Input.#scroll, {passive: true});

        Canvas.element.addEventListener("mousedown", Input.#mouseDown);
        Canvas.element.addEventListener("mousemove", Input.#mouseMove);
        Canvas.element.addEventListener("mouseup", Input.#mouseUp);

        Canvas.element.addEventListener("keydown", Input.#keyDown);
        Canvas.element.addEventListener("keyup", Input.#keyUp);
    }

    static update() {
        Input.#input_.wheel = "stationary";

        Input.#prevInput_ = {
            mouseButtons: Input.#input_.mouseButtons.slice(),
            keys: Input.#input_.keys.slice()
        };
        Input.#prevMousePosition_ = new Vector2().set(Input.#mousePosition_);
    }

    static #scroll(event) {
        if(event.deltaY > 0)
            Input.#input_.wheel = "down";
        else if(event.deltaY < 0)
            Input.#input_.wheel = "up";
    }

    static #mouseDown(event) {
        const mousePosition = new Vector2(event.pageX - Canvas.position.x, event.pageY - Canvas.position.y);
        Input.#mousePosition_ = mousePosition;
        
        Input.#input_.mouseButtons[event.button] = true;
    }

    static #mouseMove(event) {
        const mousePosition = new Vector2(event.pageX - Canvas.position.x, event.pageY - Canvas.position.y);
        Input.#mousePosition_ = mousePosition;
    }

    static #mouseUp(event) {
        const mousePosition = new Vector2(event.pageX - Canvas.position.x, event.pageY - Canvas.position.y);
        Input.#mousePosition_ = mousePosition;

        Input.#input_.mouseButtons[event.button] = false;
    }

    static #keyDown(event) {
        Input.#input_.keys[event.which] = true;

        return false;
    }

    static #keyUp(event) {
        Input.#input_.keys[event.which] = false;

        return false;
    }

    static getKey(keyCode) {
        if(!Type.isNumber(keyCode)) {
            console.error("Input.getKey keyCode must be a number!");
            return false;
        }

        if(Input.#input_.keys[keyCode] !== undefined)
            return Input.#input_.keys[keyCode];
        return false;
    }

    static getKeyDown(keyCode) {
        if(!Type.isNumber(keyCode)) {
            console.error("Input.getKeyDown keyCode must be a number!");
            return false;
        }

        if(Input.#input_.keys[keyCode] !== undefined && Input.#prevInput_.keys[keyCode] !== undefined)
            return Input.#input_.keys[keyCode] && !Input.#prevInput_.keys[keyCode];
        else if(Input.#input_.keys[keyCode] !== undefined)
            return Input.#input_.keys[keyCode];
        return false;
    }

    static getMouseButton(buttonCode) {
        if(!Type.isNumber(buttonCode)) {
            console.error("Input.getMouseButton buttonCode must be a number!");
            return false;
        }

        if(Input.#input_.mouseButtons[buttonCode] !== undefined)
            return Input.#input_.mouseButtons[buttonCode];
        return false;
    }

    static getMouseButtonDown(buttonCode) {
        if(!Type.isNumber(buttonCode)) {
            console.error("Input.getMouseButtonDown buttonCode must be a number!");
            return false;
        }

        if(Input.#input_.mouseButtons[buttonCode] !== undefined && Input.#prevInput_.mouseButtons[buttonCode] !== undefined)
            return Input.#input_.mouseButtons[buttonCode] && !Input.#prevInput_.mouseButtons[buttonCode];
        else if(Input.#input_.mouseButtons[buttonCode] !== undefined)
            return Input.#input_.mouseButtons[buttonCode];
        return false;
    }

    static getAxis(axis) {
        if(!Type.isString(axis)) {
            console.error("Input.getAxis axis mut be a string!");
            return 0;
        }

        switch(axis) {
            case "horizontal":
                return Input.#mousePosition_.x - Input.#prevMousePosition_.x;
            case "vertical":
                return Input.#mousePosition_.y - Input.#prevMousePosition_.y;
            default:
                console.warn("No axis named " + axis + " was found!");
                return 0;
        }
    }

    static getMouseWheel(direction) {
        if(!Type.isString(direction)) {
            console.error("Input.getMouseWheel direction mut be a string!");
            return false;
        }
        
        return Input.#input_.wheel == direction;
    }

    static get mousePosition() { return Input.#mousePosition_; }
    static set mousePosition(value) { console.error("Input.mousePosition is readonly!"); }
}