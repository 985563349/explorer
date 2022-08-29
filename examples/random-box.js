import * as THREE from 'three';
import dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';

/**
 * scene.children属性可获取当前场景中对象的数量；
 * 通过 scene.getObjectByName(name) 方法可以直接获取场景中名为 name 的对象；
 * scene.add(object)、scene.remove(object)可用于添加、删除场景中的对象；
 * scene.traverse()方法可以遍历场景中的所有对象，类似于数组的forEach方法；
 *
 * 雾化：
 * 给scene设置fog属性，就可以为整个场景添加雾化效果。雾化效果是：场景中的物体离摄像机越远就会变得越模糊。
 *
 * 同一材质：
 * 给scene设置overrideMaterial属性，场景中的左右物体都会共享同一个材质，使用该属性可以通过减少Three.js管理的材质
 * 数量来提高运行效率，但是实际应用中该属性非常不实用。
 */

// Scene
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xffffff, 0.015, 160);
// scene.overrideMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });

// Sizes
const Sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Camera
const camera = new THREE.PerspectiveCamera(45, Sizes.width / Sizes.height, 0.1, 1000);
camera.position.set(-50, 60, 50);
camera.lookAt(scene.position);
scene.add(camera);

// Plane
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(60, 40, 1, 1),
  new THREE.MeshLambertMaterial({ color: 0xffffff })
);
plane.receiveShadow = true;
plane.rotation.x = -0.5 * Math.PI;
plane.position.set(0, 0, 0);
scene.add(plane);

// Light
{
  const ambientLight = new THREE.AmbientLight(0x0c0c0c);
  scene.add(ambientLight);

  const spotLight = new THREE.SpotLight(0xffffff, 1.2, 150, 120);
  spotLight.position.set(-40, 60, -10);
  spotLight.castShadow = true;
  scene.add(spotLight);
}

// Canvas
const canvas = document.querySelector('.webgl');

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.shadowMap.enabled = true;
renderer.setClearColor(new THREE.Color(0xeeeeee));
renderer.setSize(Sizes.width, Sizes.height);

// Stats
const stats = new Stats();
document.body.append(stats.domElement);

// Controls
const controls = {
  rotationSpeed: 0.02,
  numberOfObjects: scene.children.length,

  addCube() {
    const cubeSize = Math.ceil(Math.random() * 3);
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize),
      new THREE.MeshLambertMaterial({
        color: Math.random() * 0xffffff,
      })
    );
    cube.castShadow = true;
    cube.name = `cube-${scene.children.length}`;
    cube.position.x = -30 + Math.round(Math.random() * plane.geometry.parameters.width);
    cube.position.y = Math.round(Math.random() * 5);
    cube.position.z = -20 + Math.round(Math.random() * plane.geometry.parameters.height);
    this.numberOfObjects = scene.children.length;

    scene.add(cube);
  },

  removeCube() {
    const allChildren = scene.children;
    const lastChild = allChildren.at(-1);
    if (lastChild instanceof THREE.Mesh) {
      scene.remove(lastChild);
    }
    this.numberOfObjects = scene.children.length;
  },

  outputObjects() {
    console.log(scene.children);
  },
};

// GUI
const gui = new dat.GUI();
gui.add(controls, 'rotationSpeed', 0, 0.5);
gui.add(controls, 'addCube');
gui.add(controls, 'removeCube');
gui.add(controls, 'outputObjects');
gui.add(controls, 'numberOfObjects').listen();

// OrbitControls
const orbitControls = new OrbitControls(camera, renderer.domElement);

function tick() {
  stats.update();
  orbitControls.update();

  scene.traverse((object) => {
    if (object instanceof THREE.Mesh && object !== plane) {
      object.rotation.x += controls.rotationSpeed;
      object.rotation.y += controls.rotationSpeed;
      object.rotation.z += controls.rotationSpeed;
    }
  });

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}

tick();
