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

function openImg() { //Exibindo objeto 3D em uma Imagem
  var tab = window.open('', ''); //Abrindo nova guia
  tab.document.title = "Visualização em Imagem"; //Inserindo um título na nova guia
  
  //Criando imagem e inserindo ela no DOM da nova aba
  var img = new Image();
  renderer.render(scene, camera);
  img.src = renderer.domElement.toDataURL();
  tab.document.body.appendChild(img);    
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
    //Abrindo nova aba para visualizar o objeto em uma imagem
    case 13:
      openImg();
      break;
    case 82:
      raster()
      break;
  }
}
function raster(){

  var base_url = 'http://localhost/pp3-pg/'

  var array = []

  var file = loadFile(base_url + 'assets/3D/base_spider_man/base_spider_man.obj')
  file = file.split('\n')
  for(i = 0; i < file.length; i++){
    if(file[i].split(' ')[0].length == 1){
      var split = file[i].split(' ')
      var aux = {
        x: Math.round((split[1]*100)),
        y: Math.round((split[2]*100)),
      }
      array.push(aux)
    }
  }
  file = undefined;
  array = array.filter((obj, index, self) =>
    index === self.findIndex((t) => (
      t.x === obj.x && t.y === obj.y
    ))
  )
  console.log(array)

  var canvas = document.createElement("canvas");
  canvas.setAttribute("width", 1000);
  canvas.setAttribute("height", 1000);
  canvas.setAttribute("style", "position: absolute; x:0; y:0;");
  document.body.appendChild(canvas);

  //Then you can draw a point at (10,10) like this:

  var ctx = canvas.getContext("2d");
  for(i = 0; i < array.length; i++){
    ctx.fillRect(500-array[i].x,(500-array[i].y),10,10);
  }

  const dataUrl = canvas.toDataURL("png");
  var iframe = "<iframe width='100%' height='100%' src='" + dataUrl + "'></iframe>"
  console.log(dataUrl);
  const win = window.open();
  win.document.open();
  win.document.write(iframe);
}