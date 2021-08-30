import scene from "../Scene.js";

class CollisionController {
    setPlayer(player) {
        this.player = player
        this.player.onTriggerEnter = this.onTriggerEnter.bind(this)
        this.player.onTriggerExit = this.onTriggerExit.bind(this)
        this.player.collisionWith = this.addObject.bind(this)
        this.player.collisionWithUndo = this.removeObject.bind(this)
        this.position = null
        this.size = new THREE.Vector3(.25, 1.6, .25)
        this.boxWraper = new THREE.Box3();
        this.meshWraper = new THREE.Box3();
        this.helper = new THREE.Box3Helper(this.meshWraper, 0xffff00);
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
        //identify closer elements
        if (this.timeToChekIfNear < new Date().getTime()) {
            this.timeToChekIfNear = new Date().getTime() + this.intervalTime * 1000 + 1 * Math.random() * 1000
            this.validateFlag = false
            Object.values(this.objectList).forEach(element => {
                element.isNear = (element.obj.position.distanceTo(this.player.mesh.position) < element.radio)
                if (element.isNear) this.validateFlag = true
            })
        }
        if(!this.validateFlag) return// no elements around
        Object.values(this.objectList).forEach(element => {
            if (!element.isNear) return // only near elements
            let obj = element.obj
            this.boxWraper.setFromObject(obj)
            //handling collisions
            let collided = this.meshWraper.intersectsBox(this.boxWraper)
            if (!this.objectList[obj.uuid].status && collided) {
                this.player.eventBus.dispatch('onTriggerEnter', obj)
            }
            if (this.objectList[obj.uuid].status && !collided) {
                this.player.eventBus.dispatch('onTriggerExit', obj)
            }
            this.objectList[obj.uuid].status = collided
        })
    }
    delay() {
        setTimeout(() => { this.flag = true }, 800);
        setTimeout(() => { this.flag = false }, 1000);
    }
    jumping(isJumping) {
        if (isJumping) this.delay()
    }
    onTriggerEnter(obj, callback){
        this.player.eventBus.subscribe('onTriggerEnter', (innerObj) => {
            if (obj === innerObj) callback()
        })
    }
    onTriggerExit(obj, callback){
        this.player.eventBus.subscribe('onTriggerExit', (innerObj) => {
            if (obj === innerObj) callback()
        })
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
