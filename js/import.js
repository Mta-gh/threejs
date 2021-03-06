import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';

// import { GLTFLoader } from '../js/GLTFLoader.js';
import { OBJLoader } from 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/jsm/loaders/OBJLoader.js';

const bgColour = {
    color: '#ffffff'
};

const scene = new THREE.Scene({ alpha: true }); // add aplha :true to allow alpha

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


// const geometry = new THREE.SphereGeometry(1, 64 , 64);
// // const material = new THREE.MeshBasicMaterial( { map: texture } );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const sphere = new THREE.Mesh( geometry, material );
// scene.add( sphere );

// instantiate a loader
const loader = new THREE.OBJLoader();

// load a resource
loader.load(
	// resource URL
	'assets/Asset 4.obj',
	// called when resource is loaded
	function ( object ) {

		scene.add( object );

	},
	// called when loading is in progresses
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);


function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();