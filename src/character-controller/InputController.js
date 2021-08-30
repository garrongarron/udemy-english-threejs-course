import keyListener from "../KeyListener.js"

class InputController {
    setPlayer(player) {
        this.player = player
        this.player.x = 0
        this.player.y = 0
        this.isJumping = false
    }
    run() {
        this.player.x = 0
        this.player.y = 0
        if (this.isJumping) return
        if (keyListener.isPressed(65)) this.player.x -= 1
        if (keyListener.isPressed(68)) this.player.x += 1
        if (keyListener.isPressed(87)) this.player.y += 1
        if (keyListener.isPressed(83)) this.player.y -= 1
    }
    jumping(flag) {
        this.isJumping = flag
    }
    start() {
        this.player.eventBus.subscribe('jumping', this.jumping.bind(this))
    }
    stop(){
        this.player.eventBus.unSubscribe('jumping', this.jumping.bind(this))
    }
}

export default InputController