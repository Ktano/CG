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
    addHeadLight(car, -12.5, 3, 3);
    addHeadLight(car, -12.5, 3, -3);
    scene.add(car);
    car.position.copy(car.userData.startposition);

    car.updateboundings();
}

function addHeadLight(obj, x, y, z) {
    var light = new THREE.SpotLight(0xFFF6EC, 2, 100);
    light.position.x = x;
    light.position.y = y;
    light.position.z = z;
    light.target.position.copy(light.position);
    light.target.position.add(new THREE.Vector3(-3, -1, 0));
    obj.add(light, light.target);
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
    //var geometry = new THREE.TorusGeometry(1.5, 0.75, 16, 100)
    var geometry = new THREE.Geometry()
    var theta;
    var n_slices = 32;
    // center of circles
    for (var slice = 0; slice < n_slices; slice++) {
        theta = slice * 2 * Math.PI / n_slices;
        nexttheta = (slice + 1) * 2 * Math.PI / n_slices;
        /* triangle for top circle*/
        geometry.vertices.push(new THREE.Vector3(0, 0.75, 0));
        geometry.vertices.push(new THREE.Vector3(2.25 * Math.cos(theta), 0.75, 2.25 * Math.sin(theta)));
        geometry.vertices.push(new THREE.Vector3(2.25 * Math.cos(nexttheta), 0.75, 2.25 * Math.sin(nexttheta)));
        geometry.faces.push(new THREE.Face3(slice * 6, slice * 6 + 1, slice * 6 + 2));
        /* triangle for bottom circle*/
        geometry.vertices.push(new THREE.Vector3(0, -0.75, 0));
        geometry.vertices.push(new THREE.Vector3(2.25 * Math.cos(theta), -0.75, 2.25 * Math.sin(theta)));
        geometry.vertices.push(new THREE.Vector3(2.25 * Math.cos(nexttheta), -0.75, 2.25 * Math.sin(nexttheta)));
        geometry.faces.push(new THREE.Face3(slice * 6 + 4, slice * 6 + 3, slice * 6 + 5));
        /* two triangles for sides circle*/
        geometry.faces.push(new THREE.Face3(slice * 6 + 1, slice * 6 + 4, slice * 6 + 5));
        geometry.faces.push(new THREE.Face3(slice * 6 + 1, slice * 6 + 5, slice * 6 + 2));

    }

    geometry.mergeVertices();
    geometry.computeFaceNormals();
    geometry.computeVertexNormals();



    var mesh = new THREE.Mesh(geometry);
    mesh.userData = {
        materials: [new THREE.MeshBasicMaterial({
                color: 0x000000,
                wireframe: false
            }),
            new THREE.MeshLambertMaterial({
                color: 0x191919,
                wireframe: false
            }),
            new THREE.MeshPhongMaterial({
                color: 0x191919,
                wireframe: false,
                specular: 0x202020,
                shininess: 10
            })
        ]
    }

    mesh.material = mesh.userData.materials[materialindex];
    mesh.position.set(x, y, z);
    mesh.rotation.x = Math.PI / 2;

    obj.add(mesh);

}


function meshBoxGeometry(x, y, z) {
    var geometry = new THREE.Geometry();
    var l = x / 2;
    var c = y / 2;
    var d = z / 2;
    geometry.vertices.push(new THREE.Vector3(l, c, d));
    geometry.vertices.push(new THREE.Vector3(l, c, -d));
    geometry.vertices.push(new THREE.Vector3(l, -c, -d));
    geometry.faces.push(new THREE.Face3(1, 0, 2));
    geometry.vertices.push(new THREE.Vector3(l, -c, d));
    geometry.faces.push(new THREE.Face3(0, 3, 2));
    geometry.vertices.push(new THREE.Vector3(-l, -c, +d));
    geometry.faces.push(new THREE.Face3(0, 4, 3));
    geometry.faces.push(new THREE.Face3(2, 3, 4));
    geometry.vertices.push(new THREE.Vector3(-l, -c, -d));
    geometry.faces.push(new THREE.Face3(4, 5, 2));
    geometry.faces.push(new THREE.Face3(1, 2, 5));
    geometry.vertices.push(new THREE.Vector3(-l, c, -d));
    geometry.faces.push(new THREE.Face3(6, 1, 5));
    geometry.faces.push(new THREE.Face3(0, 1, 6));
    geometry.faces.push(new THREE.Face3(6, 5, 4));
    geometry.vertices.push(new THREE.Vector3(-l, c, d));
    geometry.faces.push(new THREE.Face3(0, 6, 7));
    geometry.faces.push(new THREE.Face3(7, 4, 0));
    geometry.faces.push(new THREE.Face3(7, 6, 4));
    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
    return geometry;
}

