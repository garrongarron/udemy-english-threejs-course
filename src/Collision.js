import box from "./Box.js";
import Xbot from "./character/Xbot.js";
import machine from "./LoopMachine.js";
import scene from "./Scene.js";


Xbot.then(mesh => {
    console.log(mesh);
    let size = new THREE.Vector3(.5, 1.6, .5)
    let position = new THREE.Vector3()
    const boxWraper = new THREE.Box3();
    const meshWraper = new THREE.Box3();
    const helper = new THREE.Box3Helper(meshWraper, 0xffff00);
    scene.add(helper);
    machine.addCallback(() => {
        // meshWraper.setFromObject(mesh)
        position = mesh.position.clone()
        position.y += 1.2
        meshWraper.setFromCenterAndSize(position, size)
        boxWraper.setFromObject(box)
        if (meshWraper.intersectsBox(boxWraper)) {
            box.material.color = new THREE.Color(0xff0000)
        } else {
            box.material.color = new THREE.Color(0xffff000)
        }
    })
})