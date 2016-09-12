// The first 12 digits of pi are 314159265358.
// We can make these digits into an expression
// evaluating to 27182 (first 5 digits of e) as follows:
//
// 3141 * 5 / 9 * 26 / 5 * 3 - 5 * 8 = 27182
// or
// 3 + 1 - 415 * 92 + 65358 = 27182
//
// Notice that the order of the input digits is not changed.
// Operators (+,-,/, and *) are simply inserted to create the expression.
//
// Write a function to take a string of numbers and a target number,
// and return all the ways that those numbers can be formed
// into expressions evaluating to the target.
//
// For example:
// f("314159265358", 27182) should print:
// 3 * 1 + 4 * 159 + 26535 + 8 = 27182
// 3 / 1 + 4 * 159 + 26535 + 8 = 27182
// 3 + 1 * 4 * 159 + 26535 + 8 = 27182
// 3 + 1 - 415 * 92 + 65358 = 27182
// 3 * 14 * 15 + 9 + 26535 + 8 = 27182
// 3141 * 5 / 9 * 26 / 5 * 3 - 5 * 8 = 27182
// 3141 / 5 / 9 * 26 * 5 * 3 - 5 * 8 = 27182

var getPerms = function (numbers, list) {
  var operator;
  for (var i = 0; i < 5; i++) {
    if (i === 0) {
      operator = "*";
    }
    else if (i === 1) {
      operator = "/";
    }
    else if (i === 2) {
      operator = "+";
    }
    else {
      operator = "-";
    }

    list.push( numbers.splice(1, 0, operator) );
  }
};

var list = ["+"];
console.log(getPerms("1234"), list);
// depth first search tree
// go through each digit
// after each, pick operation from 0 - 4
// if nothing, add the digit to the prev number
// add number, operator to stack
// carry out operations