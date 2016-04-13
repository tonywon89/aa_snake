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
	  var view = new SnakeView($("body"));
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	function Snake(){
	  this.direction = "E";
	  this.segments = [[1,1]];
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

	  this.segments.unshift(this.plus(movement, this.segments[0]));
	  this.segments.pop();
	};

	Snake.prototype.turn = function (direction) {
	  this.direction = direction;
	};

	// var snake = new Snake;
	// snake.move();
	// console.log(snake);
	// snake.turn("N");
	// console.log(snake);
	// snake.move();
	// console.log(snake);


	function Board(){
	  this.snake = new Snake;
	}

	module.exports = Board;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Board = __webpack_require__(1);

	function View ($el){
	  this.$el = $el;
	  this.board = new Board;

	  this.bindKeys();
	  this.render();
	}

	View.prototype.bindKeys = function(){
	  var self = this;
	  this.$el.on("keydown", function(event){
	    var pressedKey = event.keyCode;
	    self.handleKeyEvent(pressedKey);
	  });
	};

	View.prototype.handleKeyEvent = function (pressedKey) {
	  switch (pressedKey) {
	  case 37:
	    pressedKey = "W";
	    break;
	  case 38:
	    pressedKey = "N";
	    break;
	  case 39:
	    pressedKey = "E";
	    break;
	  case 40:
	    pressedKey = "S";
	    break;
	  }

	  this.board.snake.turn(pressedKey);
	  // TODO remove this line after implementing elsewhere
	  this.board.snake.move();
	  console.log(this.board.snake.segments[0]);
	};

	View.prototype.step = function () {
	  this.board.snake.move();
	  this.render();
	};

	View.prototype.render = function () {
	  var $ul = $("<ul>").addClass("grid group");

	  for(var i = 0; i < 10; i++){
	    for(var j = 0; j < 10; j++){
	      var $li = $("<li>").addClass("grid-box");
	      $ul.append($li);
	    }
	  }

	  $(".snake-game").append($ul);
	};



	module.exports = View;


/***/ }
/******/ ]);