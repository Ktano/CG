var camera;
var camera0, camera1, camera2;
var currentCamera;
var scene;
var renderer;
var car;
var updateCamera = false;
var resized = false;
var clock = new THREE.Clock(true);
var orangeClock = new THREE.Clock(true);
var currentMultiplier = 1;
var oranges = [];

var light;
var updatelights = true;
var disablelight = false;
var materialindex = 0;
var day = true;
var disablecandels=false;
/* Constants*/
HEIGHT = 900;
WIDTH = 1500;
ACC = 0.05;
MAX_SPEED = 12;
DEC = 0.1;
ORANGE_SPEED_MULTIPLIER = 1.2;
MAX_MULTIPLIER = 3;
NUMBER_ORANGES = 4

function render() {
    "use strict";
    renderer.render(scene, camera);
}



function createScene() {
    "use strict";

    scene = new THREE.Scene();
    scene.add(new THREE.AxisHelper(10));

    createCourse(0, 0, 0);
    /*
        createOrangeObstacle(50, 95);
        createOrangeObstacle(-375, 45);
        createOrangeObstacle(700, -325);
    */
    createButterObstacle(-375, -150);
    createButterObstacle(25, 30);
    createButterObstacle(350, 55);
    createButterObstacle(450, 230);
    createButterObstacle(500, -300);
    createDirectionalLight(450, 300, 0);
    createCar(400, 0, 350);

}

function createDirectionalLight(x, y, z) {
    light = new THREE.DirectionalLight();

    light.position.x = x;
    light.position.y = y;
    light.position.z = z;
    scene.add(light);
}

function createCamera() {
    "use strict";
    var aspectRatio = window.innerWidth / window.innerHeight;

    camera0 = new THREE.OrthographicCamera(HEIGHT * aspectRatio / -2, HEIGHT * aspectRatio / 2, HEIGHT / 2, HEIGHT / -2, 1, 1000);

    camera0.position.x = 0;
    camera0.position.y = 100;
    camera0.position.z = 0;
    camera0.lookAt(scene.position);
    camera = camera0;
}

function createPerspectiveCamera() {
    "use strict";
    var aspectRatio = window.innerWidth / window.innerHeight;
    camera1 = new THREE.PerspectiveCamera(45, aspectRatio, 1, 10000);

    camera1.position.x = 1500;
    camera1.position.y = 500;
    camera1.position.z = -400;
    camera1.lookAt(scene.position);

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
    createPerspectiveCamera();
    currentCamera = 0
    render();
    clock.start();
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
}

function createOrangeObstacle(x, z, dir, sp) {
    "use strict";

    var obstacle = new colidable();
    obstacle.userData = {
        type: "orange",
        moving: false,
        gameObject: true,
        direction: dir,
        speed: sp
    };


    addOrange(obstacle, 0, 0, 0);
    addCaule(obstacle, 0, 22.5, 0)
    scene.add(obstacle);
    obstacle.position.x = x;
    obstacle.position.y = 21;
    obstacle.position.z = z;
    obstacle.updateboundings();
    return obstacle;
}

function addCaule(obj, x, y, z) {
    var geometry = new THREE.CylinderGeometry(2, 2, 5, 32);
    var mesh = new THREE.Mesh(geometry);
    mesh.userData = {
        materials: [new THREE.MeshBasicMaterial({
                color: 0x00FF00,
                wireframe: false
            }),
            new THREE.MeshLambertMaterial({
                color: 0x00FF00,
                wireframe: false
            }),
            new THREE.MeshPhongMaterial({
                color: 0x00FF00,
                wireframe: false
            })
        ]
    }
    mesh.material = mesh.userData.materials[0];
    mesh.position.set(x, y, z);

    obj.add(mesh);
}

function createButterObstacle(x, z) {
    "use strict";

    var obstacle = new colidable();
    obstacle.userData = {
        type: "butter",
        moving: false,
        gameObject: true
    };
    addButter(obstacle, 0, 0, 0);

    scene.add(obstacle);
    obstacle.position.x = x;
    obstacle.position.y = 21;
    obstacle.position.z = z;
    obstacle.updateboundings();
}

