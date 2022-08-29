import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import * as dat from 'dat.gui';

/**
 * 添加阴影效果：
 * 1、添加光源，本示例中使用的是聚光灯，代码78 ~ 87行。通过将castShadow设置为three，阴影功能被启用。
 * 通过设置shadow.mapSize、shadow.camera.far和shadow.camera.near三个参数来控制阴影的精细程度。
 *
 * 2、物体材质需要使用反光材质，MeshBasicMaterial材质不会对光有任何反应，只会使用指定颜色来渲染物体。
 * 本示例中使用 MeshLambertMaterial 材质。
 *
 * 3、由于渲染阴影需要消耗大量的计算资源，默认情况下Three.js渲染器是不会渲染阴影的。
 * 需要通过设置renderer.shadowMap.enabled = true来开始渲染。
 *
 * 4、需要指定哪些物体投射阴影、哪些物体接受阴影。通过设置物体的castShadow = true来投射阴影。
 * 设置receiveShadow = true来接受阴影。
 */

/**
 * dat.GUI
 * 使用这个库可以很容易地创建出能够改变代码变量的界面组件，极大的方便了场景的调试。
 * 具体使用代码110 ~ 119行。
 */

/**
 * TrackballControls 轨迹球控件
 * TrackballControls类似于OrbitControls。但是，它不保持恒定的相机向上矢量。
 * 这意味着如果相机在 “北极” 和 “南极” 上空运行，他不会翻转以保持“正面朝上”。
 */

// Scene
const scene = new THREE.Scene();

// Sizes
const Sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Camera
const camera = new THREE.PerspectiveCamera(45, Sizes.width / Sizes.height, 0.1, 1000);
camera.position.set(-30, 40, 30);
camera.lookAt(scene.position);

// Plane
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(60, 20),
  new THREE.MeshLambertMaterial({ color: 0xffffff })
);
plane.receiveShadow = true;
plane.rotation.x = -0.5 * Math.PI;
plane.position.set(15, 0, 0);
scene.add(plane);

// Cube
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(4, 4, 4),
  new THREE.MeshLambertMaterial({ color: 0xff0000 })
);
cube.castShadow = true;
cube.position.set(-4, 3, 0);
scene.add(cube);

// sphere
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(4, 20, 20),
  new THREE.MeshLambertMaterial({
    color: 0x7777ff,
  })
);
sphere.castShadow = true;
sphere.position.set(20, 4, 2);
scene.add(sphere);

{
  // SpotLight
  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-40, 40, -15);
  spotLight.castShadow = true;
  spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
  spotLight.shadow.camera.far = 130;
  spotLight.shadow.camera.near = 40;
  scene.add(spotLight);
}

// Axes
// const axes = new THREE.AxesHelper(20);
// scene.add(axes);

// Canvas
const canvas = document.querySelector('.webgl');

// OrbitControls
const orbitControls = new OrbitControls(camera, canvas);

// Stats
const stats = new Stats();
document.body.append(stats.domElement);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(Sizes.width, Sizes.height);
renderer.setClearColor(new THREE.Color(0x000000));
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;

// Speeds
const Speeds = {
  rotationSpeed: 0.02,
  bouncingSpeed: 0.03,
};

// GUI
const gui = new dat.GUI();
gui.add(Speeds, 'rotationSpeed', 0, 0.5);
gui.add(Speeds, 'bouncingSpeed', 0, 0.5);

let step = 0;

// TrackballControls
const trackballControls = new TrackballControls(camera, canvas);

// Resize
window.addEventListener('resize', () => {
  Sizes.width = window.innerWidth;
  Sizes.height = window.innerHeight;

  camera.aspect = Sizes.width / Sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(Sizes.width, Sizes.height);
});

function tick() {
  cube.rotation.x += Speeds.rotationSpeed;
  cube.rotation.y += Speeds.rotationSpeed;
  cube.rotation.z += Speeds.rotationSpeed;

  step += Speeds.bouncingSpeed;
  sphere.position.x = 20 + 10 * Math.cos(step);
  sphere.position.y = 2 + 10 * Math.abs(Math.sin(step));

  orbitControls.update();
  // trackballControls.update();
  stats.update();

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}

tick();
