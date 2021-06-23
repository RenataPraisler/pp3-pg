//Varibles
var container;
var camera, scene, renderer;
var ambientLight, pointLight;
var controls;
var inicialScale = 1;
var object = 0;
var cube1, cube2;

window.addEventListener("keydown", onKeyDown, false);
//Init Program
init();
animate();

//Functions
function init() {
  // Scene
  scene = new THREE.Scene();
  loader = new THREE.TextureLoader();
  loader.setCrossOrigin("");

  bgTexture = loader.load(
    "https://images.pexels.com/photos/1205301/pexels-photo-1205301.jpeg",
    function (texture) {
      var img = texture.image;
      bgWidth = img.width;
      bgHeight = img.height;
      resize();
    }
  );
  scene.background = bgTexture;

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
  // var axis = new THREE.AxisHelper(10);
  // scene.add(axis);

  //Load Models
  THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());

  var phongShader = THREE.ShaderLib.phong;
  var mUniforms = THREE.UniformsUtils.clone(phongShader.uniforms);

  // Material 1
  material = new THREE.ShaderMaterial({
    uniforms: mUniforms,
    vertexShader: document.getElementById("vertexShader").textContent,
    fragmentShader: document.getElementById("fragmentShader").textContent,
  });

  // CUBE 1
  var geometry = new THREE.BoxBufferGeometry(4, 4, 4);
  cube1 = new THREE.Mesh(geometry, material);
  scene.add(cube1);
  cube1.position.set(5, 4, -10);
  cube1.rotation.y = 0;

  // Material 2
  material = new THREE.RawShaderMaterial({
    uniforms: {
      colorA: { type: "vec3", value: new THREE.Color(0xff0000) },
      colorB: { type: "vec3", value: new THREE.Color(0x0000ff) },
    },
    vertexShader: vertexShader(),
    fragmentShader: fragmentShader(),
  });

  // CUBE 2
  var geometry = new THREE.BoxBufferGeometry(2, 4, 2);
  cube2 = new THREE.Mesh(geometry, material);
  scene.add(cube2);
  cube2.position.set(0, 5, 10);
  cube2.rotation.y = 0;

  //Load hulk abomination
  new THREE.MTLLoader()
    .setPath("assets/3D/hulk-abomination/")
    .load("hulk.mtl", function (materials) {
      materials.preload();
      new THREE.OBJLoader()
        .setMaterials(materials)
        .setPath("assets/3D/hulk-abomination/")
        .load("hulk.obj", function (object) {
          var scale = 0.007;
          hulkAbomination = object;
          scene.add(hulkAbomination);
          hulkAbomination.position["x"] = 0;
          hulkAbomination.position["y"] = 0;
          hulkAbomination.position["z"] = 0;
          hulkAbomination.rotation.y = 0;
          hulkAbomination.scale["x"] = scale;
          hulkAbomination.scale["y"] = scale;
          hulkAbomination.scale["z"] = scale;

          console.log(hulkAbomination.matrix);
        });
    });

  new THREE.MTLLoader()
    .setPath("assets/3D/doctor_octopus/")
    .load("octopus.mtl", function (materials) {
      materials.preload();
      new THREE.OBJLoader()
        .setMaterials(materials)
        .setPath("assets/3D/doctor_octopus/")
        .load("octopus.obj", function (object) {
          var scale = 3;
          octopus = object;
          scene.add(octopus);
          octopus.position["x"] = -10;
          octopus.position["y"] = 4;
          octopus.position["z"] = 3;
          octopus.scale["x"] = scale;
          octopus.scale["y"] = scale;
          octopus.scale["z"] = scale;
          octopus.rotation.y = -3.2;

          console.log(octopus.matrix);
        });
    });

  new THREE.MTLLoader()
    .setPath("assets/3D/ironman/")
    .load("Mark 42.mtl", function (materials) {
      materials.preload();
      new THREE.OBJLoader()
        .setMaterials(materials)
        .setPath("assets/3D/ironman/")
        .load("Mark 42.obj", function (object) {
          var scale = 3;
          ironman = object;
          scene.add(ironman);
          ironman.position["x"] = -5;
          ironman.position["y"] = 0;
          ironman.position["z"] = -10;
          ironman.scale["x"] = scale;
          ironman.scale["y"] = scale;
          ironman.scale["z"] = scale;
          ironman.rotation.y = 0.5;

          console.log(ironman.matrix);
        });
    });

  const light = new THREE.PointLight(0xffff00, 1, 100);
  light.position.set(5, 5, 5);
  scene.add(light);

  // Create Render
  renderer = new THREE.WebGLRenderer();
  // renderer.setClearColor("#333");
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  //Create Controls
  controls = new THREE.OrbitControls(camera);
  controls.enabled = false;
  controls.update();
}

function animate() {
  requestAnimationFrame(animate);
  rotate();
  controls.update();
  renderer.render(scene, camera);
}

function openImg() {
  //Exibindo objeto 3D em uma Imagem
  var tab = window.open("", ""); //Abrindo nova guia
  tab.document.title = "Visualização em Imagem"; //Inserindo um título na nova guia

  //Criando imagem e inserindo ela no DOM da nova aba
  var img = new Image();
  renderer.render(scene, camera);
  img.src = renderer.domElement.toDataURL();
  tab.document.body.appendChild(img);
}