function wing(x, y, z) {
    var geometry = new THREE.Geometry();
    var l = x / 2;
    var c = y / 2;
    var d = z / 2;
    geometry.vertices.push(new THREE.Vector3(l, c, -d / 2));
    geometry.vertices.push(new THREE.Vector3(l, c + 0.3, -d));
    geometry.vertices.push(new THREE.Vector3(l, -c + 0.3, -d));
    geometry.faces.push(new THREE.Face3(1, 0, 2));
    geometry.vertices.push(new THREE.Vector3(l, -c, -d / 2));
    geometry.faces.push(new THREE.Face3(0, 3, 2));
    geometry.vertices.push(new THREE.Vector3(-l, -c, -d / 2));
    geometry.faces.push(new THREE.Face3(2, 3, 4));
    geometry.vertices.push(new THREE.Vector3(-l, -c + 0.3, -d));
    geometry.faces.push(new THREE.Face3(4, 5, 2));
    geometry.faces.push(new THREE.Face3(1, 2, 5));
    geometry.vertices.push(new THREE.Vector3(-l, c + 0.3, -d));
    geometry.faces.push(new THREE.Face3(6, 1, 5));
    geometry.faces.push(new THREE.Face3(0, 1, 6));
    geometry.faces.push(new THREE.Face3(6, 5, 4));
    geometry.vertices.push(new THREE.Vector3(-l, c, -d / 2));
    geometry.faces.push(new THREE.Face3(0, 6, 7));
    geometry.faces.push(new THREE.Face3(7, 6, 4));
    geometry.vertices.push(new THREE.Vector3(l - 0.8, c, 0));
    geometry.vertices.push(new THREE.Vector3(l - 0.8, -c, 0));
    geometry.vertices.push(new THREE.Vector3(-l - 0.8, -c, 0));
    geometry.vertices.push(new THREE.Vector3(-l - 0.8, c, 0));
    geometry.faces.push(new THREE.Face3(0, 7, 8));
    geometry.faces.push(new THREE.Face3(7, 11, 8));
    geometry.faces.push(new THREE.Face3(11, 7, 4));
    geometry.faces.push(new THREE.Face3(11, 4, 10));
    geometry.faces.push(new THREE.Face3(7, 11, 8));
    geometry.faces.push(new THREE.Face3(4, 3, 10));
    geometry.faces.push(new THREE.Face3(3, 9, 10));
    geometry.faces.push(new THREE.Face3(0, 9, 3));
    geometry.faces.push(new THREE.Face3(9, 0, 8));
    geometry.vertices.push(new THREE.Vector3(l, c, d / 2));
    geometry.vertices.push(new THREE.Vector3(l, -c, d / 2));
    geometry.vertices.push(new THREE.Vector3(-l, -c, d / 2));
    geometry.vertices.push(new THREE.Vector3(-l, c, d / 2));
    geometry.faces.push(new THREE.Face3(8, 11, 12));
    geometry.faces.push(new THREE.Face3(11, 15, 12));
    geometry.faces.push(new THREE.Face3(15, 11, 10));
    geometry.faces.push(new THREE.Face3(15, 10, 14));
    geometry.faces.push(new THREE.Face3(11, 15, 12));
    geometry.faces.push(new THREE.Face3(10, 9, 14));
    geometry.faces.push(new THREE.Face3(9, 13, 14));
    geometry.faces.push(new THREE.Face3(8, 13, 9));
    geometry.faces.push(new THREE.Face3(13, 8, 12));
    geometry.vertices.push(new THREE.Vector3(l, c + 0.3, d));
    geometry.vertices.push(new THREE.Vector3(l, -c + 0.3, d));
    geometry.vertices.push(new THREE.Vector3(-l, -c + 0.3, d));
    geometry.vertices.push(new THREE.Vector3(-l, c + 0.3, d));
    geometry.faces.push(new THREE.Face3(12, 15, 16));
    geometry.faces.push(new THREE.Face3(15, 19, 16));
    geometry.faces.push(new THREE.Face3(19, 15, 14));
    geometry.faces.push(new THREE.Face3(19, 14, 18));
    geometry.faces.push(new THREE.Face3(15, 19, 16));
    geometry.faces.push(new THREE.Face3(14, 13, 18));
    geometry.faces.push(new THREE.Face3(13, 17, 18));
    geometry.faces.push(new THREE.Face3(12, 17, 13));
    geometry.faces.push(new THREE.Face3(17, 12, 16));
    geometry.faces.push(new THREE.Face3(17, 16, 18));
    geometry.faces.push(new THREE.Face3(18, 16, 19));
    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
    return geometry;
}


