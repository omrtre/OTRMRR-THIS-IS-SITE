import * as THREE from '/assets/global/js/three.module.min.js';

var container;
var camera, scene, renderer;
var uniforms, material, mesh;
var mouseX = 0, mouseY = 0,
lat = 0, lon = 0, phy = 0, theta = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var startTime = Date.now();
var clock = new THREE.Clock();

init();

animate();
function init() {
container = document.getElementById( 'bgFutureHaze' );
camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000000 );
camera.position.z = 1.;
scene = new THREE.Scene();

uniforms = {
    iGlobalTime: { type: "f", value: 0.0 },
    audio1: { type: "f", value: 0.0 },
    iResolution: { type: "v2", value: new THREE.Vector2() },
    iChannel0:  { type: 't', value: new THREE.TextureLoader().load( './assets/app/otrmrr/res/texture.jpg') },
};
uniforms.iChannel0.value.wrapS = uniforms.iChannel0.value.wrapT = THREE.RepeatWrapping;

material = new THREE.ShaderMaterial( {
    uniforms: uniforms,
    vertexShader: document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent
});


var geometry = new THREE.PlaneGeometry( 1, 1 );
var mesh = new THREE.Mesh( geometry, material );
mesh.scale.x = window.innerWidth;
mesh.scale.y = window.innerHeight;

scene.add(mesh);

renderer = new THREE.WebGLRenderer();
    container.appendChild( renderer.domElement );
    uniforms.iResolution.value.x =  window.innerWidth;
    uniforms.iResolution.value.y = window.innerHeight;
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
    requestAnimationFrame( animate );
    render();
}

function render() {
    uniforms.iGlobalTime.value += clock.getDelta() *.1; //Evolution time.
    renderer.render( scene, camera );
}


window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize() {

    windowHalfX = window.innerWidth / 2,
    windowHalfY = window.innerHeight / 2,

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );


    uniforms.iResolution.value.x = window.innerWidth;
    uniforms.iResolution.value.y = window.innerHeight;
}