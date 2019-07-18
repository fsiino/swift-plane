const TUNE = {
  PLANE_WIDTH: 50,
  PLANE_HEIGHT: 50,
  
  GRAVITY: 0.5
};

export default class Plane {
  constructor(dimensions) {
    this.velocity = 0; // Can only move up and down.
    this.dimensions = dimensions; // take canvas dims an store them.
    this.posX = (this.dimensions.width / 2) - (TUNE.PLANE_WIDTH / 2); // Pos plane at middle of X axis
    this.posY = (this.dimensions.height / 2); // Pos plane 1/3 of the way up on Y axis
  }

  drawPlane (ctx) {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.posX, this.posY, TUNE.PLANE_WIDTH, TUNE.PLANE_HEIGHT); // Pos the rect, followed by size.
  }

  animate (ctx) {
    this.drawPlane(ctx);
    this.move();
  }

  movePlane () {
    this.velocity += this.posY;
    this.velocity += TUNE.GRAVITY;
  }
}