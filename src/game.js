// Canvas

import Level from './level';
import Plane from './plane';

export default class PaperPlane {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };
    this.listenForEvents();
    this.restart();
    this.startScreen();
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
      this.startScreen();
    }

    this.level.passedPipe(this.plane.bounds(), () => {
      this.score += 1;
      console.log(this.score);
    });

    // this.drawScore();
    
    if (this.running) {
      this.drawScore();
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
      let key_state = (event.type == "keydown") ? true : false;
      switch (e.keyCode) {
        case 65:
          key_state = "left";
          this.move(key_state);
          // console.log("left was pressed");
          break;
        case 68:
          key_state = "right";
          this.move(key_state);
          // console.log("right was pressed");
          break;
        case 87:
          key_state = "up";
          this.move(key_state);
          // console.log("up was pressed");
          break;
        case 83:
          key_state = "down";
          this.move(key_state);
          // console.log("down was pressed");
          break;
      }
    }, false);
  }

  startScreen() {
    this.ctx.font = "bold 40pt 'Press Start 2P'";
    this.ctx.fillStyle = "#000000";
    this.ctx.textAlign = "center";
    this.ctx.fillText("swiftPlane!", this.dimensions.width/2, this.dimensions.height/2);
    // this.ctx.fillRect(0, 0, this.dimensions.width/2, this.dimensions.height/2);
    this.ctx.font= "20pt 'Arial'";
    this.ctx.fillText("Press W/A/S/D to Begin", this.dimensions.width/2, this.dimensions.height/2 + 40);
  }


  move(key_state) {
    if (!this.running) {
      this.play();
    }
    this.plane.fly(key_state);
  }

  drawScore() {
    const loc = { x: 100, y: 32 };
    this.ctx.font = "bold 18pt 'Press Start 2P'";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(`SCORE: ${this.score}`, loc.x, loc.y);
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 1;
    this.ctx.strokeText(`SCORE: ${this.score}`, loc.x, loc.y);
  }

}