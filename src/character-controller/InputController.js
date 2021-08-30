import eventBus from "../EventBus.js"
import keyListener from "../KeyListener.js"

class InputController {
    setPlayer(player) {
        this.player = player
        this.player.x = 0
        this.player.y = 0
    }
    run() {
        this.player.x = 0
        this.player.y = 0
        if (this.player.isJumping) return
        if (keyListener.isPressed(65)) this.player.x -= 1
        if (keyListener.isPressed(68)) this.player.x += 1
        if (keyListener.isPressed(87)) this.player.y += 1
        if (keyListener.isPressed(83)) this.player.y -= 1
    }
    dispatchKeys(data) {
        eventBus.dispatch('keyListener', data)
    }
    start() {
        keyListener.start()
        keyListener.setCaster(this.dispatchKeys)
    }
    stop(){
        keyListener.stop()
    }
}

export default InputController