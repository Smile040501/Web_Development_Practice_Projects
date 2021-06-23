var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var startGame = false;
var level = 0;

function playSound(name) {
    var makeSound = new Audio("sounds/" + name + ".mp3");
    makeSound.play();
}

function nextSequence() {
    if (startGame) {
        userClickedPattern = [];

        level++;
        $("#level-title").text("Level " + level);

        var randomNumber = Math.floor(Math.random() * 4);
        var randomChosenColor = buttonColors[randomNumber];
        gamePattern.push(randomChosenColor);
        playSound(randomChosenColor);
        $("#" + randomChosenColor)
            .fadeOut(100)
            .fadeIn(100);
    }
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("#level-title").text("Game Over, Play Again!");
        $("#start").show();
        $("#about").show();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function startOver() {
    gamePattern = [];
    startGame = false;
    level = 0;
}

$("#start").on("click", function () {
    if (!startGame) {
        $("#level-title").text("Level " + level);
        $("#level-title").show();
        $(this).hide();
        $("#about").hide();
        startGame = true;
        nextSequence();
    }
});

$(".btn").click(function () {
    if (startGame) {
        var userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length - 1);
    }
});
