var bannerscene;
var bannercamera;
var banner;
function createBannerScene(){
    "use strict";
        var screens=[];
        screens.push( new THREE.TextureLoader().load("/CG/textures/Pause.png"));
        screens.push( new THREE.TextureLoader().load("/CG/textures/Game Over.png"));

        var geometry = new THREE.PlaneGeometry(1920,1080);
        var material = new THREE.MeshBasicMaterial();
        material.map=screens[0];
        material.transparent = true;
        material.depthTest = false;
        material.depthWrite = false;
        material.opacity=0;
        bannerscene = new THREE.Scene();

        banner= new THREE.Mesh(geometry,material);
        banner.userData={
            screens:screens,
        };

        bannerscene.add(banner);

        bannercamera=new THREE.OrthographicCamera(1920/ -2, 1920 / 2, 1080 / 2, 1080 / -2, 1, 1000);
        bannercamera.position.x = 0;
        bannercamera.position.y = 0;
        bannercamera.position.z = 100;
        bannercamera.lookAt(bannerscene.position);
}

