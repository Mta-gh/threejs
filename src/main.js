
import * as THREE from "../node_modules/three/build/three.module.js"

// import { OrbitControls } from "./OrbitControls.js";
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js';



const bgColour = {
    color: '#ffffff'
};
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
scene.background = new THREE.Color( bgColour.color );

const texture = new THREE.TextureLoader().load( 'assets/mars2.jpg' );


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.SphereGeometry(1 , 64, 64);
const material = new THREE.MeshBasicMaterial( { map: texture } );

const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );

camera.position.z = 5;

// let canvas = document.getElementsByTagName('canvas')

// const controls = new OrbitControls(camera, canvas);
// controls.target.set(0, 5, 0);
// controls.update();

const controls = new OrbitControls( camera, renderer.domElement );


function animate() {
    requestAnimationFrame( animate );
    // cube.rotation.x += 0.01;
    sphere.rotation.y += 0.005;
    renderer.render( scene, camera );
}
animate();