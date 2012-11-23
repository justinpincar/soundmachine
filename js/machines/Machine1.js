var Machine1 = function(sequencer, data) {
  var container = new THREE.Object3D();

  geometry = new THREE.CubeGeometry( 100, 100, 100 );
  material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
  mesh = new THREE.Mesh( geometry, material );
  container.add( mesh );

  producers = [];
  var radianSegmentLength = 2 * Math.PI / 12.0;
  var circleRadius = 500;
  for(var i=0; i<12; i++) {
    var geometry = new THREE.SphereGeometry(50, 20);
    var material = new THREE.MeshBasicMaterial( { color: 0x000000 });
    var mesh = new THREE.Mesh(geometry, material);
    var radians = radianSegmentLength * i;
    mesh.position.x = circleRadius * Math.cos(radians);
    mesh.position.y = 0;
    mesh.position.z = circleRadius * Math.sin(radians);
    producers.push(mesh);
    container.add(mesh);
  }

  var segments = data.segments;
  for (var i=0; i<segments.length; i++) {
    var segment = segments[i];
    var pitches = segment.pitch_list;
    var volume = segment.loudness_bucket;

    for (var j=0; j<pitches.length; j++) {
      var pitch = pitches[j];
      var producer = producers[pitch];

      var effect = new ColorEffect(producer, volume);
      sequencer.add(effect, segment.start, segment.start + segment.duration);
    }
  }

  return container;
}

