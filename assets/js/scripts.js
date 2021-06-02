//Varibles
var container;
var camera, scene, renderer;
var ambientLight, pointLight;
var controls;

//Init Program
init();
animate();

//Functions
function init() {
  // Scene
  scene = new THREE.Scene();

  //Camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
  );
  camera.position.set(10, 10, 10);
  camera.lookAt(10, 10, 10);
  scene.add(camera);

  //Lights
  ambientLight = new THREE.AmbientLight(0xcccccc, 0.8);
  scene.add(ambientLight);
  pointLight = new THREE.PointLight(0xffffff, 1);
  camera.add(pointLight);

  //Axis for help
  var axis = new THREE.AxisHelper(10);
  scene.add(axis);

  //Load Models
  THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());

  //Load homan male
  new THREE.MTLLoader()
    .setPath("assets/3D/base_spider_man/")
    .load("base_spider_man.mtl", function (materials) {
      materials.preload();
      new THREE.OBJLoader()
        .setMaterials(materials)
        .setPath("assets/3D/base_spider_man/")
        .load("base_spider_man.obj", function (object) {
          spiderman = object;
          scene.add(spiderman);
          spiderman.position.set(0, 0, 0);
          spiderman.rotation.y = 0;
        });
    });
  // Create Render
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor("#000");
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  //Create Controls
  controls = new THREE.OrbitControls(camera);
  controls.enabled = false;
  controls.update();
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
