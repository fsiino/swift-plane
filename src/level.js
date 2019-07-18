// Responsible for drawing the background and obstacles.
// Will control the logic for how the obstacles move and how they are generated

export default class Level {
  constructor(dimensions) {
    this.dimensions = dimensions;
  }

  animate(ctx) {
    this.drawBackground(ctx);
  }

  drawBackground(ctx) {
    ctx.fillStyle = "skyblue";
    ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
  }
}