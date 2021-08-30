
import eventBus from "../EventBus.js"
import keyListener from "../KeyListener.js"
import AnimatorModeAdapter from "./AnimatorModeAdapter.js"

class AnimationController {
    setPlayer(player) {
        this.player = player
        this.animatorAdapter = new AnimatorModeAdapter(this.player.mesh, this.player.mesh.modes)
        this.player.isJumping = false
    }
    run() {
        if(!this.animatorAdapter.animator.inProgress){
            this.player.isJumping = false
        }
        if (keyListener.isPressed(32)) {
            this.animatorAdapter.setMode('normal')
            this.animatorAdapter.run('jump')
            this.player.isJumping = true
        } else {
            if (this.player.x != 0 || this.player.y != 0) this.animatorAdapter.run('ahead')
            if (this.player.x == 0 && this.player.y == 0) this.animatorAdapter.run('idle')
        }
    }
    keyListener(data) {
        if (data[0] == 16) {
            this.animatorAdapter.setMode((data[1]) ? 'run' : 'normal')
        }
    }
    start() {
        this.animatorAdapter.start()
        eventBus.subscribe('keyListener', this.keyListener.bind(this))
    }
    stop() {
        this.animatorAdapter.stop()
        eventBus.unSubscribe('keyListener', this.keyListener.bind(this))
    }
}
export default AnimationController