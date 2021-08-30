class RotationController {
    setPlayer(player) {
        this.player = player
        this.rotation = { x: 0, y: 0 }
        this.v2 = new THREE.Vector2();
        this.interpolation = .1
    }
    run() {
        this.rotation.x = THREE.MathUtils.lerp(this.rotation.x, -this.player.x, this.interpolation)
        this.rotation.y = THREE.MathUtils.lerp(this.rotation.y, this.player.y, this.interpolation)
        this.player.mesh.rotation.y = this.v2.set(this.rotation.y, this.rotation.x).angle()
    }
}

export default RotationController