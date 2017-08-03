var objs;
var item;
var player;
var mario;
var input  = {direction:undefined, action:undefined}
var saved = false;
function setup() {
    width = $(window).width();
    height = $(window).height();

    var myCanvas = createCanvas(width, height);
    myCanvas.parent('myContainer');
    game = JSON.parse(game);
    objs = [];
    console.log(game.objs);
    for(var i = 0; i < game.objs.length; i++){
        item = new floorObj(game.objs[i].position, game.objs[i].width)

        objs.push(item);
    }
    console.log(objs);

    
    mario_running_right = loadAnimation("/sprites/run-right-1.png", "/sprites/run-right-3.png");
    mario_running_left = loadAnimation("/sprites/run-left-1.png", "/sprites/run-left-3.png");
    mario_stand_right = loadAnimation("/sprites/run-right-1.png");
    mario_stand_left = loadAnimation("/sprites/run-left-1.png");
    saveGame();

    
}



function saveGame(){
    var game = {
        objs:objs
    }
    var data = {
        id:id,
        game:JSON.stringify(game),

    }
    console.log("saving");
    $.ajax({
        type:"POST",
        url:"/edit", 
        data:data ,
        success: function(data){
            setTimeout(saveGame, 10000);  
        },
        error: function(){
          console.log("failed")
        }
    })  
   
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
    drawSprites();
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
        if(player)
            player.mario.remove();
        player = new Player(mouseX, mouseY);
    }
}
function keyReleased(e) {
    
    if(e.key == "a"){
        if(player && input.direction == "left"){
            player.command("stand-left")
            input.direction = undefined
        }
    }
    if(e.key == "d"){
        if(player && input.direction == "right"){
            player.command("stand-right")
            input.direction = undefined;
        }
    }
    if(e.key == "w"){
        if(player && input.action == "jump"){
            input.action = undefined;
        }
    }
    
}

