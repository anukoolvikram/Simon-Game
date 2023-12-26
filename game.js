var buttonColors=["red", "blue", "green", "yellow"];
var pattern=[];
var clickedPattern=[];
var level=0;
var gameStarted=false;

function nextSequence(){
    var randomNumber=Math.floor(Math.random()*4);
    var randomColor=buttonColors[randomNumber];
    pattern.push(randomColor);

    $('#'+randomColor).fadeOut(250).fadeIn(250);
    playSound(randomColor);
    level++;
    clickedPattern=[];

    $("h1").text("level "+ level);

}


function userInput(){

    var chosenColor;

    $(".btn").on("click", function(){
        if(gameStarted){
            chosenColor=this.id;
            clickedPattern.push(chosenColor);   
            playSound(chosenColor);
            animatePress(chosenColor);

            playGame();
        }
    })
}

function playSound(soundName){
    var audio=new Audio("./sounds/"+ soundName+".mp3");
    audio.play();
}


function animatePress(currentColor){
    $("."+currentColor).addClass("pressed");
    setTimeout(function(){ $("."+currentColor).removeClass("pressed");} , 100);
}


function playGame(){

    for(var i=0; i<clickedPattern.length; i++){
        if(clickedPattern[i]!=pattern[i]){
            $("h1").text("game over");
            var audio=new Audio("./sounds/wrong.mp3");
            audio.play();
            
            clickedPattern=[];
            level=0;
            gameStarted=false;
        }        
    }

    if(clickedPattern.length===pattern.length) nextSequence();

    if(!gameStarted) userInput();
}

$(document).on("keypress", function(){
    if(!gameStarted){
        gameStarted=true;
        nextSequence();
        userInput();
    }
});





