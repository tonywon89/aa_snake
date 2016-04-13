var Board = require("./snake");

function View ($el){
  this.$el = $el;
  this.board = new Board;

  this.bindKeys();
}

View.prototype.bindKeys = function(){
  var self = this;
  this.$el.on("keydown", function(event){
    var pressedKey = event.which;

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
    self.board.snake.turn(pressedKey);
    // TODO remove this line after implementing elsewhere
    self.board.snake.move();
    console.log(self.board.snake);
  });
};

module.exports = View;
