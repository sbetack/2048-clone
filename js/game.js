var Game = function(gameString = makeGameString()) {
  this.gameString = gameString;
}



function makeGameString() {
  var allZeros = "0000000000000000".split("");
  for(var i = 0; i < 2; i++) {
    twoIndex = getRandomTwoIndex();
    if(allZeros[twoIndex] == "0"){
      allZeros.splice(twoIndex, 1, "2");
    } else {
      while (allZeros[twoIndex] != "0"){
        twoIndex = getRandomTwoIndex();
      }
      allZeros.splice(twoIndex, 1, "2");
    }
  }
  return allZeros.join("");
}

Game.prototype.toString = function() {
  var gameArr = this.gameString.split("");
  for(var i = 0; i < gameArr.length; i++) {
    if(i % 5 == 0) {
      gameArr.splice(i, 0, "\n")
    }
  }
  return gameArr.slice(1).join("");
}

Game.prototype.makeNested = function() {
  var nestedGameString = [];
  var rowArr = this.toString().split("\n")
  for(var i=0; i < rowArr.length; i++) {
    splitRow = rowArr[i].split("")
    nestedGameString.push(splitRow);
  }
  return nestedGameString;
}

Game.prototype.move = function(direction) {
  if(direction == 'right') {
    var nested = this.makeNested();
  } else if (direction == 'left') {
    var nested = reverseRows(this.makeNested());
  } else if(direction == 'down') {
    var nested = transpose(this.makeNested());
  } else if(direction == 'up'){
    var transposed = transpose(this.makeNested());
    var nested = reverseRows(transposed);
  }
  var newNested = moveNumbers(nested);
  var combinedNested = combineLikeValues(newNested);
  if(direction == 'right') {
    this.gameString = nestedToString(combinedNested);
  } else if (direction == 'left'){
    this.gameString = nestedToString(reverseRows(combinedNested));
  } else if (direction == 'down'){
    this.gameString = nestedToString(transpose(combinedNested));
  } else if (direction == 'up'){
    var reversed = reverseRows(combinedNested);
    this.gameString = nestedToString(transpose(reversed));
  }
  this.placeRandomTwo();
  return this.gameString
}

Game.prototype.placeRandomTwo = function() {
  var gameArr = this.gameString.split("");
  var twoIndex = getRandomTwoIndex();
  while (gameArr[twoIndex] != "0") {
    twoIndex = getRandomTwoIndex();
  }
  gameArr.splice(twoIndex, 1, "2");
  this.gameString = gameArr.join("")
}




Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};






function nestedToString(nested) {
  string = [].concat.apply([], nested).join("")
  return string
}

function reverseRows(nested) {
  var reversedNested = [];
  for(var i = 0; i < nested.length; i++) {
    reversedNested.push(nested[i].reverse())
  }
  return reversedNested;
}

function transpose(nested) {
  var newArray = nested[0].map(function(col, i) {
    return nested.map(function(row) {
      return row[i]
    })
  });
  return newArray
}

function moveNumbers(nested){
  var newNested = [];
  for(var i = 0; i < nested.length; i++) {
    row_nums = []
    for(var j=0; j < nested[i].length; j++){
      if (parseInt(nested[i][j]) != 0) {
        row_nums.push(nested[i][j]);
      }
    }
    if(row_nums.length > 0){
      new_row = nested[i].diff(row_nums);
      for(var k=0; k<row_nums.length; k++){
        new_row.push(row_nums[k])
      }
      newNested.push(new_row)
    } else {
      newNested.push(nested[i])
    }
  }
  return newNested
}


function combineLikeValues(newNested){
  for(var i = 0; i < newNested.length; i++){
    for(var j = (newNested[i].length - 1); j > 0 ; j--){
      if ((newNested[i][j] != 0) && (newNested[i][j] == newNested[i][j-1])) {
        var num = parseInt(newNested[i][j]);
        newNested[i][j] = 2 * num
        newNested[i].splice(j-1, 1)
        newNested[i].unshift("0")
      }
    }
  }
  return newNested
}

function getRandomTwoIndex(){
  return twoIndex = Math.floor(Math.random() * 16);
}


// [["0", "2", "2", "0"], ["0", "0", "2", "2"], ["2", "0", "2", "2"], ["2", "2", "2", "2"]]
