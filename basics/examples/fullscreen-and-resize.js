import * as THREE from 'three';

// Screen
const screen = new THREE.Scene();

// Sizes
const Sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Cube
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
screen.add(cube);

// Camera
const camera = new THREE.PerspectiveCamera(75, Sizes.width / Sizes.height);
camera.position.x = 3;
camera.position.y = 3;
camera.position.z = 3;
camera.lookAt(cube.position);
screen.add(camera);

// Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(Sizes.width, Sizes.height);

window.addEventListener('resize', () => {
  Sizes.width = window.innerWidth;
  Sizes.height = window.innerHeight;

  camera.aspect = Sizes.width / Sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(Sizes.width, Sizes.height);
});

window.addEventListener('dblclick', () => {
  const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;

  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
});

const clock = new THREE.Clock();

function tick() {
  cube.rotation.y = clock.getElapsedTime();
  renderer.render(screen, camera);
  requestAnimationFrame(tick);
}

tick();
