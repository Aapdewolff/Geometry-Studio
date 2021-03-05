class CubeRotator {
    speed = 1.5;

    update() {
        this.actor.rotation.add(new Vector3(this.actor.position.x, 0, this.actor.position.y).normalized.multiplyByNumber(this.speed * Time.deltaTime * 60));
    }
}

Application.registerScript(CubeRotator);