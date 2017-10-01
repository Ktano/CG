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

    camera= new THREE.OrthographicCamera(window.innerWidth/-2, window.innerWidth/2, window.innerHeight/2, window.innerHeight/-2, 1, 1000 );

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
    
    var course = course1();
    var arraylen = course.length;
    for (var i=0;i<arraylen;i++){
        addCheerio(table,course[i][0]+Math.random()*10-5,2.5,course[i][1]+Math.random()*10-5);
    }
    
    scene.add(table);

    table.position.x=x;
    table.position.y=y;
    table.position.z=z;
}

function addTable(obj, x, y, z, material){
    'use strict';

    var geometry = new THREE.CubeGeometry(1500,2,900);
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x,y,z);

    obj.add(mesh);

}

function addCheerio(obj,x,y,z){

    var geometry = new THREE.TorusGeometry( 5, 2, 16, 100 )
    var material = new THREE.MeshBasicMaterial({color: randomColor(), wireframe: false});
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x,y,z);

    mesh.rotation.x=Math.PI/2;
    obj.add(mesh);
}

function randomColor(){
    colors=[0xee75be,0x6e1fd4,0x980606,0xd09422,0x97c14d,0x6897bb]
    return colors[Math.floor(Math.random()*colors.length)]
}

function course1(){
    return [
            [0,400],[0,300],
            [25,400],[25,300],
            [50,400],[50,300],
            [75,400],[75,300],
            [100,400],[100,300],
            [125,400],[125,300],
            [150,400],[150,300],
            [175,400],[175,300],
            [200,400],[200,300],
            [225,400],[225,300],
            [250,400],[250,300],
            [275,400],[275,300],
            [300,400],[300,300],
            [325,400],[325,300],
            [350,400],[350,300],
            [375,400],[375,300],
            [400,400],[400,300],
            [425,400],[425,300],
            [450,400],[450,300],
            [475,400],[475,300],
            [500,400],[500,300],
            [525,400],[525,300],
            [563.27,392.39],
            [595.71,370.71],
            [617.39,338.27],
            [625,300],
            [625,275],[525,275],
            [625,250],[525,250],
            [625,225],[525,225],
            [625,200],[525,200],
            [625,175],[525,175],
            [625,150],[525,150],
            [625,125],[525,125],
            [625,100],[525,100],
            [625,75],[525,75],
            [625,50],[525,50],
            [625,25],[525,25],
            [625,0],[525,0],
            [625,-25],[525,-25],
            [625,-50],[525,-50],
            [625,-75],[525,-75],
            [625,-100],[525,-100],
            [625,-125],[525,-125],
            [625,-150],[525,-150],
            [625,-175],[525,-175],
            [625,-200],[525,-200],
            [625,-225],[525,-225],
            [625,-250],[525,-250],
            [625,-275],[525,-275],
            [625,-300],[525,-300],
            [617.39,-338.27],
            [595.71,-370.71],
            [563.27,-392.39],
            [525,-400],
            [475,-400],[475,-300],
            [450,-400],[450,-300],
            [425,-400],[425,-300],
            [400,-400],[400,-300],
            [375,-400],[375,-300],
            [350,-400],[350,-300],
            [325,-400],[325,-300],
            [286.73,-392.39],
            [254.29,-370.71],
            [232.61,-338.27],
            [225,-300],
            [225,-275],[325,-275],
            [225,-250],[325,-250],
            [225,-225],[325,-225],
            [225,-200],[325,-200],
            [225,-175],[325,-175],
            [225,-150],[325,-150],
            [225,-125],[325,-125],
            [225,-100],[325,-100],
            [225,-75],[325,-75],
            [225,-50],[325,-50],
            [225,-25],[325,-25],
            [225,0],[325,0],
            [225,25],[325,25],
            [225,50],[325,50],
            [225,75],[325,75],
            [225,100],[325,100],
            [225,125],[325,125],
            [225,150],[325,150],
            [317.39,188.27],
            [295.71,220.71],
            [263.27,242.39],
            [225,250],
            [186.73,242.39],
            [154.29,220.71],
            [132.61,188.27],
            [125,150]        

    ]
            

}