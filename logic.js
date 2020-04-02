$(document).ready(function () {

    let buttonColors = ["red", "blue", "yellow", "green"]

    let gamePattern = []

    let userClickedPattern = []
    
    let level = 0

    let started = false

    $(document).on("keydown", function () {

        if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
            }
    })

    $(".btn").on("click", function () {

        let userChosenColor = $(this).attr("id")

        userClickedPattern.push(userChosenColor)

        playSound(userChosenColor);

        animatePress(userChosenColor);

        checkAnswer((userClickedPattern.length - 1))

    })


    function playSound (name) {

        let audio = new Audio("sounds/" + name + ".mp3")
        
        audio.play()
    }

    function animatePress (currentColor) {
        $("#" + currentColor).addClass("pressed")

        setTimeout(function (){
            $("#" + currentColor).removeClass("pressed")
        }, 100) 
    }

    function nextSequence() {

        userClickedPattern = []

        level++;
        
        $("#level-title").text("Level " + level)

        let randomNumber = Math.floor(Math.random() * 4)

        let randomChosenColor = buttonColors[randomNumber]

        gamePattern.push(randomChosenColor)

        $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

        playSound(randomChosenColor);
    }

    function wrongAnswer () {
        wrongSound = new Audio("sounds/wrong.mp3");
        wrongSound.play;
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
    }

   function resetGame () {
       level = 0;
       started = false;
       gamePattern = [];
   } 
    function checkAnswer (currentLevel) {
    
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
            if (gamePattern.length === userClickedPattern.length){
                setTimeout(function (){
                    nextSequence();
                }, 1000)
            }
        
        } else {
            wrongAnswer();
            resetGame();
        }

    }

})