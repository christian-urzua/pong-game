const SIDE = {NONE: 0, LEFT: 1, RIGHT: 2};

let MAXSPEED = 5;

class Paddle {
    constructor(x, y, l, w, side, c) {
        this.x = x;
        this.y = y;
        this.l = l;
        this.w = w;
        this.side = side;
        this.c = c;
        this.vy = 0;
    }

    draw(ctx) {
        ctx.fillStyle = this.c;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;

        ctx.fillRect(this.x, this.y, this.w, this.l); // NOT h
        ctx.strokeRect(this.x, this.y, this.w, this.l);
    }

    moveL(isCPU, ball) {
        this.moveR(isCPU, ball);
        return;
        //moveR(isCPU, ball, paddleL);
        if (isCPU) {
            if(ball.y > paddleL.y + this.l )
                paddleL.vy = 1
            if(ball.y < paddleL.y + this.l)
                paddleL.vy = -1


            // ball.y <- where the ball is
            // this.y <- where the paddle is
            // this.l <- how long the paddle is

            // control this.vy using ball
            // don't set this.y! (cheating)
            
        }
        this.y += this.vy;
        if (this.y < 0) this.y = 0;
        if (this.y + this.l > boardHeight) this.y = boardHeight - this.l;
    }
    moveR(isCPU, ball) {
        if (isCPU) {
                
            this.vy = MAXSPEED;
            
            if(Math.abs(ball.y-this.y) < 20){
                this.vy = 2;
            }
            /*

            if(Math.abs(ball.y-this.y) > 100 || Math.abs(ball.y-this.y) > 100){ //if ball is far away move faster
                this.vy = 10;
            }
            else if(Math.abs(ball.vy) > 2){
                this.vy = Math.min( Math.abs(ball.vy), 10);
            }
            else if(Math.abs(ball.y-this.y) > 70){
                this.vy = 3;
            }
            else{
                this.vy = 3;
            }
            */

            if(ball.y > this.y + this.l )
                this.vy *= 1;
            if(ball.y < this.y + this.l )
                this.vy *= -1;
            
        }
        this.y += this.vy;
        if (this.y < 0) this.y = 0;
        if (this.y + this.l > boardHeight) this.y = boardHeight - this.l;
    }
}
