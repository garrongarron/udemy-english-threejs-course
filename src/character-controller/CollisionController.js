import box from "../Box.js";
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
    }
    run() {
        this.position = this.player.mesh.position.clone()
        this.position.y += (this.flag)?1.2:.8
        this.meshWraper.setFromCenterAndSize(this.position, this.size)
        this.boxWraper.setFromObject(box)
        if (this.meshWraper.intersectsBox(this.boxWraper)){
            box.material.color = new THREE.Color(0xff0000)
        } else{
            box.material.color = new THREE.Color(0xffff000) 
        }
        if(this.player.isJumping && !this.isJumping){
            this.isJumping = true
            this.delay()
        }
        if(!this.player.isJumping){
            this.isJumping = false
        } 
    }
    delay(){
        setTimeout(() => {
            this.flag = true
        }, 800);
        setTimeout(() => {
            this.flag = false
        }, 1000);
    }
    start() {
        scene.add(this.helper);
    }
    stop() {
        scene.remove(this.helper);
    }
}


export default CollisionController
