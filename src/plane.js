
const TUNE = {
  GRAVITY: 0.4,
  FLT_SPEED: 8,
  TERMINAL_VEL: 12,
  PLANE_WIDTH: 60,
  PLANE_HEIGHT: 30
};

export default class Plane {

  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = this.dimensions.width / 3;
    this.y = this.dimensions.height / 2;
    this.vel = 0;
    this.xVel = 0;
    this.yVel = 0;
   
  }

  fly(key_state) {
    if (key_state === "up") this.vel = -1 * TUNE.FLT_SPEED;
    if (key_state === "right") this.xVel += 15;
    if (key_state === "left") this.xVel -= 15;
    if (key_state === "down") this.yVel += 10;
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
    
    this.x += this.xVel;
    this.y += this.yVel;
    this.xVel *= 0.9;
    this.yVel *= 0.9;
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