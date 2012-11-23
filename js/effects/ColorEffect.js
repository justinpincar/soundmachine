var ColorEffect = function(mesh, intensity) {
  this.show = function() {
    mesh.material.color.setRGB(intensity, intensity, intensity);
  };

  this.hide = function() {
    mesh.material.color.setRGB(0, 0, 0);
  };
}

ColorEffect.prototype = new SequencerItem();
ColorEffect.prototype.constructor = ColorEffect();

