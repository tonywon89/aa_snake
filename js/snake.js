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

// Snake.prototype.isOpposite = function(coord1, coord2){
//
// };

Snake.prototype.crashed = function(){
  return (this.segments[0][0] < 0 || this.segments[0][0] > 39 ||
  this.segments[0][1] < 0 || this.segments[0][1] > 39);
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