function createCar(x, y, z) {
    "use strict";

    car = new colidable();

    car.userData = {
        type: "car",
        moving: false,
        direction: new THREE.Vector3(-1, 0, 0),
        speed: 0,
        turning: 0,
        accelarating: 0,
        gameObject: true,
        startposition: new THREE.Vector3(400, 3, 350)
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
    addCamera(car, 50, 25);
    scene.add(car);
    car.position.copy(car.userData.startposition);

    car.updateboundings();
}


function addCamera(obj, x, y) {
    "use strict";
    var aspectRatio = window.innerWidth / window.innerHeight;
    camera2 = new THREE.PerspectiveCamera(45, aspectRatio, 1, 10000);

    camera2.position.x = x;
    camera2.position.y = y;
    camera2.lookAt(new THREE.Vector3(-20, 5, 0));
    obj.add(camera2);
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


    addTable(table, 0, 0, 0);

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

function addTable(obj, x, y, z) {
    "use strict";

    var geometry = new THREE.CubeGeometry(WIDTH, 2, HEIGHT);
    var mesh = new THREE.Mesh(geometry);

    mesh.userData = {
        materials: [new THREE.MeshBasicMaterial({
                color: 0xF0EAD6,
                wireframe: false
            }),
            new THREE.MeshLambertMaterial({
                color: 0xF0EAD6,
                wireframe: false
            }),
            new THREE.MeshPhongMaterial({
                color: 0xF0EAD6,
                wireframe: false
            })
        ]
    };
    mesh.material = mesh.userData.materials[0];
    mesh.position.set(x, y, z);


    obj.add(mesh);

}

function addCheerio(obj, x, y, z) {
    var cheerio = new colidable();
    var geometry = new THREE.TorusGeometry(5, 2, 16, 100);
    var color = randomColor();

    cheerio.userData = {
        type: "cheerio",
        direction: new THREE.Vector3(0, 0, 0),
        speed: 0,
        color: color,

    }

    var mesh = new THREE.Mesh(geometry);
    mesh.userData = {
        materials: [new THREE.MeshBasicMaterial({
            color: color,
            wireframe: false
        }), new THREE.MeshLambertMaterial({
            color: color,
            wireframe: false
        }), , new THREE.MeshPhongMaterial({
            color: color,
            wireframe: false
        })]
    }
    mesh.material = mesh.userData.materials[0];
    mesh.position.set(x, y, z);

    mesh.rotation.x = Math.PI / 2;
    cheerio.add(mesh);
    cheerio.updateboundings();
    obj.add(cheerio);
}

function addButter(obj, x, y, z) {

    var geometry = new THREE.CubeGeometry(100, 40, 50)

    var mesh = new THREE.Mesh(geometry);
    mesh.position.set(x, y, z);
    mesh.userData = {
        materials: [
            new THREE.MeshBasicMaterial({
                color: 0xF3EF7D,
                wireframe: false
            }),
            new THREE.MeshLambertMaterial({
                color: 0xF3EF7D,
                wireframe: false
            }),
            new THREE.MeshPhongMaterial({
                color: 0xF3EF7D,
                wireframe: false
            })
        ]
    }
    mesh.material = mesh.userData.materials[0];
    mesh.rotation.y = Math.random() * Math.PI * 2 - Math.PI;
    obj.add(mesh);
}

function addOrange(obj, x, y, z) {
    var geometry = new THREE.SphereGeometry(20, 15, 15)

    var mesh = new THREE.Mesh(geometry);
    mesh.userData = {
        materials: [new THREE.MeshBasicMaterial({
                color: 0xFF8C00,
                wireframe: false
            }),
            new THREE.MeshLambertMaterial({
                color: 0xFF8C00,
                wireframe: false
            }),
            new THREE.MeshPhongMaterial({
                color: 0xFF8C00,
                wireframe: false
            })
        ]
    };

    mesh.material = mesh.userData.materials[0];
    mesh.position.set(x, y, z);

    obj.add(mesh);
}

function intercept(current, other) {
    return interceptSphere(current, other) && interceptBox(current, other)
}

function interceptSphere(current, other) {
    var dist = current.boundingSphere.center.distanceTo(other.boundingSphere.center);
    return dist < current.boundingSphere.radius + other.boundingSphere.radius;
}

function interceptBox(current, other) {
    var box1 = current.boundingBox;
    var box2 = current.boundingBox;
    return box1.max.x > box2.min.x &&
        box1.min.x < box2.max.x &&
        box1.max.z > box2.min.z &&
        box1.min.z < box2.max.z &&
        box1.max.y > box2.min.y &&
        box1.min.y < box2.max.y;
}

function randomColor() {
    colors = [0xee75be, 0x6e1fd4, 0x980606, 0xd09422, 0x97c14d, 0x6897bb]
    return colors[Math.floor(Math.random() * colors.length)]
}

function onResize() {
    "use strict";
    resized = true;
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
        case 78: // N key
            day = !day;
            updatelights=true;
            break;
        case 76: // L key
            disablelight = !disablelight;
            updatelights=true;
            break;
        case 71: //g key
            materialindex = (materialindex + 1) % 2;
            updatelights=true;
            break;
        case 67: //c key
        disablecandels = !disablecandels;
        updatelights=true;
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
        case 49:
            updateCamera = true;
            currentCamera = 0;
            break;
        case 50:
            currentCamera = 1;
            updateCamera = true;
            break;
        case 51:
            currentCamera = 2;
            updateCamera = true;
            break;
    }
}


function animate() {
    "use strict";

    /* Car rotation animation*/
    if (car.userData.turning != 0 && car.userData.speed != 0) {
        var axis = new THREE.Vector3(0, 1, 0);
        var angle = 0.05 * car.userData.turning;
        car.userData.direction.applyAxisAngle(axis, angle);
        car.rotation.y += 0.05 * car.userData.turning;
    }

    /* car movement */
    if (car.userData.moving) {

        if (car.userData.accelarating != 0) {

            car.userData.speed += car.userData.accelarating * ACC;
            if (car.userData.speed > MAX_SPEED) {
                car.userData.speed = MAX_SPEED;
            }
            if (car.userData.speed < -MAX_SPEED) {
                car.userData.speed = -MAX_SPEED;
            }
            var d = new THREE.Vector3;
            d.copy(car.userData.direction);
            car.position.add(d.multiplyScalar(car.userData.speed));
        }
    } else {
        if (car.userData.speed < 0) {
            car.userData.speed += DEC;
            if (car.userData.speed > 0)
                car.userData.speed = 0;
        }
        if (car.userData.speed > 0) {
            car.userData.speed -= DEC;
            if (car.userData.speed < 0)
                car.userData.speed = 0;
        }
        var d = new THREE.Vector3;
        d.copy(car.userData.direction);
        car.position.add(d.multiplyScalar(car.userData.speed));
    }
    car.updateboundings();

    /*update cheerioes*/
    scene.traverse(function (node) {
        if (node.userData.type == "cheerio" && node.userData.speed != 0) {

            if (node.userData.speed < 0) {
                node.userData.speed += DEC;
                if (node.userData.speed > 0)
                    node.userData.speed = 0;
            }
            if (node.userData.speed > 0) {
                node.userData.speed -= DEC;
                if (node.userData.speed < 0)
                    node.userData.speed = 0;
            }
            var d = new THREE.Vector3;
            d.copy(node.userData.direction);
            node.position.add(d.multiplyScalar(node.userData.speed));
            node.updateboundings();
        }
    });

    /* Change between cameras*/
    if (updateCamera) {
        switch (currentCamera) {
            case 0:
                camera = camera0;
                resized = true;
                break;
            case 1:
                camera = camera1;
                resized = true;
                break;
            case 2:
                camera = camera2;
                resized = true;
                break;
        }
        updateCamera = false;
    }


    /*Updates a camera after resize*/
    if (resized) {
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
        } else if (window.innerHeight > 0 && window.innerWidth > 0 && camera.isPerspectiveCamera) {
            camera.aspect = aspectRatio;
        }

        camera.updateProjectionMatrix();
        resized = false;
    }

    /*Orange speed multiplier*/
    var time = clock.getElapsedTime();
    if ((time / 60) > 1) {
        currentMultiplier = Math.min(currentMultiplier * ORANGE_SPEED_MULTIPLIER, MAX_MULTIPLIER);
        clock.start();
    }

    time = orangeClock.getElapsedTime();
    /* Orange Movement*/
    if (time / (Math.floor(Math.random() * 5) + 5) > 1 && oranges.length < NUMBER_ORANGES) {
        var dir = new THREE.Vector3(Math.random() * 2 - 1, 0, Math.random() * 2 - 1).normalize()
        var orange = createOrangeObstacle(Math.random() * WIDTH - WIDTH / 2, Math.random() * HEIGHT - HEIGHT / 2, dir.normalize(), Math.random() * 4 * currentMultiplier);
        scene.add(orange);
        oranges.push(orange);
        orangeClock.start();
    }
    var i;
    for (i = 0; i < oranges.length; i++) {
        var d = new THREE.Vector3;
        d.copy(oranges[i].userData.direction);
        oranges[i].position.add(d.multiplyScalar(oranges[i].userData.speed));
        d.cross(new THREE.Vector3(0, 1, 0))
        var quaternion = new THREE.Quaternion().setFromAxisAngle(d, -oranges[i].userData.speed / 20).normalize();
        oranges[i].applyQuaternion(quaternion);
        oranges[i].updateboundings();
        if (oranges[i].position.x > WIDTH / 2 || oranges[i].position.x < WIDTH / -2 || oranges[i].position.z > HEIGHT / 2 || oranges[i].position.z < HEIGHT / -2) {
            scene.remove(oranges[i]);
            oranges.splice(i, 1);
            i--;
        }
    }

    /* test for colisions */
    scene.traverse(function (node) {
        if (node instanceof colidable) {
            scene.traverse(function (other) {
                if (other instanceof colidable && node != other && intercept(node, other)) {
                    handleColision(node, other);
                }
            });
        }
    });

    /*updatelights*/
    if (updatelights = true) {
        light.visible = day;
        var index = disablelight ? 0 : materialindex + 1;

        scene.traverse(function (node) {
            if (node.userData.materials && node.userData.type != "car") {
                node.traverse(function (node) {
                    if (node instanceof THREE.Mesh)
                        node.material = node.userData.materials[index];
                });
            }
        });

        updatelights = false;
    }

    render();
    requestAnimationFrame(animate);
}

