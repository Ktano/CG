var camera;
var camera0, camera1, camera2;
var currentCamera;
var scene;
var renderer;
var car;
var updateCamera;
var resized;
var clock;
var orangeClock;
var currentMultiplier;
var oranges;

var GameOver;
var restart;
var light;
var updatelights = true;
var disablelight = false;
var materialindex = 1;
var day = true;
var disablecandels = false;
var disableheadlights = false;
var paused = false;

var lives;
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
    renderer.clear();

    renderer.render( scene, camera );
    //renderer.clearDepth();
    renderer.render(bannerscene,bannercamera);
}

function createScene() {
    "use strict";

    createCourse(0, 0, 0);

    createButterObstacle(-375, -150);
    createButterObstacle(25, 30);
    createButterObstacle(350, 55);
    createButterObstacle(450, 230);
    createButterObstacle(500, -300);
    createDirectionalLight(750, 400, -150);
    createCandles();
    createCar(400, 0, 350);

}

function createDirectionalLight(x, y, z) {
    light = new THREE.DirectionalLight(0xFFFEFA, 3);

    light.position.x = x;
    light.position.y = y;
    light.position.z = z;
    scene.add(light);
}

function createCandleLight(x, y, z) {
    var candle = new THREE.PointLight(0xFF8100, 1, 1500, 2)
    candle.position.x = x;
    candle.position.y = y;
    candle.position.z = z;
    scene.add(candle);
}

function createCandles() {

    for (var i = 0; i < 2; i++) {
        for (var j = 0; j < 3; j++) {
            createCandleLight(-500 + 500 * j, 70, -350 + 700 * i);
        }
    }
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
    renderer.autoClear=false;
    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    createCamera();
    createPerspectiveCamera();
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    createBannerScene();
    setup();
    render();
}


function clearscene(){
    var remove=[]
    scene.traverse ( function(node){
        if(node instanceof THREE.Object3D){
            remove.push(node);
        }
    });

    for (var index = 0; index < remove.length; index++) {
        scene.remove(remove[index]);
        
    }
}

function setup() {

    clearscene();

    createScene();
    currentCamera = 0
    clock = new THREE.Clock(true);
    orangeClock = new THREE.Clock(true);
    clock.start();

    updateCamera = false;
    resized = false;
    currentMultiplier = 1;
    oranges = [];
    GameOver = false;
    restart = false;
    lives = 3;
    
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
        case 78: // N key
            day = !day;
            updatelights = true;
            break;
        case 76: // L key
            disablelight = !disablelight;
            updatelights = true;
            break;
        case 71: //g key
            materialindex = materialindex == 1 ? 2 : 1;
            updatelights = true;
            break;
        case 67: //c key
            disablecandels = !disablecandels;
            updatelights = true;
            break;
        case 72: //h key
            disableheadlights = !disableheadlights;
            updatelights = true;
            break;
        case 83: //s key
            paused = !paused;
            break;
        case 82: // r key
            if (GameOver) {
                restart = true;
            }
            break;
    }
}


function animate() {
    "use strict";

    if (!paused) {
        banner.material.opacity=0;
        update()
    }
    else{
        banner.material.map=banner.userData.screens[0];
        banner.material.opacity=1;
    }
    render();
    requestAnimationFrame(animate);
}

function update() {
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
    if (updatelights) {
        light.visible = day;
        var index = disablelight ? 0 : materialindex;

        scene.traverse(function (node) {
            if (node.userData.materials && node.userData.type != "car") {
                node.traverse(function (node) {
                    if (node instanceof THREE.Mesh)
                        node.material = node.userData.materials[index];
                });
            }
        });

        scene.traverse(function (node) {
            if (node.isPointLight) {
                node.visible = !disablecandels;
            }
        });

        scene.traverse(function (node) {
            if (node.isSpotLight) {
                node.visible = !disableheadlights;
            }
        });

        updatelights = false;
    }

    if (GameOver){
        scene.remove(car);
        banner.material.map=banner.userData.screens[1];
        banner.material.opacity=1;
    }

    /*restart game*/
    if (restart) {
        setup();
        updateCamera = true;
    }
}