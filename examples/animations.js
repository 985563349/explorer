import * as THREE from 'three';
import gsap from 'gsap';

// Scene
const scene = new THREE.Scene();

// Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const Sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, Sizes.width / Sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(Sizes.width, Sizes.height);

// let time = Date.now();

// const tick = () => {
//   const currentTime = Date.now();
//   const deltaTime = currentTime - time;
//   time = currentTime;
//   mesh.rotation.y += 0.001 * deltaTime;

//   renderer.render(scene, camera);
//   window.requestAnimationFrame(tick);
// };

// tick();

// Clock
// const clock = new THREE.Clock();

gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });
gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 });

const tick = () => {
  // const elapsedTime = clock.getElapsedTime();

  // Update objects
  // mesh moving
  // mesh.position.x = Math.cos(elapsedTime);
  // mesh.position.y = Math.sin(elapsedTime);

  // camera moving
  // camera.position.x = Math.cos(elapsedTime);
  // camera.position.y = Math.sin(elapsedTime);
  // camera.lookAt(mesh.position);

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
