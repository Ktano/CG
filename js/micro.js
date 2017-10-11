var camera;
var scene;
var renderer;
var car;

/* Constants*/
HEIGHT = 900;
WIDTH = 1500;
ACC = 0.05;
MAX_SPEED = 15;
DEC = 0.2;

function render() {
    "use strict";
    renderer.render(scene, camera);
}



function createScene() {
    "use strict";

    scene = new THREE.Scene();
    scene.add(new THREE.AxisHelper(10));

    createCourse(0, 0, 0);    
    createOrangeObstacle(50, 95);
    createOrangeObstacle(-375, 45);
    createOrangeObstacle(700, -325);
    createButterObstacle(-375, -150);
    createButterObstacle(25, 30);
    createButterObstacle(350, 55);
    createButterObstacle(450, 230);
    createButterObstacle(500, -300);

    createCar(400, 0, 350);

}

function createCamera() {
    "use strict";
    var aspectRatio = window.innerWidth / window.innerHeight;

    camera = new THREE.OrthographicCamera(HEIGHT * aspectRatio / -2, HEIGHT * aspectRatio / 2, HEIGHT / 2, HEIGHT / -2, 1, 1000);

    camera.position.x = 0;
    camera.position.y = 100;
    camera.position.z = 0;
    camera.lookAt(scene.position);

}

function init() {
    "use strict";

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();
    createCamera();

    render();

    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup",onKeyUp);
}

function createOrangeObstacle(x, z) {
    "use strict";

    var obstacle = new THREE.Object3D();
    obstacle.userData = {
        moving: false,
        gameObject: true
    };
    addOrange(obstacle, 0, 0, 0);

    scene.add(obstacle);
    obstacle.position.x = x;
    obstacle.position.y = 21;
    obstacle.position.z = z;
}

function createButterObstacle(x, z) {
    "use strict";

    var obstacle = new THREE.Object3D();
    obstacle.userData = {
        moving: false,
        gameObject: true
    };
    addButter(obstacle, 0, 0, 0);

    scene.add(obstacle);
    obstacle.position.x = x;
    obstacle.position.y = 21;
    obstacle.position.z = z;
}

function createCar(x, y, z) {
    "use strict";

    car = new THREE.Object3D();

    car.userData = {
        moving: false,
        direction: new THREE.Vector3(-1, 0, 0),
        speed: 0,
        turning: 0,
        accelarating: 0,
        gameObject: true
    };
    addWing(car, -12.5, 1.5, 0);
    addWing(car, +13, 7.5, 0);
    addBody(car, 3.75, 2.5, 0);
    addFrontWingConnection(car, -8.75, 1.5, 0);
    addBackWingConnection(car, 13, +1.5 + 4, 0);
    addWheel(car, -8.75, 1.5, 5);
    addWheel(car, -8.75, 1.5, -5);
    addWheel(car, +12, 1.5, 5.75);
    addWheel(car, +12, 1.5, -5.75);
    addFrontWheelConnections(car, -8.75, 1.5, 3);
    addFrontWheelConnections(car, -8.75, 1.5, -3);

    scene.add(car);
    car.position.x = x;
    car.position.y = y;
    car.position.z = z;
}

function addWheel(obj, x, y, z) {
    var geometry = new THREE.TorusGeometry(1.5, 0.75, 16, 100)
    var material = new THREE.MeshBasicMaterial({
        color: 0x000,
        wireframe: false
    });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);


    obj.add(mesh);
}


function addWing(obj, x, y, z) {
    "use strict";

    var geometry = new THREE.CubeGeometry(2.5, 1, 15);

    var material = new THREE.MeshBasicMaterial({
        color: 0xFF0000,
        wireframe: false
    });

    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);

    obj.add(mesh);
}

function addBody(obj, x, y, z) {
    "use strict";

    var geometry = new THREE.CubeGeometry(20, 3, 10);

    var material = new THREE.MeshBasicMaterial({
        color: 0xFF0000,
        wireframe: false
    });

    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);

    obj.add(mesh);
}

function addFrontWingConnection(obj, x, y, z) {
    "use strict";

    var geometry = new THREE.CubeGeometry(5, 1, 2.5);

    var material = new THREE.MeshBasicMaterial({
        color: 0xFF0000,
        wireframe: false
    });

    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);

    obj.add(mesh);
}

function addBackWingConnection(obj, x, y, z) {
    "use strict";

    var geometry = new THREE.CubeGeometry(1, 3, 5);

    var material = new THREE.MeshBasicMaterial({
        color: 0xFF0000,
        wireframe: false
    });

    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);

    obj.add(mesh);
}

function addFrontWheelConnections(obj, x, y, z) {
    "use strict";

    var geometry = new THREE.CubeGeometry(1, 1, 4);

    var material = new THREE.MeshBasicMaterial({
        color: 0xFF0000,
        wireframe: false
    });

    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);

    obj.add(mesh);
}