function addWing(obj, x, y, z) {
    "use strict";

    var geometry = wing(2.5, 1, 15);

    var mesh = new THREE.Mesh(geometry);
    mesh.userData = {
        materials: [new THREE.MeshBasicMaterial({
                color: 0xff0000,
                wireframe: false
            }),
            new THREE.MeshLambertMaterial({
                color: 0xff0000,
                wireframe: false
            }),
            new THREE.MeshPhongMaterial({
                color: 0x800000,
                wireframe: false,
                specular: 0xC5C5C5,
                shininess: 76.8
            })
        ]
    }

    mesh.material = mesh.userData.materials[materialindex];
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addBody(obj, x, y, z) {
    "use strict";

    var geometry = meshBoxGeometry(20, 3, 10);
    var mesh = new THREE.Mesh(geometry);
    mesh.userData = {
        materials: [new THREE.MeshBasicMaterial({
                color: 0xff0000,
                wireframe: false
            }),
            new THREE.MeshLambertMaterial({
                color: 0xff0000,
                wireframe: false
            }),
            new THREE.MeshPhongMaterial({
                color: 0x800000,
                wireframe: false,
                specular: 0xC5C5C5,
                shininess: 76.8
            })
        ]
    }

    mesh.material = mesh.userData.materials[materialindex];
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addFrontWingConnection(obj, x, y, z) {
    "use strict";

    var geometry = meshBoxGeometry(5, 1, 2.5);
    var mesh = new THREE.Mesh(geometry);
    mesh.userData = {
        materials: [new THREE.MeshBasicMaterial({
                color: 0xff0000,
                wireframe: false
            }),
            new THREE.MeshLambertMaterial({
                color: 0xff0000,
                wireframe: false
            }),
            new THREE.MeshPhongMaterial({
                color: 0x800000,
                wireframe: false,
                specular: 0xC5C5C5,
                shininess: 76.8
            })
        ]
    }

    mesh.material = mesh.userData.materials[materialindex];
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addBackWingConnection(obj, x, y, z) {
    "use strict";

    var geometry = meshBoxGeometry(1, 3, 5);

    var mesh = new THREE.Mesh(geometry);
    mesh.userData = {
        materials: [new THREE.MeshBasicMaterial({
                color: 0xff0000,
                wireframe: false
            }),
            new THREE.MeshLambertMaterial({
                color: 0xff0000,
                wireframe: false
            }),
            new THREE.MeshPhongMaterial({
                color: 0x800000,
                wireframe: false,
                specular: 0xC5C5C5,
                shininess: 76.8
            })
        ]
    }

    mesh.material = mesh.userData.materials[materialindex];
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addFrontWheelConnections(obj, x, y, z) {
    "use strict";

    var geometry = meshBoxGeometry(1, 1, 4);

    var mesh = new THREE.Mesh(geometry);
    mesh.userData = {
        materials: [new THREE.MeshBasicMaterial({
                color: 0xff0000,
                wireframe: false
            }),
            new THREE.MeshLambertMaterial({
                color: 0xff0000,
                wireframe: false
            }),
            new THREE.MeshPhongMaterial({
                color: 0x800000,
                wireframe: false,
                specular: 0xC5C5C5,
                shininess: 76.8
            })
        ]
    }

    mesh.material = mesh.userData.materials[materialindex];
    mesh.position.set(x, y, z);

    obj.add(mesh);
}