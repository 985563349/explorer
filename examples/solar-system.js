import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';

// Loader
const loader = new THREE.TextureLoader();

// Scene
const scene = new THREE.Scene();
const texture = loader.load('/2k_stars_milky_way.jpeg');
scene.background = texture;

// Sizes
const Sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, Sizes.width / Sizes.height, 0.1, 1000);
camera.position.set(60, 60, 60);
camera.lookAt(scene.position);

const Objects = [];

// Solar System
{
  // Sphere
  const sphere = new THREE.SphereGeometry(2, 20, 20);

  const solarSystem = new THREE.Object3D();
  Objects.push(solarSystem);
  scene.add(solarSystem);

  const sun = new THREE.Mesh(
    sphere,
    new THREE.MeshBasicMaterial({ map: loader.load('/2k_sun.jpeg') })
  );
  sun.scale.set(5, 5, 5);
  Objects.push(sun);
  solarSystem.add(sun);

  // Earth-moon system
  const earthMoonSystem = new THREE.Object3D();
  earthMoonSystem.position.x = 20;
  Objects.push(earthMoonSystem);
  solarSystem.add(earthMoonSystem);

  const earth = new THREE.Mesh(
    sphere,
    new THREE.MeshLambertMaterial({ map: loader.load('/2k_earth_daymap.jpeg') })
  );
  Objects.push(earth);
  earthMoonSystem.add(earth);

  const moon = new THREE.Mesh(
    sphere,
    new THREE.MeshLambertMaterial({ map: loader.load('/2k_moon.jpeg') })
  );
  moon.scale.set(0.5, 0.5, 0.5);
  moon.position.x = 4;
  earthMoonSystem.add(moon);
}

const States = {
  AxesVisible: false,
  AmbientLightIntensity: 0.3,
  PointLightIntensity: 1.2,
};

// AmbientLight
const ambientLight = new THREE.AmbientLight(0xffffff, States.AmbientLightIntensity);
scene.add(ambientLight);

// PointLight
const pointLight = new THREE.PointLight(0xffffff, States.PointLightIntensity);
scene.add(pointLight);

// Canvas
const canvas = document.querySelector('.webgl');
// Renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(Sizes.width, Sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);

const axes = new THREE.AxesHelper(20);
axes.visible = false;
scene.add(axes);

// Controls
const orbitControls = new OrbitControls(camera, renderer.domElement);

// GUI
const gui = new dat.GUI();
gui.width = 400;
gui.add(States, 'AxesVisible');
gui.add(States, 'AmbientLightIntensity', 0, 2);
gui.add(States, 'PointLightIntensity', 0, 2);

function tick(time) {
  Objects.forEach((obj) => {
    obj.rotation.y = time * 0.0002;
  });

  axes.visible = States.AxesVisible;
  ambientLight.intensity = States.AmbientLightIntensity;
  pointLight.intensity = States.PointLightIntensity;

  orbitControls.update();
  renderer.render(scene, camera);

  requestAnimationFrame(tick);
}

tick();
