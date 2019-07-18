const TUNE = {
  PLANE_WIDTH: 40,
  PLANE_HEIGHT: 30,
  GRAVITY: 0.5,
  FLT_SPEED: 0.8,
  TERMINAL_VEL: 12

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
    this.movePlane();
    this.drawPlane(ctx);
  }

  fly() {
    this.velocity = (-1 * TUNE.FLT_SPEED);
  }

  movePlane () {
    this.posY += this.velocity;
    this.velocity += TUNE.GRAVITY;

    if (Math.abs(this.velocity) > TUNE.TERMINAL_VEL) {
      if (this.velocity > 0) {
        this.velocity = TUNE.TERMINAL_VEL;
      } else {
        this.velocity = TUNE.TERMINAL_VEL * -1;
      }
    }
  }
}