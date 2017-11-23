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

function addButter(obj, x, y, z) {
    
        var geometry = new THREE.CubeGeometry(100, 40, 50, 10, 10, 10)
    
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
                    wireframe: false,
                    specular: 0xFFFF3D,
                    shininess: 32
                })
            ]
        }
        mesh.material = mesh.userData.materials[materialindex];
        mesh.rotation.y = Math.random() * Math.PI * 2 - Math.PI;
        obj.add(mesh);
    }