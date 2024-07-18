const gameboard = document.getElementById("gameboard");
const cpucheckR = document.getElementById("cpucheckR");
const cpucheckL = document.getElementById("cpucheckL");
const ctx = gameboard.getContext("2d");
const STATE = {STARTUP: 0, PLAYING: 1, GAMEOVER: 2, GAMEEND: 3, GAMESTOP: 4};

const PLAYERID = {L: 0, R: 1, none: -1};
var winner = PLAYERID.none;

let state = STATE.STARTUP;

let boardWidth = 500;
let boardHeight = 500;
let paddleWidth = 25;
let paddleLength = 100;
let ballRadius = 12.5;
let paddleVelocity = MAXSPEED;
let paddleForce = 1.1; // 110% of speed before

let ball;
let paddleL;
let paddleR;
let scoreL = 0;
let scoreR = 0;
let Ball2

function clearBoard() {
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, boardWidth, boardHeight);
}

function draw() {
    clearBoard();
    ball.draw(ctx);
    paddleL.draw(ctx);
    paddleR.draw(ctx);
}

function resetGame() {
    winner = PLAYERID.none;
    state = STATE.STARTUP;
    clearInterval(intervalID);
    resetBall();
    paddleL = new Paddle(0, 0, paddleLength, paddleWidth, SIDE.LEFT, "Red");
    paddleR = new Paddle(boardWidth-paddleWidth, 0, paddleLength, paddleWidth, SIDE.RIGHT, "Blue");
    gameTick = 0;
    scoreL = 0;
    scoreR = 0;
    
    


    nextTick();
}

function resetBall() {
    ball = new Ball(boardWidth/2, boardHeight/2, 3, -3, ballRadius, "orange");
    //ball2 = new Ball(boardWidth/2, boardHeight/2, 1, -1, ballRadius, "yellow");
}

let intervalID;
let gameTick=0
function nextTick() {
    gameTick ++;
    switch (state) {
        case STATE.STARTUP:
            state = STATE.PLAYING;
            break;
        case STATE.PLAYING:
            state = play();
            break;
        case STATE.GAMEEND:
            
            break;
        case STATE.GAMEOVER:
            state = STATE.GAMEOVER;
            break;
        case STATE.GAMESTOP:
            break;
        default:
            state = STATE.STARTUP;
            break;
    }
    draw();
    intervalID = setTimeout(nextTick, 10);
}

const winScreenL = document.getElementById("player-1-wins");
const winScreenR = document.getElementById("player-2-wins");



function play() {
    if(scoreL == 3){
        console.log("P1 wins");
        state = STATE.GAMEEND;
        winner = PLAYERID.L;
        gameendScreen();
        return;
    }
    if(scoreR == 3){
        console.log("p2 wins");
        winner = PLAYERID.R;
        state = STATE.GAMEEND;
        gameendScreen();
        return;
    }
    
    checkPowerUp(gameTick);
    paddleL.moveL(cpucheckL.checked, ball);
    paddleR.moveR(cpucheckR.checked, ball);
    let scoreSide = ball.bounce([paddleL, paddleR]);
    if (scoreSide != SIDE.NONE) {
        if (scoreSide == SIDE.LEFT) scoreL++;
        if (scoreSide == SIDE.RIGHT) scoreR++;
        updateScore();
        resetBall();
        if (scoreL > 10 || scoreR > 10) return STATE.GAMEOVER;
    }
    ball.move();
    // Add serving the ball?
    if(ball.y > this.y)
        
    // If a player wins, stop the game...
    return STATE.PLAYING;
}

function updateScore() {
    const scoreboard = document.getElementById("scoreboard");
    scoreboard.innerHTML = `${scoreL} : ${scoreR}`; // 7 : 3
}

function gameendScreen(){
    if(winner == PLAYERID.L){//if left player wins
        winScreenL.style.visibility="visible";
        setTimeout(()=>{winScreenL.style.visibility="hidden";}, 5000);
        scoreL = 0
        
    }
    if(winner == PLAYERID.R){//if right player wins
        winScreenR.style.visibility="visible";
        setTimeout(()=>{winScreenR.style.visibility="hidden";}, 5000);
        scoreR = 0
        
        
    }
    state = 0;
    scoreL = 0;
    scoreR = 0;
    resetGame();
    ball = new Ball(boardWidth/2, boardHeight/2, 0, -0, ballRadius, "orange");
    winner = PLAYERID.none;
}

