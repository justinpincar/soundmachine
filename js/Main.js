if ( System.support.webgl ) {
  init();
  build();
  animate();
} else {
  alert("It looks like you don't have webgl support... this animation will not work on your broswer :-(");
}

function init() {
  console.log("init()");

  stats = new Stats();
  stats.setMode(1);
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';
  document.body.appendChild( stats.domElement );

  audio = document.createElement('audio');

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 5000 );
  camera.position.x = 200;
  camera.position.y = 900;
  camera.position.z = 900;
  camera.target = new THREE.Vector3( 0, 0, 0 );
  camera.lookAt(camera.target);
  scene.add( camera );

  var ambient = new THREE.AmbientLight( 0x606060 );
  scene.add( ambient );

  var light = new THREE.SpotLight( 0xffffff, 2 );
  light.position.set( 0, 0, 0 );
  light.castShadow = true;
  light.shadowDarkness = 0.25;
  scene.add( light );

  renderer = new THREE.WebGLRenderer( { alpha: false } );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.shadowMapEnabled = true;
  renderer.shadowMapSoft = true;
  document.body.appendChild( renderer.domElement );
}

function build() {
  console.log("build()");

  pathCamera = new THREE.Spline( [
                                new THREE.Vector3( 200, 900, 900 ),
                                new THREE.Vector3( -200, 900, 900 ),
                                new THREE.Vector3( -200, 700, 400 ),
                                new THREE.Vector3( 200, 900, 900 )
  ] );

  sequencer = new Sequencer();

  var songId = "TRFQKKE12078BB11F9"; // Daft Punk - Harder, Better, Faster, Stronger

  fetchTrackInfo( songId, function ( data ) {
    var machine1 = new Machine1(sequencer, data);
    scene.add(machine1);

    audio.src = 'js/assets/' + songId + '.mp3';
    audio.play();
  });
}

function animate() {
  stats.begin();
  requestAnimationFrame( animate );
  update();
  stats.end();
}

function update() {
  if (!isNaN(audio.duration)) {
    var timeFraction = audio.currentTime / audio.duration;
    var speedUp = 10;
    var scaledTime = timeFraction * speedUp;
    while (scaledTime > 1) {
      scaledTime += -1;
    }

    camera.position.copy( pathCamera.getPoint( scaledTime ) );
    camera.lookAt( camera.target );
  }

  sequencer.update( audio.currentTime );
  renderer.render( scene, camera );
}

