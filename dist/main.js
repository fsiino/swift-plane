/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return PaperPlane; });\n/* harmony import */ var _level__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./level */ \"./src/level.js\");\n/* harmony import */ var _plane__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plane */ \"./src/plane.js\");\n// Canvas\n\n\n\n\n\nclass PaperPlane {\n  constructor(canvas) {\n    this.ctx = canvas.getContext(\"2d\");\n    this.dimensions = { width: canvas.width, height: canvas.height };\n    this.listenForEvents();\n    this.restart();\n    this.startScreen();\n  }\n\n  play() {\n    this.running = true;\n    this.animate();\n  }\n\n  restart() {\n    this.running = false;\n    this.score = 0;\n    this.plane = new _plane__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.dimensions);\n    this.level = new _level__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.dimensions); // pass in canvas dimensions.\n    this.animate();\n  }\n\n  animate() {\n    this.level.animate(this.ctx);\n    this.plane.animate(this.ctx);\n\n    if (this.gameOver()) {\n      // alert(`You scored ${this.score}`);\n      this.restart();\n      this.endScreen();\n    }\n\n    this.level.passedPipe(this.plane.bounds(), () => {\n      this.score += 1;\n      // console.log(this.score);\n    });\n\n    if (this.running) {\n      this.drawScore();\n      requestAnimationFrame(this.animate.bind(this));\n    }\n\n  }\n\n  gameOver() {\n    return (\n      this.level.collidesWith(this.plane.bounds()) || this.plane.outOfBounds(this.height)\n      );\n  }\n\n  listenForEvents() {\n    window.addEventListener(\"keydown\", (e) => {\n      let key_state = (event.type === \"keydown\") ? true : false;\n      switch (e.keyCode) {\n        case 65:\n          key_state = \"left\";\n          if (this.running) this.move(key_state);\n          // console.log(\"left was pressed\");\n          break;\n        case 68:\n          key_state = \"right\";\n          if (this.running) this.move(key_state);\n          // console.log(\"right was pressed\");\n          break;\n        case 87:\n          key_state = \"up\";\n          if (this.running) this.move(key_state);\n          // console.log(\"up was pressed\");\n          break;\n        case 83:\n          key_state = \"down\";\n          if (this.running) this.move(key_state);\n          // console.log(\"down was pressed\");\n          break;\n      }\n    }, false);\n    \n  }\n\n  startScreen() {\n    this.ctx.font = \"bold 40pt 'Arial'\";\n    this.ctx.fillStyle = \"#000000\";\n    this.ctx.textAlign = \"center\";\n    this.ctx.fillText(\"swiftPlane!\", this.dimensions.width/2, this.dimensions.height/2 - 50);\n    this.ctx.font = \"20pt 'Arial'\";\n    this.ctx.fillText(\"Press [ENTER] to Begin\", this.dimensions.width/2, this.dimensions.height/2 + 40 - 50);\n    this.ctx.fillText(\"Controls:\", this.dimensions.width/2, this.dimensions.height/2 + 90 - 50);\n    this.ctx.font = \"16pt 'Arial'\";\n    this.ctx.fillText(\"[W]  Propel Upward  ⬆️\", this.dimensions.width/2, this.dimensions.height/2 + 115 - 50);\n    this.ctx.fillText(\"[S]  Descend  ⬇️\", this.dimensions.width/2, this.dimensions.height/2 + 145 - 50);\n    this.ctx.fillText(\"[A]  Backpedal  ⬅️\", this.dimensions.width/2, this.dimensions.height/2 + 175 - 50);\n    this.ctx.fillText(\"[D]  Propel Forward  ➡️\", this.dimensions.width/2, this.dimensions.height/2 + 205 - 50);\n\n    window.addEventListener(\"keydown\", (e) => {\n      if (e.keyCode === 13) {\n        this.play();\n      } \n    });\n  }\n\n  endScreen() {\n    this.ctx.font = \"bold 40 pt 'Arial'\";\n    this.ctx.fillStyle = \"#000000\";\n    this.ctx.textAlign = \"center\";\n    this.ctx.fillText(\"Game Over!\", this.dimensions.width/2, this.dimensions.height/2 - 40);\n    this.ctx.fillText(`You Scored ${this.score}`, this.dimensions.width/2, this.dimensions.height/2);\n    this.ctx.fillText(\"Press ENTER to Play Again\", this.dimensions.width/2, this.dimensions.height/2 + 80);\n\n    window.addEventListener(\"keydown\", (e) => {\n      if (e.keyCode === 87) return false;\n    });\n   \n  }\n\n  move(key_state) {\n    if (!this.running) {\n      this.play();\n    }\n    this.plane.fly(key_state);\n  }\n\n  drawScore() {\n    const loc = { x: 10, y: 32 };\n    this.ctx.font = \"bold 18pt 'Press Start 2P'\";\n    this.ctx.textAlign = 'left';\n    this.ctx.fillStyle = \"white\";\n    this.ctx.fillText(`SCORE: ${this.score}`, loc.x, loc.y);\n    this.ctx.strokeStyle = \"black\";\n    this.ctx.lineWidth = 1;\n    this.ctx.strokeText(`SCORE: ${this.score}`, loc.x, loc.y);\n  }\n\n}\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\nconst canvas = document.getElementById('plane-game');\nnew _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas);\n\n// index.js < game.js < level.js, plane.js\n// entry file < canvas file < game logic file < player file\n\n//TODO: Make plane get pushed to the left overtime\n//TODO: Make pipes move faster overtime (PIPE_SPEED)\n//TODO: Make background scroll infinitely\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/level.js":
/*!**********************!*\
  !*** ./src/level.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Level; });\nconst TUNE = {\n  PIPE_SPEED: 4,\n  GAP_HEIGHT: 200,\n  PIPE_WIDTH: 130,\n  EDGE_BUFFER: 50,\n  PIPE_SPACING: 370,\n  WARM_UP_SECONDS: 1\n};\n\nclass Level {\n  constructor(dimensions) {\n    this.dimensions = dimensions;\n\n    const firstPipeDistance =\n      this.dimensions.width +\n      (TUNE.WARM_UP_SECONDS * 60 * TUNE.PIPE_SPEED);\n\n    this.pipes = [\n      this.randomPipe(firstPipeDistance),\n      this.randomPipe(firstPipeDistance + TUNE.PIPE_SPACING),\n      this.randomPipe(firstPipeDistance + (TUNE.PIPE_SPACING * 2)),\n    ];\n  }\n\n  randomPipe(x) {\n    // const heightRange = this.dimensions.height - (2 * TUNE.EDGE_BUFFER) - TUNE.GAP_HEIGHT;\n    const heightRange = (this.dimensions.height / 2) ;\n    const gapTop = (Math.random() * heightRange) + TUNE.EDGE_BUFFER;\n    const pipe = {\n      topPipe: {\n        left: x,\n        right: TUNE.PIPE_WIDTH + x,\n        top: 0,\n        bottom: gapTop\n      },\n      bottomPipe: {\n        left: x,\n        right: TUNE.PIPE_WIDTH + x,\n        top: gapTop + TUNE.GAP_HEIGHT,\n        bottom: this.dimensions.height\n      },\n      passed: false\n    };\n    return pipe;\n  }\n\n  animate(ctx) {\n    this.drawBackground(ctx);\n    this.movePipes();\n    this.drawPipes(ctx);\n  }\n\n  drawBackground(ctx) {\n    ctx.drawImage(document.getElementById(\"hidden-scroll-bg\"), 0, 0, this.dimensions.width, this.dimensions.height)\n  }\n\n  passedPipe(plane, callback) {\n    this.eachPipe((pipe) => {\n      if (pipe.topPipe.right < plane.left) {\n        if (!pipe.passed) {\n          pipe.passed = true;\n          callback();\n        }\n      }\n    });\n  }\n\n  movePipes() {\n    this.eachPipe(function (pipe) {\n      pipe.topPipe.left -= TUNE.PIPE_SPEED;\n      pipe.topPipe.right -= TUNE.PIPE_SPEED;\n      pipe.bottomPipe.left -= TUNE.PIPE_SPEED;\n      pipe.bottomPipe.right -= TUNE.PIPE_SPEED;\n    });\n\n    if (this.pipes[0].topPipe.right <= 0) {\n      this.pipes.shift();\n      const newX = this.pipes[1].topPipe.left + TUNE.PIPE_SPACING;\n      this.pipes.push(this.randomPipe(newX));\n    } // Adds a new pipe to the right of the screen if a pipe has moved off the left side of the screen.\n  }\n\n  drawPipes(ctx) {\n    this.eachPipe(function (pipe) {\n      ctx.fillStyle = \"green\";\n\n      //draw top pipe\n     // ctx.fillRect(\n        ctx.drawImage(\n        document.getElementById(\"hidden-top-pipe\"),\n        pipe.topPipe.left,\n        pipe.topPipe.top,\n        TUNE.PIPE_WIDTH,\n        pipe.topPipe.bottom - pipe.topPipe.top\n      );\n      //draw bottom pipe\n      // ctx.fillRect(\n        ctx.drawImage(\n        document.getElementById(\"hidden-bottom-pipe\"),\n        pipe.bottomPipe.left,\n        pipe.bottomPipe.top,\n        TUNE.PIPE_WIDTH,\n        pipe.bottomPipe.bottom - pipe.bottomPipe.top\n      );\n    });\n\n    // Increase game speed overtime\n    TUNE.PIPE_SPEED += 0.001;\n  }\n\n  eachPipe(callback) {\n    this.pipes.forEach(callback.bind(this));\n  }\n  \n  collidesWith(plane) {\n    const _overlap = (rect1, rect2) => {\n      //check that they don't overlap in the x axis\n      if (rect1.left > rect2.right || rect1.right < rect2.left) {\n        return false;\n      }\n      //check that they don't overlap in the y axis\n      if (rect1.top > rect2.bottom || rect1.bottom < rect2.top) {\n        return false;\n      }\n      return true;\n    }; // returns true if the pipe overlaps with the plane\n    let collision = false;\n    this.eachPipe((pipe) => {\n      if (\n        //check if the plane is overlapping (colliding) with either pipe\n        _overlap(pipe.topPipe, plane) ||\n        _overlap(pipe.bottomPipe, plane)\n      ) { collision = true; }\n    });\n    return collision; //return true if plane collides with a pipe\n  }\n\n}\n\n//# sourceURL=webpack:///./src/level.js?");

/***/ }),

