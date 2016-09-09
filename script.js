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
GRID_SIZE = 10
createGrid = function() {
  for(var j = 0; j < GRID_SIZE; j++ ) {
    row = $("#snake-home").append("<div class='row'></div>")

    for(var i = 0; i < GRID_SIZE; i++ ) {
      $(row).append("<div class='box'></div>")
    }
  }
}

$(document).ready(createGrid());