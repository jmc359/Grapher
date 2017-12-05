// 3D Grapher in Three.JS
// Upon entering a function, the user can visualize the equation graphically in this flask web app


// Standard global variables / Functions

var container, scene, camera, renderer, controls, stats;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();

init();
animate();

function init()
{
	// Scene

	scene = new THREE.Scene();

	// Camera

	var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 5100;
	camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	scene.add(camera);
	camera.position.set(150,150,150);
	camera.lookAt(scene.position);

	// Renderer

	if (Detector.webgl)
		renderer = new THREE.WebGLRenderer({antialias:true});
	else
		renderer = new THREE.CanvasRenderer();

	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	container = document.getElementById('ThreeJS');
	container.appendChild(renderer.domElement);

	// Events

	THREEx.WindowResize(renderer, camera);
	THREEx.FullScreen.bindKey({charCode : 'm'.charCodeAt(0)});

	// Controls

	controls = new THREE.OrbitControls(camera, renderer.domElement);

	// Stats

	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.bottom = '0px';
	stats.domElement.style.zIndex = 100;
	container.appendChild(stats.domElement);

	// Scene

	var axes = new THREE.AxesHelper(120);
	axes.position.set(0,0,0);
	scene.add(axes);

	var gridXZ = new THREE.GridHelper(200, 100);
	gridXZ.position.set(0,0,0);
	scene.add(gridXZ);

	var gridXY = new THREE.GridHelper(200, 100);
	gridXY.position.set(0,0,0);
	gridXY.rotation.x = Math.PI/2;
	scene.add(gridXY);

	var gridYZ = new THREE.GridHelper(200, 100);
	gridYZ.position.set(0,0,0);
	gridYZ.rotation.z = Math.PI/2;
	scene.add(gridYZ);

	// GUI

	var gui = new dat.GUI();
	var gui1 = new dat.GUI();
	var input =
	{
		equation: "sqrt(x^2+y^2)", // string for equation
		x_min: -50, // numeric
		x_max: 50, // numeric
		y_min: -50, // numeric
		y_max: 50, // numeric
		divisions: 300, // numeric
		f_color: "#ff0000", // color (hexadecimal)
		graphFunc: function() { createSurface(); },
		cameraTop: function() { cameraTop(); },
		cameraBottom: function() { cameraBottom(); },
		cameraX: function() { cameraX(); },
		cameraY: function() { cameraY(); },
		cameraReset: function() { cameraReset(); }
	};
	// Input menu

	gui.add(input, 'equation').name('z(x,y) =');
	gui.add(input, 'x_min').name('X min');
	gui.add(input, 'x_max').name('X max');
	gui.add(input, 'y_min').name('Y min');
	gui.add(input, 'y_max').name('Y max');
	gui.add(input, 'divisions').name('Divisions');
	gui.addColor(input, 'f_color').name('Color');
	gui.add(input, 'graphFunc').name('Graph Function');

	var f1 = gui.addFolder('Camera');
	f1.add(input, 'cameraTop').name("Top View");
	f1.add(input, 'cameraBottom').name("Bottom View");
	f1.add(input, 'cameraX').name("View from X axis");
	f1.add(input, 'cameraY').name("View from Y axis");
	f1.add(input, 'cameraReset').name("Reset View");
	gui.open();

	// Parsing + Graphing

	function createSurface(){
		//gui1.listen();
		var x_range = input.x_max - input.x_min;
		var y_range = input.y_max - input.y_min;
		var grid_x = x_range / input.divisions;
		var grid_y = y_range / input.divisions;
		var geom = new THREE.Geometry();
		for (var_x = input.x_min; var_x <= input.x_max; var_x += grid_x){
			for (var_y = input.y_min; var_y <= input.y_max; var_y += grid_y){
				var scope = {
				    x: var_x,
				    y: var_y
				};
				var node = math.parse(input.equation, scope);
				var code = node.compile();
				var z = code.eval(scope);
				if (!isNaN(z)){
					// y and z are switched graphically in three.js coordinates
					geom.vertices.push(new THREE.Vector3(var_x, z, var_y));
				}
			}
		}

		var tmaterial = new THREE.PointsMaterial({
		    color: input.f_color,
		    size: 1.2,
		});

		var pointCloud = new THREE.Points(geom, tmaterial);
		geom.verticesNeedUpdate = true;
		geom.computeVertexNormals();
		scene.add(pointCloud);

		var history =
		{
			graph: input.equation,
			toggle: true
		}
		var update = function() {
			gui1.add(history, 'graph').name('z(x,y) =');
			var visible = gui1.add(history, 'toggle').name('Show/Hide');

			visible.onChange(function(value) {
				if (value)
				{
					scene.add(pointCloud);
					value = true;
				}
				else
				{
					scene.remove(pointCloud);
					value = false;
				}
			});
		};
		update();
	}

	function cameraTop (){
		camera.position.set(0,200,0);
	}
	function cameraBottom (){
		camera.position.set(0,-200,0);
	}
	function cameraX (){
		camera.position.set(200,0,0);
	}
	function cameraY (){
		camera.position.set(0,0,200);
	}
	function cameraReset (){
		camera.position.set(150,150,150);
	}
}

function animate()
{
    requestAnimationFrame(animate);
	render();
	update();
}

function update()
{
	controls.update();
	stats.update();
}

function render()
{
	renderer.render(scene, camera);
}
