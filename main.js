import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
//scene camera render
//scene is container that holds all cameras and lights


/////CREATING A SCENE
const scene = new THREE.Scene();
 //field of view , aspect ratio, view frustum
const camera = new THREE.PerspectiveCamera( 75,window.innerWidth / window.innerHeight,0.1,1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio)
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render( scene, camera );
//render == draw


/////ADDING OBJECTS---geometry,material,mesh
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material = new THREE.MeshStandardMaterial( { color: 0xFF6347} );
const torus = new THREE.Mesh( geometry, material );
scene.add( torus );




const pointlight = new THREE.PointLight( 0xff0000 );
pointlight.position.set( 5, 5, 5 );
// scene.add( pointlight );

const ambidentlight = new THREE.AmbientLight( 0xff0000); // soft white light
scene.add( pointlight, ambidentlight );

const lighthelper = new THREE.PointLightHelper(pointlight)
const gridhelper = new THREE.GridHelper(200,50);
scene.add(lighthelper,gridhelper)

const controls = new OrbitControls(camera,renderer.domElement)


//stars
function addStar(){
  const geometry = new THREE.SphereGeometry( 0.25, 32, 16 );
const material = new THREE.MeshStandardMaterial( { color: 0xffff00 } );
const sphere = new THREE.Mesh( geometry, material );

const [x,y,z] = Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(100));

sphere.position.set(x,y,z);
scene.add( sphere );
}

Array(200).fill().forEach(addStar);




const spaceTexture = new THREE.TextureLoader().load('bg.jpg')
scene.background = spaceTexture;





//avatar
const jeffTexture = new THREE.TextureLoader().load('codebg.jpg')
const jeff = new THREE.Mesh(
  new THREE.BoxGeometry(0.3,3,3),
  new THREE.MeshBasicMaterial({map:jeffTexture})
);
scene.add(jeff);



//moon
const moonTexture = new THREE.TextureLoader().load('moon.jpeg')
const normalTexture = new THREE.TextureLoader().load('nightbg.jpeg')
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map:moonTexture,
  normalMap:normalTexture
})
);
scene.add(moon);
moon.position.z  = 30; 
moon.position.setX(-10);


jeff.position.z = -5;
jeff.position.x = 2;

function moveCamera(){
const t = document.body.getBoundingClientRect().top;
moon.rotation.x +=0.05;
moon.rotation.y +=0.075;
moon.rotation.z +=0.05;


jeff.rotation.y += 0.01;
jeff.rotation.z += 0.01;

camera.position.z = t * -0.01;
camera.position.x = t * -0.0002;
camera.rotation.y = t * -0.0002;

}
document.body.onscroll = moveCamera;
moveCamera();

//animation
function animate(){
  requestAnimationFrame( animate );

  torus.rotation.x += 0.01; 
  torus.rotation.y += 0.005; 
  torus.rotation.z += 0.01; 
  moon.rotation.x += 0.005;

  // controls.update();
  renderer.render( scene, camera );
}

animate()

