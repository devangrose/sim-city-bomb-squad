var MAX_TIME = 10;
var time = MAX_TIME;
var interval;
var siren;

document.addEventListener('DOMContentLoaded',function(){
    console.log("Dom got loaded");
    document.getElementById('timer').innerHTML = MAX_TIME;
    document.getElementById('message').classList.add('display-none');
    document.getElementById('arrow').classList.add('display-none');
    document.getElementById("reset").addEventListener('click',start);
});
function start(){
    console.log("starting game");

    // ------------- Initializing and Starting Game ---------//
    time = MAX_TIME;
    addWireListeners();
    clearInterval(interval);
    interval = setInterval(tick,1000);
    siren = document.getElementById('siren');
    siren.play();
    //-------------------------------------------------------//
    
    // Edge case
    
    // ----------------- Reset Values and Colors ------------//
    document.getElementsByTagName('body')[0].classList.remove('exploded');
    document.getElementsByTagName('body')[0].classList.add('unexploded');

    document.getElementById('message').textContent = '';
    document.getElementById("timer").innerHTML = time;

    document.getElementById('timer').style.color = "chartreuse";
    document.getElementById('message').classList.add('display-none');
    document.getElementById('message').style.backgroundImage = "";
    document.getElementById('succ').pause();
    //-------------------------------------------------------//
    
    // Hides the start button til end of game 
    this.classList.add('display-none');
    this.textContent = "Try Again!";
}
function tick(){
    // Deprecating time and updating display
    time -= 1;
    document.getElementById("timer").innerHTML = time;

    // Changes font color to red if below 3
    if(time <= 3){
        document.getElementById('timer').style.color = "red";
    }

    // Lose case
    if(time <= 0){
        loseGame();
    }
}
function clickWire(){
    this.src = "./img/cut-" + this.id + "-wire.png";
    this.removeEventListener('click',clickWire);

    document.getElementById('elec').play();
    if(this.getAttribute('data-cut') === 'true'){
        this.setAttribute('data-cut','false');
    }
    else {
        loseGame();
    }
    if(checkWin()){
        winGame();
    }
}
function addWireListeners(){
    var wireImages = document.querySelectorAll("#box img");
    for (var i = 0;i <  wireImages.length; i++){
        wireImages[i].src = './img/uncut-' + wireImages[i].id + '-wire.png';
        wireImages[i].setAttribute('data-cut', (Math.random() > .5).toString());
        console.log(wireImages[i]);
        wireImages[i].addEventListener('click',clickWire);
    }
}
function removeWireListeners(){
    var wireImages = document.querySelectorAll("#box img");

    for (var i = 0;i <  wireImages.length; i++){
        wireImages[i].removeEventListener('click',clickWire);
    }   
}
function checkWin(){
    var wireImages = document.querySelectorAll("#box img");
    for (var i = 0;i <  wireImages.length; i++){
        if(wireImages[i].getAttribute('data-cut') === 'true'){
            return false;
        }
    }
    return true;
}
function winGame(){

    
    stopGame('You have saved us!');
    
    // ---------- Reshowing reset button after hiding it ---------//
    document.getElementById('reset').classList.remove('display-none');
    document.getElementById('reset').innerHTML = "Play Again!";

    document.getElementById('yay').addEventListener('ended',function(){
        document.getElementById('succ').play();
    });
    document.getElementById('yay').play();
 
}
function loseGame(){
    
    stopGame('You have failed this CITY');
    document.getElementById('message').style.backgroundImage = "url('./img/arrow.jpg')";

    // ------------------ Changing Background ---------------//
    document.getElementsByTagName('body')[0].classList.remove('unexploded');
    document.getElementsByTagName('body')[0].classList.add('exploded');

    // Reshowing reset button after hiding it
    document.getElementById('reset').classList.remove('display-none');

    // Playing explosion sound and displaying lose text 
    var explodeSound = document.getElementById('explode');
    explodeSound.play();
}
function stopGame(message){

    clearInterval(interval);
    removeWireListeners();
    siren.pause();

    document.getElementById('message').classList.remove('display-none');
    document.getElementById('message').style.backgroundImage = "";
    document.getElementById('message').innerHTML = message;

}
