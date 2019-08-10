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
      // alert(`You scored ${this.score}`);
      this.restart();
      this.endScreen();
      // this.startScreen();
    }

    this.level.passedPipe(this.plane.bounds(), () => {
      this.score += 1;
      console.log(this.score);
    });

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
      let key_state = (event.type === "keydown") ? true : false;
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
    // this.ctx.drawImage(document.getElementById("hidden-keyboard-a"), 50, 50, this.dimensions.width, this.dimensions.height);
    // this.ctx.drawImage(document.getElementById("hidden-keyboard-s"), 50, 50, this.dimensions.width, this.dimensions.height);
    // this.ctx.drawImage(document.getElementById("hidden-keyboard-d"), 50, 50, this.dimensions.width, this.dimensions.height);
    this.ctx.font = "bold 40pt 'Arial'";
    this.ctx.fillStyle = "#000000";
    this.ctx.textAlign = "center";
    this.ctx.fillText("swiftPlane!", this.dimensions.width/2, this.dimensions.height/2 - 50);
    this.ctx.font = "20pt 'Arial'";
    this.ctx.fillText("Press [ENTER] to Begin", this.dimensions.width/2, this.dimensions.height/2 + 40 - 50);
    this.ctx.fillText("Controls:", this.dimensions.width/2, this.dimensions.height/2 + 90 - 50);
    this.ctx.font = "16pt 'Arial'";
    this.ctx.fillText("[W]  Propel Upward  ⬆️", this.dimensions.width/2, this.dimensions.height/2 + 115 - 50);
    this.ctx.fillText("[S]  Descend  ⬇️", this.dimensions.width/2, this.dimensions.height/2 + 145 - 50);
    this.ctx.fillText("[A]  Backpedal  ⬅️", this.dimensions.width/2, this.dimensions.height/2 + 175 - 50);
    this.ctx.fillText("[D]  Propel Forward  ➡️", this.dimensions.width/2, this.dimensions.height/2 + 205 - 50);
    // this.ctx.drawImage(document.getElementById("hidden-keyboard-w"), 220, 220, 64, 64);


    window.addEventListener("keydown", (e) => {
      if (e.keyCode === 13) {
        this.play();
      }
    });
  }

  endScreen() {
    this.ctx.font = "bold 40 pt 'Arial'";
    this.ctx.fillStyle = "#000000";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Game Over!", this.dimensions.width/2, this.dimensions.height/2 - 40);
    this.ctx.fillText(`You Scored ${this.score}`, this.dimensions.width/2, this.dimensions.height/2);
    this.ctx.fillText("Press ENTER to Play Again", this.dimensions.width/2, this.dimensions.height/2 + 80);
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