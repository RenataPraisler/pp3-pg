//Varibles
var container;
var camera, scene, renderer;
var ambientLight, pointLight;
var controls;
var inicialScale=1;

window.addEventListener('keydown', onKeyDown, false);
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


// Buttom Controls
function onKeyDown(e) {
  var stepPosition = 0.5;
  switch (e.which) {
    //Mover o spidermen 
    case 38:
      spiderman.position['z'] += stepPosition;
    break;
    case 40:
      spiderman.position['z'] -= stepPosition;
      break;
    // Aumentar tamanho do objeto
    case 107:
    case 187:
      spiderman.scale.set(inicialScale + 0.2, inicialScale + 0.2 , inicialScale + 0.2);
      inicialScale += 0.2;
    break;
    //Diminuir tamanho do objeto
    case 109:
    case 189:
      spiderman.scale.set(inicialScale - 0.2, inicialScale - 0.2 , inicialScale - 0.2);
      inicialScale -= 0.2;
    break;
 }
