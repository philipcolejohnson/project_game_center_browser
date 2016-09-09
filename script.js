GRID_SIZE = 10;
// Snake
// - length

// Model
// - Snake Length
// - current direction



// View
// -render
// Event on food to see if snake has hit it

// Controller
// handler for snake food


var view = {

  createGrid: function() {
    var $board = $("#snake-home");

    for(var j = 0; j < GRID_SIZE; j++ ) {
      var $row = $("<div class='row'></div>");

      for(var i = 0; i < GRID_SIZE; i++ ) {
        $row.append("<div class='box'></div>");
      }

      $board.append($row);
    }
  }
}

$(document).ready(function () {
  view.createGrid();
});