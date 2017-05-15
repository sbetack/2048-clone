$(document).ready(function() {
  game = new Game();
  placeGame(game)
  $("body").keydown(function(e){
    var code = e.keyCode || e.which;
    if (code == 37) {
      console.log("left")
      game.move("left")
    } else if (code == 38){
      console.log("up")
      game.move("up")
    } else if (code == 39){
      console.log("right")
      game.move("right")
      console.log(game.toString())
    } else if (code == 40){
      console.log("down")
      game.move("down")
    }
    $("p").fadeOut(10);
    placeGame(game)
  })

});

function placeGame(game){
  var nested = game.gameNest;
  for(var i = 0; i < nested.length; i++){
    for(var j = 0; j < nested[i].length; j++){
      $(".row-"+i+" .column-"+j).append("<p>"+nested[i][j]+"</p>").hide().fadeIn(10)
    }
  }
}