function createCourse(x, y, z) {
    "use strict";

    var table = new THREE.Object3D();

    var material = new THREE.MeshBasicMaterial({
        color: 0xF0EAD6,
        wireframe: false
    });

    addTable(table, 0, 0, 0, material);

    var course = course1();
    var arraylen = course.length;
    for (var i = 0; i < arraylen; i++) {
        addCheerio(table, course[i][0] + Math.random() * 10 - 5, 2.5, course[i][1] + Math.random() * 10 - 5);
    }

    scene.add(table);

    table.position.x = x;
    table.position.y = y;
    table.position.z = z;
}

function addTable(obj, x, y, z, material) {
    "use strict";

    var geometry = new THREE.CubeGeometry(WIDTH, 2, HEIGHT);
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);

    obj.add(mesh);

}

function addCheerio(obj, x, y, z) {

    var geometry = new THREE.TorusGeometry(5, 2, 16, 100)
    var material = new THREE.MeshBasicMaterial({
        color: randomColor(),
        wireframe: false
    });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);

    mesh.rotation.x = Math.PI / 2;
    obj.add(mesh);
}

function addButter(obj, x, y, z) {

    var geometry = new THREE.CubeGeometry(100, 40, 50)
    var material = new THREE.MeshBasicMaterial({
        color: 0xF3EF7D,
        wireframe: false
    });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);

    mesh.rotation.y = Math.random() * Math.PI * 2 - Math.PI;
    obj.add(mesh);
}

function addOrange(obj, x, y, z) {
    var geometry = new THREE.SphereGeometry(20, 15, 15)
    var material = new THREE.MeshBasicMaterial({
        color: 0xFF8C00,
        wireframe: false
    });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);

    obj.add(mesh);
}



function randomColor() {
    colors = [0xee75be, 0x6e1fd4, 0x980606, 0xd09422, 0x97c14d, 0x6897bb]
    return colors[Math.floor(Math.random() * colors.length)]
}

function onResize() {
    "use strict";

    renderer.setSize(window.innerWidth, window.innerHeight);
    var aspectRatio = window.innerWidth / window.innerHeight;
    if (window.innerHeight > 0 && window.innerWidth > 0 && camera.isOrthographicCamera) {
        if (aspectRatio > WIDTH / HEIGHT) {
            camera.left = HEIGHT * aspectRatio / -2;
            camera.right = HEIGHT * aspectRatio / 2;
            camera.top = HEIGHT / 2;
            camera.bottom = HEIGHT / -2;
        } else {
            camera.left = WIDTH / -2;
            camera.right = WIDTH / 2;
            camera.top = WIDTH / aspectRatio / 2;
            camera.bottom = WIDTH / aspectRatio / -2;
        }
    }

    camera.updateProjectionMatrix();
}

function onKeyDown(e) {
    "use strict";

    switch (e.keyCode) {
        case 65: //A
        case 97: //a
            scene.traverse(function (node) {
                if (node.userData.gameObject) {
                    node.traverse(function (node) {
                        if (node instanceof THREE.Mesh)
                            node.material.wireframe = !node.material.wireframe;
                    });

                }
            });
            break;
        case 37: //Arrow left
            car.userData.turning = 1;
            break;
        case 38: //Arrow Up
            car.userData.moving = true
            car.userData.accelarating = +1;
            break;
        case 39: //Arrow right
            car.userData.turning = -1;
            break;
        case 40: //Arrow Down
            car.userData.moving = true
            car.userData.accelarating = -1;
            break;
    }
}

function onKeyUp(e) {
    "use strict";

    switch (e.keyCode) {
        case 37: //Arrow left
            car.userData.turning = 0;
            break;
        case 38: //Arrow Up
            car.userData.moving = false
            car.userData.accelarating = 0;
            break;
        case 39: //Arrow right
            car.userData.turning = 0;
            break;
        case 40: //Arrow Down
            car.userData.moving = false
            car.userData.accelarating = 0;
            break;
    }
}


function animate() {
    "use strict";


    if(car.userData.turning!=0)
    {
        var axis = new THREE.Vector3( 0, 1, 0 ); 
        var angle = 0.2*car.userData.turning;
        car.userData.direction.applyAxisAngle(axis, angle);
        car.rotation.y += 0.2*car.userData.turning;
    }


    if(car.userData.moving){

        if(car.userData.accelarating!=0){

            car.userData.speed+=car.userData.accelarating*ACC;
            if(car.userData.speed>MAX_SPEED){
                car.userData.speed=MAX_SPEED;
            }
            if(car.userData.speed<-MAX_SPEED){
                car.userData.speed=-MAX_SPEED;
            }
            var d = new THREE.Vector3;
            d.copy(car.userData.direction);
            car.position.add(d.multiplyScalar(car.userData.speed));
        }
    }
    else{
        if(car.userData.speed<0){
            car.userData.speed+=DEC;
            if(car.userData.speed>0)
            car.userData.speed=0;
        }
        if(car.userData.speed>0){
            car.userData.speed-=DEC;
            if(car.userData.speed<0)
            car.userData.speed=0;
        }
        var d = new THREE.Vector3;
        d.copy(car.userData.direction);
        car.position.add(d.multiplyScalar(car.userData.speed));
    }

    render();
    requestAnimationFrame(animate);
}