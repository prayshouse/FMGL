/**
 * Created by stardust on 2016/12/3.
 */



var scene, camera, renderer;
var objectHolder, loadManager, controls;

init();

function init() {

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( 800, 600 );
    document.body.appendChild( renderer.domElement );

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
        35,             // Field of view
        800 / 600,     // Aspect ratio
        0.1,            // Near plane
        10000           // Far plane
    );
    camera.position.set( 0, 10, 20 );
    camera.lookAt(new THREE.Vector3(0, 0, camera.position.y / 2));

    objectHolder = new THREE.Object3D();
    scene.add(objectHolder);

    initLight();

    var plane = new THREE.PlaneGeometry(10, 10, 1, 1);
    var material = new THREE.MeshLambertMaterial( { color : 0x00ee00 } );
    var planeMesh = new THREE.Mesh( plane, material );
    planeMesh.position.set( 0, 0, 0 );
    planeMesh.doubleSided = true;
    planeMesh.rotateX(45);
    objectHolder.add( planeMesh );

    render();
    requestAnimationFrame(animate);
}

function animate() {
    objectHolder.rotation.z += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

function initLight() {
    var light = new THREE.PointLight( 0xFFFFFF );
    light.position.set( 10, 0, 10 );
    scene.add( light );

    var ambient = new THREE.AmbientLight( 0xaaaaaa );
    scene.add(ambient)
}

function loadobj() {
    if( !loadManager )
        // loadManager = new THREE.LoadingManager();
    var loader = new THREE.FBXLoader( );

    loader.load(
        './models/xsi_man_skinning.fbx',
        function ( object ) {
            if( object  )
            object.scale.set(.1, .1, .1);
            objectHolder.add( object );
        }
    );

}

function render() {
    renderer.setClearColor( 0xdddddd, 1);
    renderer.render( scene, camera );
}
