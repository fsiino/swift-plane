const TUNE = {
  GRAVITY: 0.4,
  FLT_SPEED: 8,
  TERMINAL_VEL: 12,
  PLANE_WIDTH: 40,
  PLANE_HEIGHT: 30
};

export default class Plane {

  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = this.dimensions.width / 3;
    this.y = this.dimensions.height / 2;
    this.vel = 0;
  }

  flyLeft() {
    this.vel = -1 * TUNE.FLT_SPEED;
  }

  flyRight() {
    this.vel = -1 * TUNE.FLT_SPEED;
  }

  movePlane() {
    this.y += this.vel;
    this.vel += TUNE.GRAVITY;
    if (Math.abs(this.vel) > TUNE.TERMINAL_VEL) {
      if (this.vel > 0) {
        this.vel = TUNE.TERMINAL_VEL;
      } else {
        this.vel = TUNE.TERMINAL_VEL * -1;
      }
    }
  }

  animate(ctx) {
    this.movePlane();
    this.drawPlane(ctx);
  }

  drawPlane(ctx) {
    let img = document.getElementById("hidden-plane");
    ctx.drawImage(img, this.x, this.y, TUNE.PLANE_WIDTH, TUNE.PLANE_HEIGHT);
  }

  bounds() {
    return {
      left: this.x,
      right: this.x + TUNE.PLANE_WIDTH,
      top: this.y,
      bottom: this.y + TUNE.PLANE_HEIGHT
    };
  }

  outOfBounds() {
    const aboveTheTop = this.y < 0;
    const belowTheBottom = this.y + TUNE.PLANE_HEIGHT > this.dimensions.height;
    return aboveTheTop || belowTheBottom;
  }
}