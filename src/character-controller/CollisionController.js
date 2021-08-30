import scene from "../Scene.js";

class CollisionController {
    setPlayer(player) {
        this.player = player
        this.position = null
        this.size = new THREE.Vector3(.25, 1.6, .25)
        this.boxWraper = new THREE.Box3();
        this.meshWraper = new THREE.Box3();
        this.helper = new THREE.Box3Helper(this.meshWraper, 0xffff00);
        this.isColliding = false
        this.isJumping = false
        this.flag = false
        this.objectList = {}
        this.player.collision = this
        this.timeToChekIfNear = new Date().getTime()
        this.intervalTime = 2
        this.validateFlag = false
    }
    addObject(obj, radio = 3) {
        let status = false
        let isNear = false
        this.objectList[obj.uuid] = { obj, status, isNear, radio }
    }
    removeObject(obj) {
        this.objectList = this.objectList.filter(o => o != obj)
    }
    run() {
        this.position = this.player.mesh.position.clone()
        this.position.y += (this.flag) ? 1.2 : .8
        this.meshWraper.setFromCenterAndSize(this.position, this.size)
        this.validate()
    }
    validate() {
        if (this.timeToChekIfNear < new Date().getTime()) {
            this.timeToChekIfNear = new Date().getTime() + this.intervalTime * 1000 + 1 * Math.random() * 1000
            this.validateFlag = false
            Object.values(this.objectList).forEach(element => {
                element.isNear = (element.obj.position.distanceTo(this.player.mesh.position) < element.radio)
                if (element.isNear) this.validateFlag = true
            })
        }
        if(!this.validateFlag) return
        Object.values(this.objectList).forEach(element => {
            if (!element.isNear) return
            let obj = element.obj
            this.boxWraper.setFromObject(obj)
            let collide = this.meshWraper.intersectsBox(this.boxWraper)
            if (!this.objectList[obj.uuid].status && collide) {
                this.player.eventBus.dispatch('onTriggerEnter', obj)
            }
            if (this.objectList[obj.uuid].status && !collide) {
                this.player.eventBus.dispatch('onTriggerExit', obj)
            }
            this.objectList[obj.uuid].status = collide
        })
    }
    delay() {
        setTimeout(() => { this.flag = true }, 800);
        setTimeout(() => { this.flag = false }, 1000);
    }
    jumping(flag) {
        this.jumping = flag
        if (flag) this.delay()
    }
    start() {
        scene.add(this.helper);
        this.player.eventBus.subscribe('jumping', this.jumping.bind(this))
    }
    stop() {
        scene.remove(this.helper);
    }
}

export default CollisionController