function rotate() {
  var speed = 0.01;
  if (cube1 != null) {
    cube1.rotation.x += speed;
    cube1.rotation.y += speed * 2;
    cube1.rotation.z += speed;
  }
  if (cube2 != null) {
    cube2.rotation.x += speed;
    cube2.rotation.y += speed * 2;
    cube2.rotation.z += speed;
  }
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
    case 84:
      if (object == 0) {
        object = 1;
      } else {
        object = 0;
      }
      break;
    case 38:
      if (object == 0) {
        hulkAbomination.position["z"] += stepPosition;
      } else {
        octopus.position["z"] += stepPosition;
      }
      break;
    //Mover o spidermen para tras
    case 40:
      if (object == 0) {
        hulkAbomination.position["z"] -= stepPosition;
      } else {
        octopus.position["z"] -= stepPosition;
      }
      break;
    //Mudar definição de câmera
    case 49: //camera 1
      camera.position["x"] = 10;
      camera.position["y"] = 10;
      camera.position["z"] = 10;
      break;
    case 50: //camera 2
      camera.position["x"] = 0;
      camera.position["y"] = 30;
      camera.position["z"] = 0;
      break;
    case 51: //camera 3
      camera.position["x"] = 20;
      camera.position["y"] = 0;
      camera.position["z"] = 0;
      break;
    case 52: //camera 4
      camera.position["x"] = -15;
      camera.position["y"] = 5;
      camera.position["z"] = 15;
      break;
    case 53: //camera 5
      camera.position["x"] = 0;
      camera.position["y"] = 5;
      camera.position["z"] = -30;
      break;
    // Aumentar tamanho do objeto
    case 107:
    case 187:
      if (object == 0) {
        if (hulkAbomination.position["x"] > 5) {
          alert("Voce está no tamanho máximo");
        } else {
          hulkAbomination.position["x"] += scaleResize.x;
          hulkAbomination.position["y"] += scaleResize.y;
          hulkAbomination.position["z"] += scaleResize.z;
        }
      } else {
        if (octopus.position["x"] > 5) {
          alert("Voce está no tamanho máximo");
        } else {
          octopus.position["x"] += scaleResize.x;
          octopus.position["y"] += scaleResize.y;
          octopus.position["z"] += scaleResize.z;
        }
      }
      break;
    //Diminuir tamanho do objeto
    case 109:
    case 189:
      if (object == 0) {
        if (hulkAbomination.position["x"] <= 0) {
          alert("Voce está no tamanho mínimo");
        } else {
          hulkAbomination.position["x"] -= scaleResize.x;
          hulkAbomination.position["y"] -= scaleResize.y;
          hulkAbomination.position["z"] -= scaleResize.z;
        }
      } else {
        if (octopus.position["x"] <= 0) {
          alert("Voce está no tamanho mínimo");
        } else {
          octopus.position["x"] -= scaleResize.x;
          octopus.position["y"] -= scaleResize.y;
          octopus.position["z"] -= scaleResize.z;
        }
      }
      break;
    //Abrindo nova aba para visualizar o objeto em uma imagem
    case 13:
      openImg();
      break;
    case 82:
      raster();
      break;
  }
}
function raster() {
  var base_url = "http://localhost:40983/";

  var array = [];

  var file = loadFile("assets/3D/base_spider_man/base_spider_man.obj");
  file = file.split("\n");
  for (i = 0; i < file.length; i++) {
    if (file[i].split(" ")[0].length == 1) {
      var split = file[i].split(" ");
      var aux = {
        x: Math.round(split[1] * 100),
        y: Math.round(split[2] * 100),
      };
      array.push(aux);
    }
  }
  file = undefined;
  array = array.filter(
    (obj, index, self) =>
      index === self.findIndex((t) => t.x === obj.x && t.y === obj.y)
  );
  console.log(array);

  var canvas = document.createElement("canvas");
  canvas.setAttribute("width", 1000);
  canvas.setAttribute("height", 1000);
  canvas.setAttribute("style", "position: absolute; x:0; y:0;");
  document.body.appendChild(canvas);

  //Then you can draw a point at (10,10) like this:

  var ctx = canvas.getContext("2d");
  for (i = 0; i < array.length; i++) {
    ctx.fillRect(500 - array[i].x, 500 - array[i].y, 10, 10);
  }

  const dataUrl = canvas.toDataURL("png");
  var iframe =
    "<iframe width='100%' height='100%' src='" + dataUrl + "'></iframe>";
  console.log(dataUrl);
  const win = window.open();
  win.document.open();
  win.document.write(iframe);
}
function loadFile(filePath) {
  var result = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", filePath, false);
  xmlhttp.send();
  if (xmlhttp.status == 200) {
    result = xmlhttp.responseText;
  }
  return result;
}

function vertexShader() {
  return `
    varying vec3 vUv; 

    void main() {
      vUv = position; 

      vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * modelViewPosition; 
    }
  `;
}

function fragmentShader() {
  return `
      uniform vec3 colorA; 
      uniform vec3 colorB; 
      varying vec3 vUv;

      void main() {
        gl_FragColor = vec4(mix(colorA, colorB, vUv.z), 1.0);
      }
  `;
}
