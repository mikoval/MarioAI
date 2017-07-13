
function Player(x, y){
    this.position = {x:x, y:y}
    this.width = 10;
    this.height= 30;
    this.velocity = {x:0, y:0}
    this.acceleration = {x:0, y:0}
    this.draw = function(selected){
        var x = this.position.x - this.width/2;
        var y = this.position.y - this.height/2;

        fill(255);
        
        rect(x,y, this.width, this.height );
    }
    this.command = function(command){
       
        if(command == "right"){
            this.acceleration.x = 2.0;
        }
        else if(command == "left"){
            this.acceleration.x = -2.0;
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
            console.log("character bottom: "+  (this.position.y +this.height/2))
            console.log("wall top: " + arr[i].position.y);
            console.log("wall top with velocity: " + (arr[i].position.y+ this.velocity.y));

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