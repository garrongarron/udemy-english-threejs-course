import CameraController from "./CameraController.js"
import machine from "../LoopMachine.js"
import DisplacementController from "./DisplacementController.js"
import InputController from "./InputController.js"
import AnimationController from "./AnimationController.js"
import RotationController from "./RotationController.js"

class CharacterController {
    constructor(mesh) {
        this.mesh = mesh
        this.components = []
        this.flag = false
        this.components.push(new InputController())
        this.components.push(new AnimationController())
        this.components.push(new DisplacementController())
        this.components.push(new RotationController())
        this.components.push(new CameraController())
    }
    run() {
        if (!this.flag) return
        this.components.forEach(component => {
            component.run()
        })
    }
    start() {
        if (this.flag) return
        this.flag = true
        this.components.forEach(component => {
            component.setPlayer(this)
            if (component.start) component.start()
        })
        machine.addCallback(this.run.bind(this))
    }
    stop() {
        this.flag = false
        machine.removeCallback(this.run.bind(this))
        this.components.forEach(component => {
            if (component.stop) component.stop()
        })
    }
}
export default CharacterController