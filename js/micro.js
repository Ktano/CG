var camera, scene, renderer;

function render() {
    'use strict'
    renderer.render(scene, camera);
}

function createScene() {
    'use strict'
    
    scene= new THREE.Scene();
    scene.add(new THREE.AxisHelper(10));
}

function createCamera(){
    'use strict';

    camera= new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight,1,1000)

    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 100;
    camera.lookAt(scene.position)

}

function init() {
    'use strict';

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();
    createCamera();
    
    render();
}