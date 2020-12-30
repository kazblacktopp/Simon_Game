const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level;
let userChosenColour;

$(document).one("keydown", () => {
  startGame();
})

let startGame = () => {
  gamePattern.length = 0;
  userClickedPattern.length = 0;
  level = 1;
  nextSequence();
}

let nextSequence = () => {
  $("#level-title").text("Level: " + level);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  let baseSpeed = 500 - ((level - 1) * 10);
  gamePattern.forEach((colour, i) => {
    setTimeout(() => {
      $("#" + colour).fadeIn(100).fadeOut(100).fadeIn(100);
      playSound(colour);
    }, baseSpeed * ++i);
  });
  setTimeout( () => {
    playerResponse();
  }, baseSpeed * (gamePattern.length + 1));
  level++;
}

let playerResponse = () => {
  $(".btn").click(function() {
    $(".btn").off("click");
    userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
    animatePress(userChosenColour);
  });
}

let playSound = (name) => {
  let btnAudio = "sounds/" + name + ".mp3";
  let btnBeep = new Audio(btnAudio);
  btnBeep.play();
}

let animatePress = (currentColour) => {
  let buttonId = "#" + currentColour;
  $(buttonId).addClass("pressed");
  setTimeout(() => {
    $(buttonId).removeClass("pressed");
  }, 100);
}

let checkAnswer = (currentLevel) => {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    playSound(userChosenColour);
    if (userClickedPattern.length < gamePattern.length) {
      playerResponse();
    } else {
      setTimeout(() => {
        userClickedPattern.length = 0;
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("#level-title").text("GAME OVER!");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    setTimeout(() => {
      $("#level-subtitle").removeClass("hidden");
      $(document).one("keydown", () => {
        $("#level-subtitle").addClass("hidden");
        startGame();
      });
    }, 1000);
  };
}
