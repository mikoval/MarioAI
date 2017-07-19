
function floorObj(){
    this.position = {x:mouseX, y:mouseY}
    this.width = 100;
    this.height=1000;
    this.draw = function(selected){
        var x = this.position.x - this.width/2;
        var y = this.position.y;
        fill(100,200,100);
        if(selected)
            fill(200,200,100);
        noStroke();
        rect(x,y, this.width, this.height );
    }
     
    this.increaseSize = function(){
        this.width += 20;
    }
    this.decreaseSize = function(){
        this.width -= 20;
    }
    this.pointIn = function(x, y){
        if(y > this.position.y && x > this.position.x -this.width/2 && x < this.position.x + this.width/2){
            return true;
        }
        return false;
    }
}

