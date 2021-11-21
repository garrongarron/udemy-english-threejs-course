import keyListener from "./KeyListener.js"
import loopMachine from "./LoopMachine.js"

class CubeController{
    constructor(){
        this.speed = .2
        this.target = null
    }
    start(target){
        this.target = target
        loopMachine.addCallback(this.move.bind(this))
    }
    move(){
        this.target.position.x += (keyListener.isPressed(68))?this.speed:0
        this.target.position.x -= (keyListener.isPressed(65))?this.speed:0
        this.target.position.z -= (keyListener.isPressed(87))?this.speed:0
        this.target.position.z += (keyListener.isPressed(83))?this.speed:0
    }
    stop(){
        loopMachine.removeCallback(this.move.bind(this))
    }
}

const cubeController = new CubeController()

export default cubeController