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

	Snake.prototype.isSnakeSegment = function(coord){
	  for (var i = 0; i < this.segments.length; i++) {
	    var seg = this.segments[i];
	    if(this.equals(seg, coord)) return true;
	  }
	  return false;
	};

	Snake.prototype.isOpposite = function(coord){
	  var head = this.segments[0];

	  var movement;
	  switch(this.direction){
	  case "N":
	    movement = [-1, 0];
	    break;
	  case "E":
	    movement = [0, 1];
	    break;
	  case "S":
	    movement = [1, 0];
	    break;
	  case "W":
	    movement = [0, -1];
	    break;
	  }

	  var opposite = this.plus(head, movement);

	  return this.equals(opposite, coord);

	};

	Snake.prototype.crashed = function(){
	  return (this.segments[0][0] < 0 || this.segments[0][0] > 39 ||
	      this.segments[0][1] < 0 || this.segments[0][1] > 39) || this.overlap();
	};

	Snake.prototype.overlap = function () {
	  for (var i = 0; i < this.segments.length; i++) {
	    for (var j = i + 1; j < this.segments.length; j++) {
	      if (this.equals(this.segments[i], this.segments[j])) return true;
	    }
	  }
	  return false;
	};

	Snake.prototype.move = function(){
	  var movement;
	  switch(this.direction){
	  case "N":
	    movement = [-1, 0];
	    break;
	  case "E":
	    movement = [0, 1];
	    break;
	  case "S":
	    movement = [1, 0];
	    break;
	  case "W":
	    movement = [0, -1];
	    break;
	  }

	  this.segments.unshift(this.plus(movement, this.segments[0]));
	  this.segments.pop();
	};

	Snake.prototype.turn = function (direction) {
	  this.direction = direction;
	};

	Snake.prototype.eat = function (apple) {
	  this.segments.unshift(apple);
	};

	Snake.prototype.isHead = function(coord) {
	  return this.equals(this.segments[0], coord);
	};

	function Board(){
	  this.snake = new Snake;
	  this.apple = [20, 20];
	}

	Board.prototype.isApple = function(coord){
	  return coord[0] === this.apple[0] && coord[1] === this.apple[1];
	};

	Board.prototype.randomApple = function () {
	  this.apple = [Math.floor(Math.random() * 40), Math.floor(Math.random() * 40)];
	};

	Board.prototype.score = function(){
	  return this.snake.segments.length - 1;
	};

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
	  // this.step();
	  this.interval = setInterval(this.step.bind(this), 25);
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
	  console.log("It Turned: " + pressedKey);
	  // console.log(this.board.snake.segments[0]);
	};

	View.prototype.step = function () {
	  if (this.board.snake.isOpposite(this.board.apple)){
	    this.board.snake.eat(this.board.apple);
	    this.board.randomApple();
	  } else {
	    this.board.snake.move();

	    if(this.board.snake.crashed()){
	      var $p = $("<p>").text("You have crashed").addClass("losing-message");
	      $('.grid').append($p);
	      clearInterval(this.interval);
	    } else {
	      this.render();
	    }
	  }


	};

	View.prototype.render = function () {
	  $("figure").empty();
	  var $ul = $("<ul>").addClass("grid group");

	  for(var i = 0; i < 40; i++){
	    for(var j = 0; j < 40; j++){
	      var $li = $("<li>").addClass("grid-box");

	      if(this.board.isApple([i, j])) {
	        $li.addClass("apple");
	      }

	      if (this.board.snake.isSnakeSegment([i, j])) {
	        $li.addClass("snakey");
	        if (this.board.snake.isHead([i, j])) {
	          $li.addClass("head");
	        }
	      }
	      $ul.append($li);
	    }
	  }

	  var $score = $("<p>").addClass("score").text("Score: " + this.board.score());
	  $(".snake-game").append($ul).append($score);
	};



	module.exports = View;


/***/ }
/******/ ]);