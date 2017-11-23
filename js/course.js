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

    var geometry = new THREE.CubeGeometry(WIDTH, 2, HEIGHT, 400, 1, 400 * HEIGHT / WIDTH);
    var mesh = new THREE.Mesh(geometry);
    var texture = new THREE.TextureLoader().load("../textures/cloth-red.png");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(10, 10 * HEIGHT / WIDTH);

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
                wireframe: false,
                shininess: 5
            })
        ]
    };
    for (var index = 0; index < mesh.userData.materials.length; index++) {
        mesh.userData.materials[index].map = texture;

    }
    mesh.material = mesh.userData.materials[materialindex];
    mesh.position.set(x, y, z);


    obj.add(mesh);

}

function addCheerio(obj, x, y, z) {
    var cheerio = new colidable();
    var geometry = new THREE.TorusGeometry(5, 2, 16, 40);
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
        }), new THREE.MeshPhongMaterial({
            color: color,
            wireframe: false,
            specular: 0x000,
            shininess: 0
        })]
    }
    mesh.material = mesh.userData.materials[materialindex];
    mesh.position.set(x, y, z);

    mesh.rotation.x = Math.PI / 2;
    cheerio.add(mesh);
    cheerio.updateboundings();
    obj.add(cheerio);
}

function randomColor() {
    colors = [0xee75be, 0x6e1fd4, 0x980606, 0xd09422, 0x97c14d, 0x6897bb]
    return colors[Math.floor(Math.random() * colors.length)]
}