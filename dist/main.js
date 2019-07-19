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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return PaperPlane; });\n/* harmony import */ var _level__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./level */ \"./src/level.js\");\n/* harmony import */ var _plane__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plane */ \"./src/plane.js\");\n// Canvas\n\n \n\n\nclass PaperPlane {\n  constructor(canvas){\n    this.ctx = canvas.getContext(\"2d\");\n    this.dimensions = { width: canvas.width, height: canvas.height };\n    this.listenForEvents();\n    this.restart(); \n  }\n\n  play() {\n    this.running = true;\n    this.animate();\n  }\n\n  // Will create a new instance of Level and store that as an instance variable.\n  // Will call animate.\n  restart() {\n    this.running = false;\n    this.score = 0;\n    this.plane = new _plane__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.dimensions);\n    this.level = new _level__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.dimensions); // pass in canvas dimensions.\n    this.animate();\n  }\n\n  // Will call animate on Level class.\n  animate () {\n    this.level.animate(this.ctx);\n    this.plane.animate(this.ctx);\n\n    if (this.gameOver()) {\n      alert(this.score);\n      this.restart();\n    }\n\n    this.level.passedBridge(this.plane.bounds(), () => {\n      this.score += 1;\n      console.log(this.score);\n    });\n\n    this.drawScore();\n\n    if (this.running) {\n      requestAnimationFrame(this.animate.bind(this));\n    }\n  }\n\n  gameOver() {\n    return (\n      this.level.collidesWith(this.plane.bounds()) || this.plane.outOfBounds(this.height)\n    );\n  }\n\n  listenForEvents() {\n    // this.ctx.canvas.addEventListener(\"mousedown\", this.click.bind(this)); // Bind is used to keep track of the ctx.\n\n    window.addEventListener(\"keydown\", (e) => { \n      switch(e.keyCode) {\n        case 65:\n          this.moveLeft();\n          console.log(\"left was pressed\");\n          break;\n        case 68:\n          this.moveRight();\n          console.log(\"right was pressed\");\n          break;\n      }\n    }, false);\n  }\n\n  moveLeft() {\n    if (!this.running) {\n      this.play();\n    }\n      this.plane.flyLeft();\n    }\n\n  moveRight() {\n    if (!this.running) {\n      this.play();\n    }\n      this.plane.flyRight();\n    }\n\n  // click(e) {\n  //   if (!this.running) {\n  //     this.play();\n  //   }\n  //     this.plane.fly();\n  //   }\n\n  drawScore() {\n    const loc = { x: this.dimensions.width / 2, y: this.dimensions.height / 4 }\n    this.ctx.font = \"bold 50pt times new roman\";\n    this.ctx.fillStyle = \"white\";\n    this.ctx.fillText(this.score, loc.x, loc.y);\n    this.ctx.strokeStyle = \"black\";\n    this.ctx.lineWidth = 2;\n    this.ctx.strokeText(this.score, loc.x, loc.y);\n  }\n\n}\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\nconst canvas = document.getElementById('plane-game');\nnew _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas);\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/level.js":
/*!**********************!*\
  !*** ./src/level.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Level; });\n// Responsible for drawing the background and obstacles.\n// Will control the logic for how the obstacles move and how they are generated\n\nconst TUNE = {\n  BRIDGE_SPEED: 2,\n  GAP_HEIGHT: 150,\n  BRIDGE_WIDTH: 50,\n  EDGE_BUFFER: 50,\n  BRIDGE_SPACING: 220, // distance between pairs of bridges\n  WARM_UP_SECONDS: 1 // gap between two bridges\n};\n\nclass Level {\n  constructor(dimensions) {\n    this.dimensions = dimensions;\n\n    const firstBridgeDistance = \n      this.dimensions.width + (TUNE.WARM_UP_SECONDS * 60 * TUNE.BRIDGE_SPEED);\n\n    this.bridges = [\n      this.randomBridge(firstBridgeDistance),\n      this.randomBridge(firstBridgeDistance + TUNE.BRIDGE_SPACING),\n      this.randomBridge(firstBridgeDistance + (TUNE.BRIDGE_SPACING * 2)),\n    ];\n  }\n\n  randomBridge(b) {\n    const heightRange = this.dimensions.height - (2 * TUNE.EDGE_BUFFER) - TUNE.GAP_HEIGHT;\n    const gapTop = (Math.random() * heightRange) + TUNE.EDGE_BUFFER;\n    const bridge = {\n      topBridge: {\n        left: b,\n        right: TUNE.BRIDGE_WIDTH + b,\n        top: 0,\n        bottom: gapTop\n      },\n      bottomBridge: {\n        left: b,\n        right: TUNE.BRIDGE_WIDTH + b,\n        top: gapTop + TUNE.GAP_HEIGHT,\n        bottom: this.dimensions.height\n      },\n      passed: false\n    };\n    return bridge;\n  }\n\n  // randomBridge(b) {\n  //   const heightRange = this.dimensions.height - (2 * TUNE.EDGE_BUFFER) - TUNE.GAP_HEIGHT;\n  //   const gapTop = (Math.random() * heightRange) + TUNE.EDGE_BUFFER;\n  //   const bridge = {\n  //     topBridge: {\n  //       left: b,\n  //       right: TUNE.BRIDGE_WIDTH + b,\n  //       top: 0,\n  //       bottom: gapTop\n  //     },\n  //     bottomBridge: {\n  //       left: b,\n  //       right: TUNE.BRIDGE_WIDTH + b,\n  //       top: gapTop + TUNE.GAP_HEIGHT,\n  //       bottom: this.dimensions.height\n  //     },\n  //     passed: false\n  //   };\n  //   return bridge;\n  // }\n  \n  animate(ctx) {\n    // this.drawBackground(ctx);\n    this.drawBgImage(ctx);\n    this.moveBridges();\n    this.drawBridges(ctx);\n  }\n  \n  // drawBackground(ctx) {\n  //   ctx.fillStyle = \"#a2b9bc\";\n  //   ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);\n  // }\n\n  drawBgImage(ctx) {\n    let img = document.getElementById(\"hidden-sky\");\n    ctx.drawImage(img, 0, 0, this.dimensions.width, this.dimensions.height);\n  }\n\n  passedBridge(plane, callback) {\n    this.eachBridge((bridge) => {\n      if (bridge.topBridge.right < plane.left) {\n        if (!bridge.passed) {\n          bridge.passed = true;\n          callback();\n        }\n      }\n    });\n  }\n\n  moveBridges() {\n    this.eachBridge(bridge => {\n      bridge.topBridge.left -= TUNE.BRIDGE_SPEED;\n      bridge.topBridge.right -= TUNE.BRIDGE_SPEED;\n      bridge.bottomBridge.left -= TUNE.BRIDGE_SPEED;\n      bridge.bottomBridge.right -= TUNE.BRIDGE_SPEED;\n    });\n\n    if (this.bridges[0].topBridge.right <= 0) {\n      this.bridges.shift();\n      const newX = this.bridges[1].topBridge.left + TUNE.BRIDGE_SPACING;\n      this.bridges.push(this.randomBridge(newX));\n    }\n  }\n  \n  eachBridge(callback) {\n    this.bridges.forEach(callback.bind(this));\n  }\n  \n  \n  drawBridges(ctx) {\n    this.eachBridge(bridge => {\n      ctx.fillStyle = \"darkred\";\n      \n      //draw top bridge\n      ctx.fillRect(\n        bridge.topBridge.left,\n        bridge.topBridge.top,\n        TUNE.BRIDGE_WIDTH,\n        bridge.topBridge.bottom - bridge.topBridge.top\n        );\n        //draw bottom bridge\n        ctx.fillRect(\n        bridge.bottomBridge.left,\n        bridge.bottomBridge.top,\n        TUNE.BRIDGE_WIDTH,\n        bridge.bottomBridge.bottom - bridge.bottomBridge.top\n        );\n      });\n    }\n    \n  \n  collidesWith(plane) {\n    //this function returns true if the the rectangles overlap\n    const _overlap = (rect1, rect2) => {\n      //check that they don't overlap in the x axis\n      if (rect1.left > rect2.right || rect1.right < rect2.left) {\n        return false;\n      }\n      //check that they don't overlap in the y axis\n      if (rect1.top > rect2.bottom || rect1.bottom < rect2.top) {\n        return false;\n      }\n      return true;\n    };\n    let collision = false;\n    this.eachBridge((bridge) => {\n      if (\n        //check if the plane is overlapping (colliding) with either bridge\n        _overlap(bridge.topBridge, plane) ||\n        _overlap(bridge.bottomBridge, plane)\n      ) { collision = true; }\n    });\n    return collision;\n  }\n\n\n}\n\n//# sourceURL=webpack:///./src/level.js?");

/***/ }),

