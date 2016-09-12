GRID_SIZE = 9;
INTERVAL = 700;
// SnakeModel
// - body coords (array)
// - direction
// - getter for Snake Length [array]
// - change current direction (depends on key, starts in top left go right default)
// - change position of snake body (pop off end, shift to front, change coordinates)
var snake = {
  length: function () {
    return coords.length;
  },

  changeDirection: function (key) {
    var UP = 119, DOWN = 115, LEFT = 97, RIGHT = 100;

    if (key === UP) {
      if (snake.direction[1] !== 1) { 
        snake.direction = [0, -1];
      }
    } else if (key === DOWN) {
      if (snake.direction[1] !== -1) { 
        snake.direction = [0, 1];
      }
    } else if (key === LEFT) {
      if (snake.direction[0] !== 1) { 
        snake.direction = [-1, 0];
      }
    } else if (key === RIGHT) {
      if (snake.direction[0] !== -1) { 
        snake.direction = [1, 0];
      }
    }
  },

  move: function () {
    snake.grow();
    snake.coords.pop();
  },

  grow: function () {
    var headX = snake.coords[0][0];
    var headY = snake.coords[0][1];
    var x = snake.direction[0];
    var y = snake.direction[1];

    snake.coords.unshift([headX + x, headY + y]);
  },

  occupiesSquare: function(x, y) {
    for (var i = 1; i < snake.coords.length; i++) {
      if (snake.coords[i][0] === x && snake.coords[i][1] === y) { return true; }
    }

    return false;
  },

  headThere: function(x, y) {
    if (snake.coords[0][0] === x && snake.coords[0][1] === y) { return true; }

    return false;
  },

  badMove: function() {
    var headX = snake.coords[0][0];
    var headY = snake.coords[0][1];

    if (headX < 0 || headX >= game.size || headY < 0 || headY >= game.size || snake.occupiesSquare(headX, headY)) {
      return true;
    } else {
      return false;
    }
  },

  ateFood: function() {
    nextMoveX = snake.coords[0][0] + snake.direction[0];
    nextMoveY = snake.coords[0][1] + snake.direction[1];


    if (food.coords[0] == nextMoveX && food.coords[1] == nextMoveY) { 
      return true; 
    }
    return false;
  },

  init: function () {
    snake.coords = [];
    var x = Math.floor(game.size / 2);
    var y = Math.floor(game.size / 2);
    snake.coords.push([x, y]);
    snake.coords.push([x, y - 1]);
    snake.direction = [0, 1];
  }
};

// Food Model
// - food drop method (can't be on snake)
// - food coordinates
var food = {
  coords: [],
  drop: function() {
    var x, y;

    do {
      x = Math.floor(Math.random() * game.size);
      y = Math.floor(Math.random() * game.size);
    } while (snake.occupiesSquare(x, y) || snake.headThere(x, y));

    food.coords = [x, y];
  }
};

// gameModel
// - grid size x?
// - grid size y?
// - set new food
// - update snake location (calls to controller)  ** Game loop
//  
var game = {
  size: GRID_SIZE,

  init: function () {
    snake.init();
    food.drop();
    game.interval = INTERVAL;
    game.score = 0;
  },

  tick: function (key) {
    if (snake.ateFood()) {
      snake.grow();
      food.drop();
      game.score++;
      game.speedUp();
    } else {
      snake.move();
    }

    if (snake.badMove()) { game.over(); }

    view.render();
  },

  over: function() {
    $score = $('#over');
    $score.text("GAME OVER! Score: " + game.score);
    $score.show();
    clearInterval(game.loop);
    view.stopKeys();
  },

  speedUp: function() {
    clearInterval(game.loop);
    game.interval *= .9;
    game.loop = setInterval(game.tick, game.interval);
  }
};

// View
// -render
// Event on food to see if snake has hit it
// keypress event

// Controller
// handler for snake food w/ conditions
// keypress handler


var view = {
  init: function() {
    $('#new-game').click(controller.newGame);
    $('#stop-game').click(controller.stopGame);
  },

  startKeys: function() {
    $('#new-game').hide();
    $('#stop-game').show();
    $(document).keypress(function(e) {
      controller.keyHandler(e);
    });
    $('#over').hide();
  },

  stopKeys: function() {
    $('#new-game').show();
    $('#stop-game').hide();
    $(document).off('keypress');
  },

  render: function() {
    var $board = $("#snake-home");
    $board.html("");

    for(var y = 0; y < game.size; y++ ) {
      var $row = $("<div class='row'></div>");

      for(var x = 0; x < game.size; x++ ) {
        $box = $("<div class='box'></div>")
                .attr("data-x", x)
                .attr("data-y", y);

        if (x === food.coords[0] && y === food.coords[1]) {
          $box.addClass("food");
        }

        if (snake.occupiesSquare(x, y) || snake.headThere(x, y)) {
          $box.addClass("snake");
        }

        $row.append($box);
      }

      $board.append($row);
    }
  }
};

var controller = {
  init: function() {
    view.init();
    view.stopKeys();
  },

  keyHandler: function(e) {
    e.preventDefault();
    snake.changeDirection(e.which);
  },

  newGame: function() {
    view.startKeys();
    game.init();
    game.loop = setInterval(game.tick, game.interval);
  },

  stopGame: function(e) {
    view.stopKeys();
    game.over();
  }
};

$(document).ready(function () {
  controller.init();
});
