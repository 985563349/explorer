import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Scene
const scene = new THREE.Scene();

// Mesh
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]);
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Mesh
// const mesh = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1, 2, 2, 2),
//   new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
// );
// scene.add(mesh);

// Sizes
const Sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(70, Sizes.width / Sizes.height);
// camera.position.z = 2;
camera.position.set(2, 2, 2);
camera.lookAt(mesh.position);
scene.add(camera);

// Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(Sizes.width, Sizes.height);

// Controls
const controls = new OrbitControls(camera, canvas);

function tick() {
  controls.update();
  renderer.render(scene, camera);

  requestAnimationFrame(tick);
}

tick();
