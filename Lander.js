import cube from "./Cube.js";
import loopMachine from "./LoopMachine.js";
import scene from "./Scene.js";

class Lander {
    constructor() {
        this.raycaster = new THREE.Raycaster();
        this.target = null
        this.distanceToGround = null
    }
    start(target, distanceToGround = .5) {
        this.target = target
        this.distanceToGround = distanceToGround
        loopMachine.addCallback(this.shot.bind(this))
    }
    shot() {
        this.raycaster.layers.set(1);
        let direction = this.target.up.negate().normalize()
        this.raycaster.set(this.target.position, direction)
        let x = this.raycaster.intersectObjects(scene.children)[0];
        if (x) {
            cube.position.y -= x.distance - this.distanceToGround
        }
    }
    stop() {
        loopMachine.removeCallback(this.shot.bind(this))
    }
}

const lander = new Lander()

export default lander