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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return PaperPlane; });\n/* harmony import */ var _level__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./level */ \"./src/level.js\");\n/* harmony import */ var _plane__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plane */ \"./src/plane.js\");\n// Canvas\n\n \n\n\nclass PaperPlane {\n  constructor(canvas){\n    this.ctx = canvas.getContext(\"2d\");\n    this.dimensions = { width: canvas.width, height: canvas.height };\n    this.listenForEvents();\n    this.restart(); \n  }\n\n  // Will create a new instance of Level and store that as an instance variable.\n  // Will call animate.\n  restart() {\n    this.running = false;\n    this.level = new _level__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.dimensions); // pass in canvas dimensions.\n    this.plane = new _plane__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.dimensions);\n    this.animate();\n  }\n\n  // Will call animate on Level class.\n  animate () {\n    this.level.animate(this.ctx);\n    this.plane.animate(this.ctx);\n    if (this.running) {\n      requestAnimationFrame(this.animate.bind(this));\n    }\n  }\n\n  play () {\n    this.running = true;\n    this.animate();\n  }\n\n  listenForEvents() {\n    this.ctx.canvas.addEventListener(\"mousedown\", this.click.bind(this)); // Bind is used to keep track of the ctx.\n  }\n\n  click(e) {\n    if (!this.running) {\n      this.play();\n      this.plane.fly();      \n    } else {\n      this.plane.fly();\n    }\n  }\n\n}\n\n//# sourceURL=webpack:///./src/game.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Level; });\n// Responsible for drawing the background and obstacles.\n// Will control the logic for how the obstacles move and how they are generated\n\nclass Level {\n  constructor(dimensions) {\n    this.dimensions = dimensions;\n  }\n\n  animate(ctx) {\n    this.drawBackground(ctx);\n  }\n\n  drawBackground(ctx) {\n    ctx.fillStyle = \"skyblue\";\n    ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);\n  }\n}\n\n//# sourceURL=webpack:///./src/level.js?");

/***/ }),

/***/ "./src/plane.js":
/*!**********************!*\
  !*** ./src/plane.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Plane; });\nconst TUNE = {\n  PLANE_WIDTH: 50,\n  PLANE_HEIGHT: 50,\n  GRAVITY: 0.5,\n  FLT_SPEED: 0.8,\n  TERMINAL_VEL: 12\n\n};\n\nclass Plane {\n  constructor(dimensions) {\n    this.velocity = 0; // Can only move up and down.\n    this.dimensions = dimensions; // take canvas dims an store them.\n    this.posX = (this.dimensions.width / 2) - (TUNE.PLANE_WIDTH / 2); // Pos plane at middle of X axis\n    this.posY = (this.dimensions.height / 2); // Pos plane 1/3 of the way up on Y axis\n  }\n\n  drawPlane (ctx) {\n    ctx.fillStyle = 'red';\n    ctx.fillRect(this.posX, this.posY, TUNE.PLANE_WIDTH, TUNE.PLANE_HEIGHT); // Pos the rect, followed by size.\n  }\n\n  animate (ctx) {\n    this.movePlane();\n    this.drawPlane(ctx);\n  }\n\n  fly() {\n    this.velocity = -1 * TUNE.FLT_SPEED;\n  }\n\n  movePlane () {\n    this.posY += this.velocity;\n    this.velocity += TUNE.GRAVITY;\n\n    if (Math.abs(this.velocity) > TUNE.TERMINAL_VEL) {\n      //if the terminal velocity is exceeded, we set it to the terminal velicty\n      if (this.velocity > 0) {\n        this.velocity = TUNE.TERMINAL_VEL;\n      } else {\n        this.velocity = TUNE.TERMINAL_VEL * -1;\n      }\n    }\n  }\n}\n\n//# sourceURL=webpack:///./src/plane.js?");

/***/ })

/******/ });