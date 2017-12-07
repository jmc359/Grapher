// Initial configuration of Three.js setup


// Create a scene and perspectiveCamera
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

// Renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create and Add GridHelper
var size = 250;
var divisions = 250;
var gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);

// Set Camera's Position
camera.position.y = 5;
camera.position.z = 12.5;

// Bring App to Life
var animate = function () {
    requestAnimationFrame(animate);
	renderer.render(scene, camera);
};
animate();