class colidable extends THREE.Object3D {
    constructor() {
        super();
        this.boundingSphere = new THREE.Sphere;
        this.boundingBox = new THREE.Box3;
        this.iscolidable = true;
    }

    updateboundings() {
        this.boundingBox.setFromObject(this);
        this.boundingBox.getBoundingSphere(this.boundingSphere);
    }
}

function handleColision(main, other) {
    switch (main.userData.type) {
        case "cheerio":
            if (other.userData.type == "car" || other.userData.type == "cheerio") {
                main.userData.speed = Math.max(other.userData.speed, main.userData.speed);

                main.userData.direction.add(other.userData.direction).normalize();
                var dist = main.boundingSphere.center.distanceTo(other.boundingSphere.center);
                var direc = new THREE.Vector3(main.position.x - other.position.x, 0, main.position.z - other.position.z).normalize()
                main.position.add(direc.multiplyScalar(main.boundingSphere.radius + other.boundingSphere.radius - dist + 1));
                main.updateboundings();
            }
            break;
        case "butter":
            if (other.userData.type == "car" || other.userData.type == "cheerio") {
                other.userData.speed = 0;
                var dist = main.boundingSphere.center.distanceTo(other.boundingSphere.center);
                var direc = new THREE.Vector3(other.position.x - main.position.x, 0, other.position.z - main.position.z).normalize()
                other.position.add(direc.multiplyScalar(main.boundingSphere.radius + other.boundingSphere.radius - dist));
                other.updateboundings();
            }
            break;
        case "orange":
            if (other.userData.type == "car") {
                scene.remove(other);
                createCar();
                updateCamera = true;
            }
            break;
    }
}