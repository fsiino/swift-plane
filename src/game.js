// Canvas

import Level from './level'; 
import Plane from './plane';

export default class PaperPlane {
  constructor(canvas){
    this.ctx = canvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };
    this.listenForEvents();
    this.restart(); 
  }

  play() {
    this.running = true;
    this.animate();
  }

  // Will create a new instance of Level and store that as an instance variable.
  // Will call animate.
  restart() {
    this.running = false;
    this.plane = new Plane(this.dimensions);
    this.level = new Level(this.dimensions); // pass in canvas dimensions.
    this.animate();
  }

  // Will call animate on Level class.
  animate () {
    this.level.animate(this.ctx);
    this.plane.animate(this.ctx);
    if (this.running) {
      requestAnimationFrame(this.animate.bind(this));
    }
    
  }

  gameOver() {
    return (
      this.level.collidesWith(this.plane.bounds()) || this.plane.outOfBounds(this.height)
    );
  }


  play () {
    this.running = true;
    this.animate();
  }

  listenForEvents() {
    this.ctx.canvas.addEventListener("mousedown", this.click.bind(this)); // Bind is used to keep track of the ctx.
  }

  click(e) {
    if (!this.running) {
      this.play();
      this.plane.fly();      
    } else {
      this.plane.fly();
    }
  }

}