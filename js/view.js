var Board = require("./snake");

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
      }
      $ul.append($li);
    }
  }

  var $score = $("<p>").addClass("score").text("Score: " + this.board.score());
  $(".snake-game").append($ul).append($score);
};



module.exports = View;
