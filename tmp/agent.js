
function Player(x, y){
    this.position = {x:x, y:y}
    this.width = 35;
    this.height= 35;
    this.velocity = {x:0, y:0}
    this.acceleration = {x:0, y:0}
    this.mario = createSprite(40, 40, 40, 40);
    this.mario.addAnimation("run-right", mario_running_right);
    this.mario.addAnimation("run-left", mario_running_left);
    this.mario.addAnimation("stand-right", mario_stand_right);
    this.mario.addAnimation("stand-left", mario_stand_left);
    this.mario.changeAnimation("stand-right");
    this.draw = function(selected){
        var x = this.position.x - this.width/2;
        var y = this.position.y - this.height/2;

        this.mario.position.x = this.position.x;
        this.mario.position.y = this.position.y;
    }
    this.command = function(command){
       
        if(command == "right"){
            this.mario.changeAnimation("run-right");
            this.acceleration.x = 2.0;
        }
        else if(command == "left"){
            this.mario.changeAnimation("run-left");
            this.acceleration.x = -2.0;
        }
        else if(command == "stand-left"){
            this.mario.changeAnimation("stand-left");
        }
        else if(command == "stand-right"){
            this.mario.changeAnimation("stand-right");
        }
        else if(command == "jump"){

            if(this.velocity.y == 0)
                this.acceleration.y = -10.0;
        }
    }
    this.update = function(arr){
        this.acceleration.y += 0.501231;
        this.velocity.x += this.acceleration.x;
        this.velocity.y += this.acceleration.y;
        

        if(this.velocity.x > 3){
            this.velocity.x = 3;
        }
        if(this.velocity.x < -3){
            this.velocity.x = -3;
        }
        this.velocity.x *= 0.9;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.checkVelocities(objs);
        
        
        this.acceleration.x = 0;
        this.acceleration.y = 0;
    

    }
    this.checkVelocities = function (arr){
        for(var i = 0 ; i < arr.length; i++){
            var x;
            var y;
            
            var hit = true;
            if(this.position.x + this.width/2 <  arr[i].position.x - arr[i].width/2)hit = false;
            if(this.position.x - this.width/2 >  arr[i].position.x + arr[i].width/2)hit = false;
            if(this.position.y + this.height/2 <  arr[i].position.y)hit = false;
            

            if(hit && this.position.y +this.height/2 <= arr[i].position.y + this.velocity.y){

                this.position.y = arr[i].position.y - this.height/2;
                this.velocity.y = 0;
            }
            if(hit && this.position.x +this.width/2 <= arr[i].position.x + this.velocity.x && this.position.y + this.height/2 > arr[i].position.y){

                this.position.x = arr[i].position.x - arr[i].width/2 - this.width/2;
                this.velocity.x = 0;
            }
                
            if(hit && this.position.x -this.width/2 >= arr[i].position.x + this.velocity.x && this.position.y + this.height/2 > arr[i].position.y){

                this.position.x = arr[i].position.x +arr[i].width/2 + this.width/2;
                this.velocity.x = 0;
            }
            
                

        }
        return true;
    }
   
    
}