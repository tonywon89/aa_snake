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


module.exports = Board;
