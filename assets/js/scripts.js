//Varibles
var container;
var camera, scene, renderer;
var ambientLight, pointLight;
var controls;
var inicialScale = 1;

window.addEventListener("keydown", onKeyDown, false);
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
          spiderman.position["x"] = 0;
          spiderman.position["y"] = 0;
          spiderman.position["z"] = 0;
          spiderman.rotation.y = 0;

          console.log(spiderman.matrix);
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

  var scaleResize = {
    x: 0.2,
    y: 0.2,
    z: 0.2,
  };

  switch (e.which) {
    //Mover o spidermen para frente
    case 38:
      spiderman.position["z"] += stepPosition;
      break;
    //Mover o spidermen para tras
    case 40:
      spiderman.position["z"] -= stepPosition;
      break;
    //Mudar definição de câmera
    case 49: //camera 1
      camera.position["x"] = 10;
      camera.position["y"] = 10;
      camera.position["z"] = 10;
      break;
    case 50: //camera 2
      camera.position["x"] = 0;
      camera.position["y"] = 20;
      camera.position["z"] = 0;
      break;
    // Aumentar tamanho do objeto
    case 107:
    case 187:
      if (spiderman.position["x"] > 5) {
        alert("Voce está no tamanho máximo");
      } else {
        spiderman.position["x"] += scaleResize.x;
        spiderman.position["y"] += scaleResize.y;
        spiderman.position["z"] += scaleResize.z;
      }
      break;
    //Diminuir tamanho do objeto
    case 109:
    case 189:
      if (spiderman.position["x"] <= 0) {
        alert("Voce está no tamanho mínimo");
      } else {
        spiderman.position["x"] -= scaleResize.x;
        spiderman.position["y"] -= scaleResize.y;
        spiderman.position["z"] -= scaleResize.z;
      }
      break;
  }
}
