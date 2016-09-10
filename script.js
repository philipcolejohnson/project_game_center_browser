GRID_SIZE = 10;
// SnakeModel
// - body coords (array)
// - direction
// - getter for Snake Length [array]
// - change current direction (depends on key, starts in top left go right default)
// - change position of snake body (pop off end, shift to front, change coordinates)

// Food Model
// - food drop method (can't be on snake)
// - food coordinates

// BoardGameModel
// - grid size x?
// - grid size y?
// - set new food
// - update snake location (calls to controller)  ** Game loop
//  

// View
// -render
// Event on food to see if snake has hit it
// keypress event

// Controller
// handler for snake food w/ conditions
// keypress handler


var view = {

  createGrid: function() {
    var $board = $("#snake-home");

    for(var j = 0; j < GRID_SIZE; j++ ) {
      var $row = $("<div class='row'></div>");

      for(var i = 0; i < GRID_SIZE; i++ ) {
        $box = $("<div class='box'></div>")
                .attr("data-x", i)
                .attr("data-y", j);
        $row.append($box);
      }

      $board.append($row);
    }
  }
}

$(document).ready(function () {
  view.createGrid();
});
