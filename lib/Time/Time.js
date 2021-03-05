class Time {
    static #time_ = 0;
    static #prevTime_ = 0;
    static #deltaTime_ = 0;

    static get time() { return Time.#time_; }
    static set time(value) {console.error("Time.time is readonly!"); }

    static get deltaTime() { return Time.#deltaTime_; }
    static set deltaTime(value) {console.error("Time.deltaTime is readonly!"); }

    static update() {
        const now = new Date().getTime() / 1000;
        Time.#deltaTime_ = now - Time.#prevTime_;
        Time.#time_ += Time.#deltaTime_;
        Time.#prevTime_ = now;
    }
}