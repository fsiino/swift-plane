// Canvas

import Level from './level';
import Plane from './plane';

export default class PaperPlane {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };
    this.listenForEvents();
    this.restart();
  }

  play() {
    this.running = true;
    this.animate();
  }

  restart() {
    this.running = false;
    this.score = 0;
    this.plane = new Plane(this.dimensions);
    this.level = new Level(this.dimensions); // pass in canvas dimensions.
    this.animate();
  }

  animate() {
    this.level.animate(this.ctx);
    this.plane.animate(this.ctx);

    if (this.gameOver()) {
      alert(`You scored ${this.score}`);
      this.restart();
    }

    this.level.passedTower(this.plane.bounds(), () => {
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

    window.addEventListener("keydown", (e) => {
      switch (e.keyCode) {
        case 65:
          this.moveLeft();
          // console.log("left was pressed");
          break;
        case 68:
          this.moveRight();
          // console.log("right was pressed");
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

  drawScore() {
    const loc = { x: 10, y: 32 };
    this.ctx.font = "bold 18pt 'Press Start 2P'";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(`SCORE: ${this.score}`, loc.x, loc.y);
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 1;
    this.ctx.strokeText(`SCORE: ${this.score}`, loc.x, loc.y);
  }

}