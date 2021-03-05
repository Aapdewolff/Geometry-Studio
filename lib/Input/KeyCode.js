class KeyCode {
    static get MOUSE_0() { return 0; }
    static get MOUSE_1() { return 1; }
    static get MOUSE_2() { return 2; }
    static get LEFT_MOUSE() { return 0; }
    static get MIDDLE_MOUSE() { return 1; }
    static get RIGHT_MOUSE() { return 2; }

    static get BACKSPACE() { return 8; }
    static get TAB() { return 9; }
    static get ENTER() { return 13; }
    static get SHIFT() { return 16; }
    static get CTRL() { return 17; }
    static get ALT() { return 18; }
    static get PAUSE() { return 19; }
    static get BREAK() { return 19; }
    static get CAPS_LOCK() { return 20; }
    static get ESCAPE() { return 27; }
    static get PAGE_UP() { return 33; }
    static get PAGE_DOWN() { return 34; }
    static get END() { return 35; }
    static get HOME() { return 36; }
    static get LEFT_ARROW() { return 37; }
    static get UP_ARROW() { return 38; }
    static get RIGHT_ARROW() { return 39; }
    static get DOWN_ARROW() { return 40; }
    static get INSERT() { return 45; }
    static get DELETE() { return 46; }

    static get N_0() { return 48; }
    static get N_1() { return 49; }
    static get N_2() { return 50; }
    static get N_3() { return 51; }
    static get N_4() { return 52; }
    static get N_5() { return 53; }
    static get N_6() { return 54; }
    static get N_7() { return 55; }
    static get N_8() { return 56; }
    static get N_9() { return 57; }

    static get A() { return 65; }
    static get B() { return 66; }
    static get C() { return 67; }
    static get D() { return 68; }
    static get E() { return 69; }
    static get F() { return 70; }
    static get G() { return 71; }
    static get H() { return 72; }
    static get I() { return 73; }
    static get J() { return 74; }
    static get K() { return 75; }
    static get L() { return 76; }
    static get M() { return 77; }
    static get N() { return 78; }
    static get O() { return 79; }
    static get P() { return 80; }
    static get Q() { return 81; }
    static get R() { return 82; }
    static get S() { return 83; }
    static get T() { return 84; }
    static get U() { return 85; }
    static get V() { return 86; }
    static get W() { return 87; }
    static get X() { return 88; }
    static get Y() { return 89; }
    static get Z() { return 90; }

    static get LEFT_WINDOWS() { return 91; }
    static get RIGHT_WINDOWS() { return 92; }
    static get SELECT() { return 93; }

    static get NPAD_0() { return 96; }
    static get NPAD_1() { return 97; }
    static get NPAD_2() { return 98; }
    static get NPAD_3() { return 99; }
    static get NPAD_4() { return 100; }
    static get NPAD_5() { return 101; }
    static get NPAD_6() { return 102; }
    static get NPAD_7() { return 103; }
    static get NPAD_8() { return 104; }
    static get NPAD_9() { return 105; }

    static get NPAD_MULTIPLY() { return 106; }
    static get NPAD_ADD() { return 107; }
    static get NPAD_SUBSTRACT() { return 109; }
    static get NPAD_DECIMAL() { return 110; }
    static get NPAD_DIVIDE() { return 111; }

    static get F1() { return 112; }
    static get F2() { return 113; }
    static get F3() { return 114; }
    static get F4() { return 115; }
    static get F5() { return 116; }
    static get F6() { return 117; }
    static get F7() { return 118; }
    static get F8() { return 119; }
    static get F9() { return 120; }
    static get F10() { return 121; }
    static get F11() { return 122; }
    static get F12() { return 123; }

    static get NUM_LOCK() { return 144; }
    static get SCROLL_LOCK() { return 145; }

    static get SEMI_COLON() { return 186; }
    static get EQUAL() { return 187; }
    static get COMMA() { return 188; }
    static get DASH() { return 189; }
    static get PERIOD() { return 190; }
    static get SLASH() { return 191; }
    static get GRAVE_ACCENT() { return 192; }
    static get OPEN_BRACKET() { return 219; }
    static get BACKSLASH() { return 220; }
    static get CLOSE_BRACKET() { return 221; }
    static get SINGLE_QUOTE() { return 222; }

    static get COLON() { return [KeyCode.SEMI_COLON, KeyCode.SHIFT]; }
    static get PLUS() { return [KeyCode.EQUAL, KeyCode.SHIFT]; }
    static get SMALLER_THAN() { return [KeyCode.COMMA, KeyCode.SHIFT]; }
    static get UNDERSCORE() { return [KeyCode.DASH, KeyCode.SHIFT]; }
    static get GREATER_THAN() { return [KeyCode.PERIOD, KeyCode.SHIFT]; }
    static get QUESTION_MARK() { return [KeyCode.SLASH, KeyCode.SHIFT]; }
    static get TILDE() { return [KeyCode.GRAVE_ACCENT, KeyCode.SHIFT]; }
    static get OPEN_BRACE() { return [KeyCode.OPEN_BRACKET, KeyCode.SHIFT]; }
    static get VERTICAL_BAR() { return [KeyCode.BACKSLASH, KeyCode.SHIFT]; }
    static get CLOSE_BRACE() { return [KeyCode.CLOSE_BRACKET, KeyCode.SHIFT]; }
    static get DOUBLE_QUOTE() { return [KeyCode.SINGLE_QUOTE, KeyCode.SHIFT]; }
    
    static get EXCLAMATION_MARK() { return [KeyCode.N_1, KeyCode.SHIFT]; }
    static get AT() { return [KeyCode.N_2, KeyCode.SHIFT]; }
    static get HASHTAG() { return [KeyCode.N_3, KeyCode.SHIFT]; }
    static get DOLLAR() { return [KeyCode.N_4, KeyCode.SHIFT]; }
    static get PERCENTAGE() { return [KeyCode.N_5, KeyCode.SHIFT]; }
    static get CARET() { return [KeyCode.N_6, KeyCode.SHIFT]; }
    static get AND() { return [KeyCode.N_7, KeyCode.SHIFT]; }
    static get MULTIPLY() { return [KeyCode.N_8, KeyCode.SHIFT]; }
    static get OPEN_PARENTHESIS() { return [KeyCode.N_9, KeyCode.SHIFT]; }
    static get CLOSE_PARENTHESIS() { return [KeyCode.N_0, KeyCode.SHIFT]; }
}