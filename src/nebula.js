import * as THREE from "../node_modules/three/build/three.module.js"

// import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';





let scene, camera, renderer, cloudGeo, cloudMaterial, cloudParticles = [], composer;


function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight, 1,1000);
    camera.position.z = 1;
    camera.rotation.x = 1.16;
    camera.rotation.y = -0.12;
    camera.rotation.z = 0.27;

    // add ambient light
    let ambient = new THREE.AmbientLight(0xbc8fb9);
    scene.add(ambient);

    // main light
    let directionalLight = new THREE.DirectionalLight(0xfef0b7);
    directionalLight.position.set(0,0,1);
    scene.add(directionalLight);

    // different colour point lights
    let orangeLight = new THREE.PointLight(0xFFC0CB,50,450,1.7);
    orangeLight.position.set(200,300,100);
    scene.add(orangeLight);

    let redLight = new THREE.PointLight(0xFF0000,50,450,1.7);
    redLight.position.set(100,300,100);
    scene.add(redLight);

    let blueLight = new THREE.PointLight(0x00FFBF,70,450,1.7);
    blueLight.position.set(300,300,200);
    scene.add(blueLight);

    // add renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth,window.innerHeight);
    // add green fog
    scene.fog = new THREE.FogExp2(0x1a1e41, 0.001);
    renderer.setClearColor(scene.fog.color);
    // Add scene to page as canvas element
    document.body.appendChild(renderer.domElement);
    // smoke/cloud texture
    let loader = new THREE.TextureLoader();
    loader.load("assets/smoke-1.png", function(texture){
        cloudGeo = new THREE.PlaneBufferGeometry(500,500);
        cloudMaterial = new THREE.MeshLambertMaterial({
            map:texture,
            transparent: true
        });
// loop for particles
        for(let p=0; p<50; p++) {
            let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
            // random cloud position 
            cloud.position.set(
                Math.random()*800 -400,
                500,
                Math.random()*500-500
            );
            cloud.rotation.x = 1.16;
            cloud.rotation.y = -0.12;
            cloud.rotation.z = Math.random()*2*Math.PI;
            cloud.material.opacity = 0.55;
            cloudParticles.push(cloud);
            // Add to scene
            scene.add(cloud);
        }
    });

    // const bloomEffect = new POSTPROCESSING.BloomEffect ({
    //     blendFunction: POSTPROCESSING.BlendFunction
    // })
    window.addEventListener("resize", onWindowResize, false)
    render()
}
// Responsive
function onWindowResize() {
    camera.aspect=window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight)
}
// Set rendering loop
function render() {
    cloudParticles.forEach(p => {
        p.rotation.z -=0.0006;
    });
    renderer.render(scene,camera);
    requestAnimationFrame(render)
}
init()