/***/ "./src/plane.js":
/*!**********************!*\
  !*** ./src/plane.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Plane; });\nconst CONSTANTS = {\n  GRAVITY: 0.4,\n  FLAP_SPEED: 8,\n  TERMINAL_VEL: 12,\n  PLANE_WIDTH: 40,\n  PLANE_HEIGHT: 30\n};\n\nclass Plane {\n\n  constructor(dimensions) {\n    this.dimensions = dimensions;\n    this.x = this.dimensions.width / 3;\n    this.y = this.dimensions.height / 2;\n    this.vel = 0;\n  }\n\n  // fly() {\n  //   //if this were a more realistic bird simulation, we would be adding to the velocity\n  //   //instead of just assigning it outright\n  //   //to make the experience more fun and 'bouncy' we just set it directly\n  //   this.vel = -1 * CONSTANTS.FLAP_SPEED;\n  // }\n\n  flyLeft() {\n    this.vel = -1 * CONSTANTS.FLAP_SPEED;\n  }\n\n  flyRight() {\n    this.vel = -1 * CONSTANTS.FLAP_SPEED;\n  }\n\n  movePlane() {\n    this.x += this.vel;\n    this.y += this.vel;\n    this.vel += CONSTANTS.GRAVITY;\n    if (Math.abs(this.vel) > CONSTANTS.TERMINAL_VEL) {\n      if (this.vel > 0) {\n        this.vel = CONSTANTS.TERMINAL_VEL;\n      } else {\n        this.vel = CONSTANTS.TERMINAL_VEL * -1;\n      }\n    }\n  }\n\n  animate(ctx) {\n    this.movePlane();\n    // this.drawPlane(ctx);\n    this.drawImg(ctx);\n  }\n\n  // drawPlane(ctx) {\n  //   ctx.fillStyle = \"blue\";\n  //   ctx.fillRect(this.x, this.y, CONSTANTS.PLANE_WIDTH, CONSTANTS.PLANE_HEIGHT);\n  // }\n\n  drawImg(ctx) {\n    let img = document.getElementById(\"hidden-plane\");\n    ctx.drawImage(img, this.x, this.y, CONSTANTS.PLANE_WIDTH, CONSTANTS.PLANE_HEIGHT);\n  }\n\n  bounds() {\n    return {\n      left: this.x,\n      right: this.x + CONSTANTS.PLANE_WIDTH,\n      top: this.y,\n      bottom: this.y + CONSTANTS.PLANE_HEIGHT\n    };\n  }\n\n  outOfBounds() {\n    const aboveTheTop = this.y < 0;\n    const belowTheBottom = this.y + CONSTANTS.PLANE_HEIGHT > this.dimensions.height;\n    return aboveTheTop || belowTheBottom;\n  }\n}\n\n\n//# sourceURL=webpack:///./src/plane.js?");

/***/ })

/******/ });