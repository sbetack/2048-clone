$(document).ready(function() {
  game = new Game();
  var direction = "";
  placeGame(game)
  $("body").keydown(function(e){
    var code = e.keyCode;
    if (code == 37) {
      console.log("left")
      direction = "left"
    } else if (code == 38){
      console.log("up")
      direction = "up"
    } else if (code == 39){
      console.log("right")
      direction = "right"
      console.log(game.toString())
    } else if (code == 40){
      console.log("down")
      direction = "down"
    }
    $("p").hide();
    $(".overlay").removeClass("animated")
    $(".overlay").removeClass("slideInUp")
    $(".overlay").removeClass("slideInDown")
    $(".overlay").removeClass("slideInRight")
    $(".overlay").removeClass("slideInLeft")
    game.move(direction)
    placeGame(game, direction)
    // $("p").fadeIn(100)
  })

});

SLIDE_ANIMATIONS = {
  "up" : "slideInUp",
  "down" : "slideInDown",
  "right": "slideInLeft",
  "left": "slideInRight"
}
function placeGame(game, direction){
  var nested = game.gameNest;
  for(var i = 0; i < nested.length; i++){
    for(var j = 0; j < nested[i].length; j++){
      if (nested[i][j] != 0) {
        if (direction == "right"){
          if (j != 3) {
            appendWithAnimation(nested, i, j, direction)
          } else {
            append(nested, i, j)    
          }
        } else if (direction == "left"){
          if (j != 0) {
            appendWithAnimation(nested, i, j, direction)
          } else {
            append(nested, i, j)  
          }
        } else if (direction == "down"){
          if (i != 3) {
            appendWithAnimation(nested, i, j, direction)
          } else {
            append(nested, i, j)  
          }
        } else if (direction == "up"){
          if (i != 0) {
            appendWithAnimation(nested, i, j, direction)
          } else {
            append(nested, i, j)  
          }
        } else {
          append(nested, i, j)
        }
      }
    }
  }
}


function appendWithAnimation(nested, i, j, direction){ 
  $(".row-"+i+" .column-"+j+" .overlay").append("<p>"+nested[i][j]+"</p>").addClass("animated "+SLIDE_ANIMATIONS[direction]).show()
}

function append(nested, i, j) {
  $(".row-"+i+" .column-"+j+" .overlay").append("<p>"+nested[i][j]+"</p>")
}


