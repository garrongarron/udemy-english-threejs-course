import box from './Box.js'
import camera from './Camera.js';
import CharacterController from './character-controller/CharacterController.js';
import Xbot from './character/Xbot.js';
import light from './Light.js';
import machine from './LoopMachine.js';
import renderer from './Renderer.js';
import resize from './Resize.js';
import scene from './Scene.js';

scene.add(box)
camera.position.set(0, 3, -3)
camera.lookAt(box.position)
scene.add(light)
resize.start(renderer)
let characterController = null
machine.addCallback(() => {
    if(characterController) characterController.run()
    // box.rotation.y += 0.01
    renderer.render(scene, camera);
})
Xbot.then(mesh => {
    scene.add(mesh)
    mesh.modes = Xbot.modes
    characterController = new CharacterController(mesh)
    characterController.start()
})
machine.start()