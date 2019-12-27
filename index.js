var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var randomChosenColour,userClickedPattern=[],started = false,level = 0;

$(document).on("keypress", initialStart);
$(".key").on("click",initialStart);
function initialStart(){
  if(!started)
  {
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound('sounds/wrong.mp3');
      $("#level-title").text("Game Over, Press Any Key to Restart");
      reset();
      $('body').addClass('game-over');
      setTimeout(
      function()
      {
        $('body').removeClass('game-over');
      }, 200);
    }
}

function nextSequence()
{
  userClickedPattern = [];
  level++;
  $("#level-title").text("level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound('sounds/' + randomChosenColour + '.mp3');
}

$(".but").on("click",function(){
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  playSound('sounds/' + userChosenColour + '.mp3');
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function playSound(name)
{
   var audio;
   audio = new Audio(name);
   audio.play();
}

function animatePress(currentColor)
{
  $("#" + currentColor).addClass('pressed');
  setTimeout(
  function()
  {
    $("#" + currentColor).removeClass('pressed');
  }, 100);
}

function reset()
{
   level = 0;
   gamePattern = [];
   started = false;
}
