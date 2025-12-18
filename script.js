/*
1280 x 720 canvas for flappy bird game
*/
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

function drawSky(){
    // creating linear gradient for sky
    var gradient_sky = ctx.createLinearGradient(0, 720, 0, 0);
    gradient_sky.addColorStop(0, "lightblue");
    gradient_sky.addColorStop(0.5, "deepskyblue");
    gradient_sky.addColorStop(0.8, "dodgerblue");
    gradient_sky.addColorStop(1, "rgba(11, 65, 152, 1)");
    ctx.fillStyle = gradient_sky;
    ctx.fillRect(0, 0, 1280, 720); // fills the entire canvas with sky gradient
}


function drawStartText(){
    // main heading (draw last so it stays visible)
    ctx.fillStyle = "rgba(17, 26, 94, 1)"; // white color for text
    ctx.font = "100px \"BBH Bartle\", sans-serif";
    ctx.textBaseline = 'middle'; 
    ctx.textAlign = 'center'; // sets the (x,y) coordinate as the center of the text, not the starting position that is by default
    ctx.fillText("Flappy Bird",1280/2,720/2 - 50);
    ctx.strokeStyle = "darkblue";
    ctx.strokeText("Flappy Bird",1280/2,720/2 - 50); // outline
    ctx.font = "50px Arial";
    ctx.strokeText("Tap To Play",1280/2, 720/2 + 80 - 50); // outline
    ctx.fillText("Tap To Play",1280/2, 720/2 + 80 - 50);
}


function drawPillar(){
    // creating gradient for the pillars
    
    var gradient_pillar = ctx.createLinearGradient(0, 720, 0, 0);
    gradient_pillar.addColorStop(0, "lightgreen");
    gradient_pillar.addColorStop(0.5, "darkgreen");
    gradient_pillar.addColorStop(1, "lightgreen");

    ctx.fillStyle = gradient_pillar;
    for (let i = 0; i < 10; i++){
        ctx.fillRect(i * 200, 420, 150, 300);
        ctx.strokeRect(i * 200, 420, 150, 300); // boundary of rectangle
    }
}

function drawSprite(){
    // drawing the bird sprite
    
    ctx.drawImage(birdSprite,birdx,birdy);

}

function init(){
    drawSky();
    drawStartText();
    drawPillar();
    drawSprite();
    // let dead = false;
    
    // while(!dead){

    // }

}


init();