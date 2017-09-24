var camera, scene, renderer;
function render() {
    'use strict'
    renderer.render(scene, camera);
}

function createScene() {
    'use strict'
    
    scene= new THREE.Scene();
    scene.add(new THREE.AxisHelper(10));

    createCourse(0,0,0);
}

function createCamera(){
    'use strict';

    camera= new THREE.OrthographicCamera(-100, 100, 100, -100, 1, 1000 );

   camera.position.x = 0;
   camera.position.y = 100;
   camera.position.z = 0;
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

function createCourse(x,y,z){
    'use strict';

    var table = new THREE.Object3D();

    var material = new THREE.MeshBasicMaterial({color: 0xF0EAD6, wireframe: false});

    addTable(table,0,0,0, material);

    scene.add(table);

    table.position.x=x;
    table.position.y=y;
    table.position.z=z;
}

function addTable(obj, x, y, z, material){
    'use strict';

    var geometry = new THREE.CubeGeometry(200,2,200);
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x,y,z);

    obj.add(mesh);

}