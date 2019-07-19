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
    this.score = 0;
    this.plane = new Plane(this.dimensions);
    this.level = new Level(this.dimensions); // pass in canvas dimensions.
    this.animate();
  }

  // Will call animate on Level class.
  animate () {
    this.level.animate(this.ctx);
    this.plane.animate(this.ctx);

    if (this.gameOver()) {
      alert(this.score);
      this.restart();
    }

    this.level.passedBridge(this.plane.bounds(), () => {
      this.score += 1;
      console.log(this.score);
    });

    this.drawScore();

    if (this.running) {
      requestAnimationFrame(this.animate.bind(this));
    }
  }

  gameOver() {
    return (
      this.level.collidesWith(this.plane.bounds()) || this.plane.outOfBounds(this.height)
    );
  }

  listenForEvents() {
    // this.ctx.canvas.addEventListener("mousedown", this.click.bind(this)); // Bind is used to keep track of the ctx.

    window.addEventListener("keydown", (e) => { 
      switch(e.keyCode) {
        case 65:
          this.moveLeft();
          console.log("left was pressed");
          break;
        case 68:
          this.moveRight();
          console.log("right was pressed");
          break;
      }
    }, false);
  }

  moveLeft() {
    if (!this.running) {
      this.play();
    }
      this.plane.flyLeft();
    }

  moveRight() {
    if (!this.running) {
      this.play();
    }
      this.plane.flyRight();
    }

  // click(e) {
  //   if (!this.running) {
  //     this.play();
  //   }
  //     this.plane.fly();
  //   }

  drawScore() {
    const loc = { x: this.dimensions.width / 2, y: this.dimensions.height / 4 }
    this.ctx.font = "bold 50pt times new roman";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(this.score, loc.x, loc.y);
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 2;
    this.ctx.strokeText(this.score, loc.x, loc.y);
  }

}
