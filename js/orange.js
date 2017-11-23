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
                color: 0x668000,
                wireframe: false,
                specular: 0x00B300,
                shininess: 10
            })
        ]
    }
    mesh.material = mesh.userData.materials[materialindex];
    mesh.position.set(x, y, z);

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
                wireframe: false,
                specular: 0x005E00,
                shininess: 30
            })
        ]
    };

    mesh.material = mesh.userData.materials[materialindex];
    mesh.position.set(x, y, z);

    obj.add(mesh);
}