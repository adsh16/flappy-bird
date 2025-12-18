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

let birdLoaded = false;
const birdSprite = new Image();
birdSprite.src = "./assets/bird.png"; // ensure correct relative path
birdSprite.onload = () => {
    birdLoaded = true;
    drawSprite(bird.x, bird.y); // draw once when ready
};

function drawSprite(x,y){
    if (!birdLoaded) return; // wait until the sprite finishes loading
    ctx.drawImage(birdSprite, x, y, 170, 170);
    // ctx.drawImage(
    //     birdSprite,
    //     sx, sy, sw, sh,   // source rectangle (from sprite sheet)
    //     dx, dy, dw, dh    // destination rectangle (on canvas)
    // );
}

let bird =  {
    x: 50,
    y: 200,
    velocity_x: 0,
    velocity_y: 0,
    rotation: 0,
    velocity: 0,
    gravity: 0.3,
    lift: -10,
};

let game_state = {
    started: false,
    over: false,
    paused : false
}

function update(){
    // physics, movement, collisions
    // flapping the bird
    bird.velocity_y += bird.gravity; // falling down
    bird.velocity_x += bird.velocity; // moving forward
    bird.y += bird.velocity_y;
    bird.x += bird.velocity_x;

    // check for collisions with ground and ceiling
    
    // check for collision with pillars
}


function drawBoard(){
    ctx.clearRect(0, 0, 1280, 720);
    drawSky();
    drawPillar();
    drawSprite(bird.x, bird.y);
}

function gameLoop(){
    update();
    drawBoard();
    // keep passing the same args each frame
    requestAnimationFrame(gameLoop); // schedules next frame
}

function flap(){
    bird.velocity_y = -7; // move up on flap
}

/*
v = u + at
v = bird.velocity
u = initial velocity
a = gravity
t = time (1 frame)
*/

function init(){
    // ctx.beginPath();
    // ctx.rect(50,200, 170,170);
    // ctx.rect(1280/2 - 250,720/2 - 150, 500,200);
    // ctx.clip();
    drawSky();
    drawStartText();
    drawPillar();
    drawSprite(bird.x, bird.y);
    canvas.addEventListener("click", () => {
        if(game_state.started){
            flap();
        }
        else {
            game_state.started = true;
            console.log("Game Started");
            // start the game loop here
            // INPUT → UPDATE → DRAW → repeat
            requestAnimationFrame(gameLoop);
        }
    });    
}


init();