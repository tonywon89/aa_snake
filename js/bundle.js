/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var SnakeView = __webpack_require__(2);

	$(function () {
	  // var view = new SnakeView();
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	function Snake(){
	  this.direction = "E";
	  this.segments = [[1,1], [1,2], [1,3]];
	}

	Snake.prototype.plus = function(coord1, coord2){
	  return [(coord1[0] + coord2[0]), (coord1[1] + coord2[1])];
	};

	Snake.prototype.equals = function(coord1, coord2){
	  return coord1[0] === coord2[0] && coord1[1] === coord2[1];
	};

	Snake.prototype.isOpposite = function(coord1, coord2){

	};

	Snake.prototype.move = function(){
	  var movement;
	  switch(this.direction){
	  case "N":
	    movement = [0, 1];
	    break;
	  case "E":
	    movement = [1, 0];
	    break;
	  case "S":
	    movement = [0, -1];
	    break;
	  case "W":
	    movement = [-1, 0];
	    break;
	  }

	  this.segments.pop();
	  this.segments.unshift(this.plus(movement, this.segments[0]));
	};

	Snake.prototype.turn = function (direction) {
	  this.direction = direction;
	};


	function Board(){

	}

	module.exports = Board;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Board = __webpack_require__(1);

	function View (){

	}

	module.exports = View;


/***/ }
/******/ ]);