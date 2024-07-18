const PowerUpCoin = document.getElementById ("powerup")

const POWERUPS = {
INCREASEPADDLESIZE:0,
DECREASEPADDLESIZE:1,
INCREASEPADDLESPEED:2,
DECREASEPADDLESPEED:3

};

let cooldown = 10;

let powerupAvailable = false;

let remainder = 0;

function checkPowerUp(gameTick) {   
    console.log(gameTick % (cooldown * 100));

    /*if(gameTick == 1000){ 
        
       PowerUpCoin.style.visibility = "visible";
        
    }*/

    //console.log("checkpowerup called")
    if(Math.abs( gameTick % (cooldown * 100) - remainder) % (cooldown * 100) <= 5){ //make powerup every 10 sec
        //make powerup
        console.log("power");//this runs every 10 sec
        powerupAvailable = true;
        PowerUpCoin.style.visibility = "visible";


    }
}

function activatePowerUp() {//this will be activated on a keypress
    if(true) {
        remainder = gameTick - 10 % (cooldown * 100);
        if(powerupAvailable){
            powerupAvailable=false;
            PowerUpCoin.style.visibility = "hidden";

            //1. choose random powerup from POWERUPS
            powerup = Math.floor( Math.random() * 3);
            console.log(`powerup: ${powerup}`);
                    
                    
                    

            //2. activate the powerup
            switch(powerup){
                case POWERUPS.INCREASEPADDLESIZE:
                    paddleL.l = 200;
                    paddleR.l = 200;
                    break;
                case POWERUPS.DECREASEPADDLESIZE:
                    paddleL.l = 50;
                    paddleR.l = 50;
                    break;
                case POWERUPS.INCREASEPADDLESPEED:
                    MAXSPEED = 10;
                    paddleL
                    break;
                case POWERUPS.DECREASEPADDLESPEED:
                    MAXSPEED = 3;
                    break;
            }

            //3. disable the powerup after x sec using setTimeout()

            setInterval(()=>{
                paddleL.l = 100;
                paddleR.l = 100;
                MAXSPEED = 5;

            }, 15000 );
            
        }
        

    }
    
}
