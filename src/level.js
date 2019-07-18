// Responsible for drawing the background and obstacles.
// Will control the logic for how the obstacles move and how they are generated

const TUNE = {
  BRIDGE_SPEED: 2,
  SPACE_HEIGHT: 150,
  BRIDGE_WIDTH: 50,
  EDGE_BUFFER: 50,
  BRIDGE_SPACING: 220, // distance between pairs of bridges
  WARM_UP_SECONDS: 1 // gap between two bridges
}

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
        left: XMLDocument,
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

  eachBridge(callback) {
    this.bridges.forEach(callback.bind(this));
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

  drawBridges(ctx) {
    this.eachBridge(function (bridge) {
      ctx.fillStyle = "green";

      //draw top bridge
      ctx.fillRect(
        bridge.topBridge.left,
        bridge.topBridge.top,
        TUNE.BRIDGE_WIDTH,
        bridge.topBridge.bottom - bridge.topBridge.top
      );
      //draw bottom bridge
      ctx.fillRect(
        bridge.bottomBridge.left,
        bridge.bottomBridge.top,
        TUNE.BRIDGE_WIDTH,
        bridge.bottomBridge.bottom - bridge.bottomBridge.top
      );
    });
  }

  collidesWith(plane) {
    //this function returns true if the the rectangles overlap
    const _overlap = (rect1, rect2) => {
      //check that they don't overlap in the x axis
      if (rect1.left > rect2.right || rect1.right < rect2.left) {
        return false;
      }
      //check that they don't overlap in the y axis
      if (rect1.top > rect2.bottom || rect1.bottom < rect2.top) {
        return false;
      }
      return true;
    };
    let collision = false;
    this.eachBridge((bridge) => {
      if (
        //check if the plane is overlapping (colliding) with either bridge
        _overlap(bridge.topBridge, plane) ||
        _overlap(bridge.bottomBridge, plane)
      ) { collision = true; }
    });
    return collision;
  }

  animate(ctx) {
    this.drawBackground(ctx);
  }

  drawBackground(ctx) {
    ctx.fillStyle = "skyblue";
    ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
  }
}