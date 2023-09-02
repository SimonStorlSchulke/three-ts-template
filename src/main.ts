import * as THREE from "three";

const renderer = new THREE.WebGL1Renderer({
  antialias: true,
  canvas: document.querySelector<HTMLCanvasElement>("canvas")!
})

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(1.5, 3, 5);
camera.setRotationFromEuler(new THREE.Euler(-0.6, 0.2, 0.12));

const scene = new THREE.Scene();

const torusGeometry = new THREE.TorusGeometry();
const materialDefault = new THREE.MeshPhysicalMaterial({
  color: 0xCCCCCC,
  roughness: 0.3,
});

const torus = new THREE.Mesh(torusGeometry, materialDefault);


scene.add(torus);

const light = new THREE.DirectionalLight(0xFFEACC, 1.7);

//Position from which the light directs to the world origin
light.position.set(0, 10, 0);
scene.add(threePointLight());

scene.add( new THREE.GridHelper( 10, 20 ));
scene.add( new THREE.AxesHelper( 5 ));

renderer.render(scene, camera);

function threePointLight(): THREE.Object3D {
  const lightKey = new THREE.DirectionalLight(0xFFEACC, 2.5);
  lightKey.position.set(-7, 10, 2);

  const lightRim = new THREE.DirectionalLight(0xEFFDFF, 0.8);
  lightRim.position.set(0, 2, -2);

  const lightSecondary = new THREE.DirectionalLight(0xFFFFFF, 0.2);
  lightSecondary.position.set(1, -0.75, 0);

  const lightRig = new THREE.Object3D();

  lightRig.children.push(lightRim, lightKey, lightSecondary);

  return lightRig;
};

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += -0.01;
  torus.rotation.y += -0.005;
  renderer.render(scene, camera);
}
animate();