/***/ "./src/plane.js":
/*!**********************!*\
  !*** ./src/plane.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Plane; });\n\nconst TUNE = {\n  GRAVITY: 0.2,\n  FLT_SPEED: 4,\n  TERMINAL_VEL: 12,\n  PLANE_WIDTH: 60,\n  PLANE_HEIGHT: 30,\n\n  PLANE_PULL: 0.7\n};\n\nclass Plane {\n\n  constructor(dimensions) {\n    this.dimensions = dimensions;\n    this.x = this.dimensions.width / 3;\n    this.y = this.dimensions.height / 2;\n    this.vel = 0;\n    this.xVel = 0;\n    this.yVel = 0;\n   \n  }\n\n  fly(key_state) {\n    if (key_state === \"up\") this.vel = -1 * TUNE.FLT_SPEED;\n    if (key_state === \"right\") this.xVel += 17;\n    if (key_state === \"left\") this.xVel -= 17;\n    if (key_state === \"down\") this.yVel += 10;\n  }\n\n  movePlane() {\n    this.y += this.vel;\n    this.vel += TUNE.GRAVITY;\n    \n    if (Math.abs(this.vel) > TUNE.TERMINAL_VEL) {\n      if (this.vel > 0) {\n        this.vel = TUNE.TERMINAL_VEL;\n      } else {\n        this.vel = TUNE.TERMINAL_VEL * -1;\n      }\n    }\n\n    this.x += this.xVel;\n    this.y += this.yVel;\n    this.xVel *= 0.9;\n    this.yVel *= 0.9;\n\n  }\n\n  windResistance() {\n    if (!this.fly()) {\n      this.x -= TUNE.PLANE_PULL;\n    }\n  }\n\n  animate(ctx) {\n    this.movePlane();\n    this.drawPlane(ctx);\n    this.windResistance();\n  }\n\n  drawPlane(ctx) {\n    let img = document.getElementById(\"hidden-plane\");\n    ctx.drawImage(img, this.x, this.y, TUNE.PLANE_WIDTH, TUNE.PLANE_HEIGHT);\n  }\n\n  bounds() {\n    return {\n      left: this.x,\n      right: this.x + TUNE.PLANE_WIDTH,\n      top: this.y,\n      bottom: this.y + TUNE.PLANE_HEIGHT\n    };\n  }\n\n  outOfBounds() {\n    const aboveTheTop = this.y < 0;\n    const belowTheBottom = this.y + TUNE.PLANE_HEIGHT > this.dimensions.height;\n    return aboveTheTop || belowTheBottom;\n  }\n}\n\n//# sourceURL=webpack:///./src/plane.js?");

/***/ })

/******/ });