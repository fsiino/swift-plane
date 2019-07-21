// Responsible for drawing the background and obstacles.
// Will control the logic for how the obstacles move and how they are generated

const TUNE = {
  TOWER_SPEED: 2,
  GAP_HEIGHT: 170,
  TOWER_WIDTH: 50,
  EDGE_BUFFER: 10,
  TOWER_SPACING: 320, // distance between pairs of towers
  WARM_UP_SECONDS: 1 // gap between two towers
};

export default class Level {
  constructor(dimensions) {
    this.dimensions = dimensions;

    const firstTowerDistance =
      this.dimensions.width + (TUNE.WARM_UP_SECONDS * 60 * TUNE.TOWER_SPEED);

    this.towers = [
      this.randomTower(firstTowerDistance),
      this.randomTower(firstTowerDistance + TUNE.TOWER_SPACING),
      this.randomTower(firstTowerDistance + (TUNE.TOWER_SPACING * 2)),
    ];
  }

  randomTower(b) {
    // const heightRange = this.dimensions.height - (2 * TUNE.EDGE_BUFFER) - TUNE.GAP_HEIGHT;
    const heightRange = this.dimensions.height / 2;
    // const gapTop = (Math.random() * heightRange) + TUNE.EDGE_BUFFER;
    const gapTop = (Math.random() * heightRange) + TUNE.EDGE_BUFFER;
    const tower = {
      // topTower: {
      //   left: b,
      //   right: TUNE.TOWER_WIDTH + b,
      //   top: 0,
      //   bottom: gapTop
      // },
      bottomTower: {
        left: b,
        right: TUNE.TOWER_WIDTH + b,
        top: gapTop + TUNE.GAP_HEIGHT,
        bottom: this.dimensions.height
      },
      passed: false
    };
    return tower;
  }

  animate(ctx) {
    this.drawBackground(ctx);
    this.moveTowers();
    this.drawTowers(ctx);
  }

  drawBackground(ctx) {
    let img = document.getElementById("hidden-sf-bg");
    ctx.drawImage(img, 0, 0, this.dimensions.width, this.dimensions.height);
  }

  passedTower(plane, callback) {
    this.eachTower((tower) => {
      // if (tower.topTower.right < plane.left) {
      if (tower.bottomTower.right < plane.left) {
        if (!tower.passed) {
          tower.passed = true;
          callback();
        }
      }
    });
  }

  moveTowers() {
    this.eachTower(tower => {
      // tower.topTower.left -= TUNE.TOWER_SPEED;
      // tower.topTower.right -= TUNE.TOWER_SPEED;
      tower.bottomTower.left -= TUNE.TOWER_SPEED;
      tower.bottomTower.right -= TUNE.TOWER_SPEED;
    });

    // if (this.towers[0].topTower.right <= 0) {
    if (this.towers[0].bottomTower.right <= 0) {
      this.towers.shift();
      // const newX = this.towers[1].topTower.left + TUNE.TOWER_SPACING + 75;
      const newX = this.towers[1].bottomTower.left + TUNE.TOWER_SPACING + 75;
      this.towers.push(this.randomTower(newX));
    }
  }

  eachTower(callback) {
    this.towers.forEach(callback.bind(this));
  }


  drawTowers(ctx) {
    this.eachTower(tower => {
      // ctx.fillStyle = "darkred";
      let img1 = document.getElementById("hidden-sf-tower");
      let img2 = document.getElementById("hidden-ta-pyr");

      let towers = [img1, img2];

      // ctx.fillRect(
      //   ctx.drawImage(
      //   img1,
      //   tower.topTower.left,
      //   tower.topTower.top,
      //   TUNE.TOWER_WIDTH,
      //   tower.topTower.bottom - tower.topTower.top
      // );
      // ctx.fillRect(
      ctx.drawImage(
        img2,
        tower.bottomTower.left,
        tower.bottomTower.top,
        TUNE.TOWER_WIDTH,
        tower.bottomTower.bottom - tower.bottomTower.top
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
    this.eachTower((tower) => {
      if (
        // _overlap(tower.topTower, plane) ||
        _overlap(tower.bottomTower, plane)
      ) { collision = true; }
    });
    return collision;
  }


}