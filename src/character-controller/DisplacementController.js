import eventBus from "../EventBus.js";

class DisplacementController {
    setPlayer(player) {
        this.player = player
        this.v2 = new THREE.Vector2();
        this.speedReference = 1.5
        this.speed = this.speedReference
        this.clock = new THREE.Clock();
        this.timer = new Date().getTime()
    }
    run() {
        const delta = this.clock.getDelta();
        if (this.player.x == 0 && this.player.y == 0)
            this.timer = new Date().getTime()
        if (this.player.animator.inProgress) {
            this.timer = new Date().getTime()
            return
        }
        if(this.timer +200 > new Date().getTime()) return
        this.v2.set(-this.player.x, this.player.y).normalize()
        this.player.mesh.position.x += this.v2.x * this.speed * delta
        this.player.mesh.position.z += this.v2.y * this.speed * delta
    }
    keyListener(data) {
        if (data[0] == 16) {
            this.speed = (data[1]) ? this.speedReference * 2 : this.speedReference
        }
    }
    start() {
        eventBus.subscribe('keyListener', this.keyListener.bind(this))
    }
    stop() {
        eventBus.unSubscribe('keyListener', this.keyListener.bind(this))
    }
}

export default DisplacementController