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
                lives=lives -1;
                if (lives==0){
                    GameOver=true;
                }
                    

                updateCamera = true;
            }
            break;
    }
}


function intercept(current, other) {
    return (interceptSphere(current, other) && interceptBox(current, other));
}

function interceptSphere(current, other) {
    var dist = current.boundingSphere.center.distanceTo(other.boundingSphere.center);
    return dist < current.boundingSphere.radius + other.boundingSphere.radius;
}

function interceptBox(current, other) {
    var box1 = current.boundingBox;
    var box2 = other.boundingBox;
    return box1.max.x > box2.min.x &&
        box1.min.x < box2.max.x &&
        box1.max.z > box2.min.z &&
        box1.min.z < box2.max.z &&
        box1.max.y > box2.min.y &&
        box1.min.y < box2.max.y;
}