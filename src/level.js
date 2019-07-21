// Responsible for drawing the background and obstacles.
// Will control the logic for how the obstacles move and how they are generated

const TUNE = {
  BRIDGE_SPEED: 2,
  GAP_HEIGHT: 170,
  BRIDGE_WIDTH: 50,
  EDGE_BUFFER: 50,
  BRIDGE_SPACING: 220, // distance between pairs of bridges
  WARM_UP_SECONDS: 1 // gap between two bridges
};

export default class Level {
  constructor(dimensions) {
    this.dimensions = dimensions;

    const firstBridgeDistance =
      this.dimensions.width + (TUNE.WARM_UP_SECONDS * 60 * TUNE.BRIDGE_SPEED);

    this.bridges = [
      this.randomBridge(firstBridgeDistance),
      this.randomBridge(firstBridgeDistance + TUNE.BRIDGE_SPACING),
      this.randomBridge(firstBridgeDistance + (TUNE.BRIDGE_SPACING * 2)),
    ];
  }

  randomBridge(b) {
    const heightRange = this.dimensions.height - (2 * TUNE.EDGE_BUFFER) - TUNE.GAP_HEIGHT;
    const gapTop = (Math.random() * heightRange) + TUNE.EDGE_BUFFER;
    const bridge = {
      topBridge: {
        left: b,
        right: TUNE.BRIDGE_WIDTH + b,
        top: 0,
        bottom: gapTop
      },
      bottomBridge: {
        left: b,
        right: TUNE.BRIDGE_WIDTH + b,
        top: gapTop + TUNE.GAP_HEIGHT,
        bottom: this.dimensions.height
      },
      passed: false
    };
    return bridge;
  }

  animate(ctx) {
    this.drawBackground(ctx);
    this.moveBridges();
    this.drawBridges(ctx);
  }

  drawBackground(ctx) {
    let img = document.getElementById("hidden-sky");
    ctx.drawImage(img, 0, 0, this.dimensions.width, this.dimensions.height);
  }

  passedBridge(plane, callback) {
    this.eachBridge((bridge) => {
      if (bridge.topBridge.right < plane.left) {
        if (!bridge.passed) {
          bridge.passed = true;
          callback();
        }
      }
    });
  }

  moveBridges() {
    this.eachBridge(bridge => {
      bridge.topBridge.left -= TUNE.BRIDGE_SPEED;
      bridge.topBridge.right -= TUNE.BRIDGE_SPEED;
      bridge.bottomBridge.left -= TUNE.BRIDGE_SPEED;
      bridge.bottomBridge.right -= TUNE.BRIDGE_SPEED;
    });

    if (this.bridges[0].topBridge.right <= 0) {
      this.bridges.shift();
      const newX = this.bridges[1].topBridge.left + TUNE.BRIDGE_SPACING;
      this.bridges.push(this.randomBridge(newX));
    }
  }

  eachBridge(callback) {
    this.bridges.forEach(callback.bind(this));
  }


  drawBridges(ctx) {
    this.eachBridge(bridge => {
      ctx.fillStyle = "darkred";
      let img1 = document.getElementById("hidden-sf-tower");
      let img2 = document.getElementById("hidden-ta-pyr");

      // ctx.fillRect(
        ctx.drawImage(
        img1,
        bridge.topBridge.left,
        bridge.topBridge.top,
        TUNE.BRIDGE_WIDTH,
        bridge.topBridge.bottom - bridge.topBridge.top
      );
      // ctx.fillRect(
      ctx.drawImage(
        img2,
        bridge.bottomBridge.left,
        bridge.bottomBridge.top,
        TUNE.BRIDGE_WIDTH,
        bridge.bottomBridge.bottom - bridge.bottomBridge.top
      );
    });
  }


  collidesWith(plane) {
    const _overlap = (rect1, rect2) => {
      if (rect1.left > rect2.right || rect1.right < rect2.left) {
        return false;
      }
      if (rect1.top > rect2.bottom || rect1.bottom < rect2.top) {
        return false;
      }
      return true;
    };
    let collision = false;
    this.eachBridge((bridge) => {
      if (
        _overlap(bridge.topBridge, plane) ||
        _overlap(bridge.bottomBridge, plane)
      ) { collision = true; }
    });
    return collision;
  }


}