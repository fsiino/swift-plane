const TUNE = {
  PIPE_SPEED: 4,
  GAP_HEIGHT: 200,
  PIPE_WIDTH: 130,
  EDGE_BUFFER: 50,
  PIPE_SPACING: 370,
  WARM_UP_SECONDS: 1
};

export default class Level {
  constructor(dimensions) {
    this.dimensions = dimensions;

    const firstPipeDistance =
      this.dimensions.width +
      (TUNE.WARM_UP_SECONDS * 60 * TUNE.PIPE_SPEED);

    this.pipes = [
      this.randomPipe(firstPipeDistance),
      this.randomPipe(firstPipeDistance + TUNE.PIPE_SPACING),
      this.randomPipe(firstPipeDistance + (TUNE.PIPE_SPACING * 2)),
    ];
  }

  randomPipe(x) {
    // const heightRange = this.dimensions.height - (2 * TUNE.EDGE_BUFFER) - TUNE.GAP_HEIGHT;
    const heightRange = (this.dimensions.height / 2) ;
    const gapTop = (Math.random() * heightRange) + TUNE.EDGE_BUFFER;
    const pipe = {
      topPipe: {
        left: x,
        right: TUNE.PIPE_WIDTH + x,
        top: 0,
        bottom: gapTop
      },
      bottomPipe: {
        left: x,
        right: TUNE.PIPE_WIDTH + x,
        top: gapTop + TUNE.GAP_HEIGHT,
        bottom: this.dimensions.height
      },
      passed: false
    };
    return pipe;
  }

  animate(ctx) {
    this.drawBackground(ctx);
    this.movePipes();
    this.drawPipes(ctx);
  }

  drawBackground(ctx) {
    ctx.drawImage(document.getElementById("hidden-scroll-bg"), 0, 0, this.dimensions.width, this.dimensions.height)
  }

  passedPipe(plane, callback) {
    this.eachPipe((pipe) => {
      if (pipe.topPipe.right < plane.left) {
        if (!pipe.passed) {
          pipe.passed = true;
          callback();
        }
      }
    });
  }

  movePipes() {
    this.eachPipe(function (pipe) {
      pipe.topPipe.left -= TUNE.PIPE_SPEED;
      pipe.topPipe.right -= TUNE.PIPE_SPEED;
      pipe.bottomPipe.left -= TUNE.PIPE_SPEED;
      pipe.bottomPipe.right -= TUNE.PIPE_SPEED;
    });

    if (this.pipes[0].topPipe.right <= 0) {
      this.pipes.shift();
      const newX = this.pipes[1].topPipe.left + TUNE.PIPE_SPACING;
      this.pipes.push(this.randomPipe(newX));
    } // Adds a new pipe to the right of the screen if a pipe has moved off the left side of the screen.
  }

  drawPipes(ctx) {
    this.eachPipe(function (pipe) {
      ctx.fillStyle = "green";

      //draw top pipe
     // ctx.fillRect(
        ctx.drawImage(
        document.getElementById("hidden-top-pipe"),
        pipe.topPipe.left,
        pipe.topPipe.top,
        TUNE.PIPE_WIDTH,
        pipe.topPipe.bottom - pipe.topPipe.top
      );
      //draw bottom pipe
      // ctx.fillRect(
        ctx.drawImage(
        document.getElementById("hidden-bottom-pipe"),
        pipe.bottomPipe.left,
        pipe.bottomPipe.top,
        TUNE.PIPE_WIDTH,
        pipe.bottomPipe.bottom - pipe.bottomPipe.top
      );
    });

    // Increase game speed overtime
    TUNE.PIPE_SPEED += 0.001;
  }

  eachPipe(callback) {
    this.pipes.forEach(callback.bind(this));
  }
  
  collidesWith(plane) {
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
    }; // returns true if the pipe overlaps with the plane
    let collision = false;
    this.eachPipe((pipe) => {
      if (
        //check if the plane is overlapping (colliding) with either pipe
        _overlap(pipe.topPipe, plane) ||
        _overlap(pipe.bottomPipe, plane)
      ) { collision = true; }
    });
    return collision; //return true if plane collides with a pipe
  }

}