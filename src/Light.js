const light = new THREE.AmbientLight(0x404040);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
light.add(directionalLight)
directionalLight.position.set(3, 4, -5)

export default light