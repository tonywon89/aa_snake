var Board = require("./snake");

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
