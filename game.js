var objs;
var item;
var player;
var input  = {direction:undefined, action:undefined}
function setup() {
    width = $(window).width();
    height = $(window).height();

    var myCanvas = createCanvas(width, height);
    myCanvas.parent('myContainer');

    objs = [];
}

function draw(){
    background(50);
    for(var i =0; i < objs.length; i++){
        objs[i].draw();
    }

    if(item){
        item.draw(true);
    }
        
    if(player){
        player.command(input.direction)
        player.command(input.action)
        player.update(objs);
        player.draw();
    }
}

function mousePressed() {
    mouseDown = true;
    if(item){
        item = undefined;
    }
    for(var i =0; i < objs.length; i++){
        if(objs[i].pointIn(mouseX, mouseY)){
            item = objs[i];
        }
    }
}
function mouseDragged(){
    console.log("here")
    if(item && mouseDown){
        item.position.x = mouseX;
        item.position.y = mouseY;
    }
}
function mouseReleased() {
    mouseDown = false;
}
function keyPressed(e) {
    if(e.key == "1"){
        item = new floorObj();
        objs.push(item);
    }
    if(e.key == "p"){
        if(item){
            item.increaseSize();
        }
    }
    if(e.key == "o"){
        if(item){
            item.decreaseSize();
        }
    }
    if(e.key == "x"){
        if(item){
            for(var i = 0; i <objs.length; i++){
                if(Object.is(item, objs[i])){
                    objs.splice(i, 1);
                    item=undefined;
                    return;
                }
            }
        }
    }
    if(e.key == "a"){
        if(player){
            input.direction = "left"
        }
    }
    if(e.key == "d"){
        if(player){
            input.direction = "right"
        }
    }
    if(e.key == "w"){
        if(player){
            input.action = "jump"
        }
    }
    if(e.key == "0"){
        player = new Player(mouseX, mouseY);
    }
}
function keyReleased(e) {
    
    if(e.key == "a"){
        if(player && input.direction == "left"){
            input.direction = undefined
        }
    }
    if(e.key == "d"){
        if(player && input.direction == "right"){
            input.direction = undefined;
        }
    }
    if(e.key == "w"){
        if(player && input.action == "jump"){
            input.action = undefined;
        }
    }
    
}

