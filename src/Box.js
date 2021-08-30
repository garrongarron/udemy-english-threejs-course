const geometry = new THREE.BoxGeometry(1, 1, 1);
// const geometry = new THREE.BoxGeometry(100, 1, 100);
const material = new THREE.MeshPhongMaterial({ color: 0xffff00 });
const box = new THREE.Mesh(geometry, material);
box.position.y = 2.5
box.position.set(2, 0, 0)
export default box