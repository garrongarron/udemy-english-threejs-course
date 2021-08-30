import camera from "../Camera.js"

class CameraController {
    setPlayer(player) {
        this.player = player
        this.ratget = new THREE.Vector3()
    }
    run() {
        camera.position.x = this.player.mesh.position.x
        camera.position.z = this.player.mesh.position.z - 3
        this.ratget.set(this.player.mesh.position.x, this.player.mesh.position.y + 1, this.player.mesh.position.z)
        camera.lookAt(this.ratget)
    }
}
export default CameraController