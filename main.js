import "./style.css";
import {
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Raycaster,
  RepeatWrapping,
  Scene,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  TextureLoader,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "./orbitControls";
import spriteImg from "./sprite.png";
import sceneImg from "./look.jpg";

const svgItems = document.querySelectorAll("svg a");
const links = document.querySelectorAll("[data-ref]");

const resetActiveClass = () => {
  links.forEach(($a) => $a.classList.remove("active"));
  svgItems.forEach(($region) => $region.classList.remove("active"));
};

svgItems.forEach(($region) => {
  $region.addEventListener("mouseenter", function (e) {
    resetActiveClass();
    this.classList.add("active");
    const regionId = this.id;
    const $link = document.querySelector(`[data-ref="${regionId}"]`);
    $link.classList.add("active");
  });

  $region.addEventListener("mouseleave", function (e) {
    resetActiveClass();
  });
});

links.forEach(($link) => {
  $link.addEventListener("mouseenter", function (e) {
    resetActiveClass();
    this.classList.add("active");
    const regionId = this.dataset.ref;
    const $link = document.querySelector(`#${regionId}`);
    $link.classList.add("active");
  });

  $link.addEventListener("mouseleave", function (e) {
    resetActiveClass();
  });
});

const container = document.getElementById("scene");
const scene = new Scene();
const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// sphere
const geometry = new SphereGeometry(50, 32, 32);
const texture = new TextureLoader().load(sceneImg);
texture.repeat.x = -1;
texture.wrapS = RepeatWrapping;
const material = new MeshBasicMaterial({
  side: DoubleSide,
  map: texture,
});
const sphere = new Mesh(geometry, material);
scene.add(sphere);

// renderer
const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
//controls.update() must be called after any manual changes to the camera's transform
camera.position.set(1, 0, 0);
controls.update();
animate();

function animate() {
  requestAnimationFrame(animate);

  // required if controls.enableDamping or controls.autoRotate are set to true
  controls.update();

  renderer.render(scene, camera);
}

// container.addEventListener("click", function (e) {
//   const mouse = new Vector2(
//     (e.clientX / window.innerWidth) * 2 - 1,
//     -(e.clientY / window.innerHeight) * 2 + 1
//   );
//   let raycaster = new Raycaster();
//   raycaster.setFromCamera(mouse, camera);
//   let intersect = raycaster.intersectObject(sphere);
//   const point = intersect[0].point;
//   console.log("point ==>", point);
//   addTooltip(point);
// });

// waly
addTooltip(
  new Vector3(3.071944204956998, -1.2577599268684923, -49.63565006990255),
  "Waly"
);
// Mosquée
addTooltip(
  new Vector3(-34.56692223611614, 13.092053453491097, -33.4974391576892),
  "Mosquée"
);
// Resto
addTooltip(
  new Vector3(7.159539871697577, 11.016243591893506, -48.01806445945114),
  "Resto"
);

function addTooltip(position, name) {
  // tooltip
  const spriteMap = new TextureLoader().load(spriteImg);
  const spriteMaterial = new SpriteMaterial({ map: spriteMap });
  const sprite = new Sprite(spriteMaterial);
  sprite.position.copy(position.clone().normalize().multiplyScalar(30));
  scene.add(sprite);
}
