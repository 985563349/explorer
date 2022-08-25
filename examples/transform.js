import * as THREE from 'three';

// Scene
const scene = new THREE.Scene();

// Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Position
// mesh.position.x = 0.7;
// mesh.position.y = -0.6;
// mesh.position.z = 1;
mesh.position.set(0.7, -0.6, 1);

// Scale
// mesh.scale.x = 2;
// mesh.scale.y = 0.5;
// mesh.scale.z = 0.5;
mesh.scale.set(2, 0.5, 0.5);

// Rotation
mesh.rotation.reorder('YXZ'); // rotation默认旋转顺序为XYZ，此处修改为YXZ
mesh.rotation.x = Math.PI * 0.25;
mesh.rotation.y = Math.PI * 0.25;

const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// Sizes
const Sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, Sizes.width / Sizes.height);
camera.position.z = 3;
scene.add(camera);

camera.lookAt(mesh.position);

// Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(Sizes.width, Sizes.height);

renderer.render(scene, camera);
