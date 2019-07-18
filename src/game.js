import Level from './level'; 
import Plane from './plane';

export default class PaperPlane {
  constructor(canvas){
    this.ctx = canvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };
    this.restart(); 
  }

  // Will create a new instance of Level and store that as an instance variable.
  // Will call animate.
  restart() {
    this.level = new Level(this.dimensions); // pass in canvas dimensions.
    this.plane = new Plane(this.dimensions);

    this.animate();
  }

  // Will call animate on Level class.
  animate () {
    this.level.animate(this.ctx);
    this.plane.animate(this.ctx);
  }
}