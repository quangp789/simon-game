// Create an array to hold the colors
var buttonColors = ["red", "blue", "green", "yellow"];

// Create a new array to hold the simon sequence game
var gamePattern = [];
var userClickedPattern = [];

// Keep track if the game has started
var started = false;

// Start the game from the beginning
var level = 0;

// Detect when a key is pressed to reset the game
$(document).keydown(function() {
  // If game has started, change h1 message and start the game sequence
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Trigger a handler function when a button is pressed
$(".btn").click(function() {

  // Store the clicked button into a variable. "this" refers to the "btn".
  var userChosenColour = $(this).attr("id");

  // Push the clicked pattern into the array
  userClickedPattern.push(userChosenColour);

  // Play sound of the selected color
  playSound(userChosenColour);

  // Add the animation of the selected color
  animatePress(userChosenColour);

  // call checkAnswer() after user has chosen their answer, passing in the index of the last answer in the user's next sequence
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
  // Check if the most recent user answer matches the game pattern.
  if (gamePattern[currentLevel].length === userClickedPattern[currentLevel].length) {
    console.log("Success");

    // Check if user has finished the whole sequence
    if (userClickedPattern.length === gamePattern.length) {
      // Call the next sequence after the delay
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }

  // Else apply wrong answer sound, class, and change header to game over
  else {
    console.log("Wrong");

    playSound("wrong")

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 100);

    $("#level-title").text("Game Over, Press Any Key to Restart")

    // Reset the game
    startOver();
  }
}

function startOver() {
  var gamePattern = [];
  var userClickedPattern = [];
  var started = false;
}

function nextSequence() {

  //Reset the user click sequence
  userClickedPattern = [];

  // Increase level by 1 whenever the sequence is called
  level++;

  // Update the level on the header
  $("#level-title").text("Level " + level);

  // Generate a random number form 0-3 for the four buttons
  var randomNumber = Math.floor(Math.random() * 4);

  // Store the chosen color into a new variable
  var randomChosenColour = buttonColors[randomNumber];

  // Push the selected color to the new array
  gamePattern.push(randomChosenColour);

  // Select the chosen color and apply the fade animation
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  // Play sound of the random color
  playSound(randomChosenColour);

  // Add the animation of the random color
  animatePress(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  // Add the animation when a button is pressed
  $("." + currentColour).addClass("pressed");
  // Set an animation delay to remove the class when the button is pressed
  setTimeout(function() {
    // Select the button and add the class when pressed
    $("." + currentColour).removeClass("pressed");
  }, 100);
}
