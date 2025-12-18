/*
1280 x 720 canvas for flappy bird game
*/

const canvas_width = 1280;
const canvas_height = 720;
const bird_radius = 70;

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

function drawSky(){
    // creating linear gradient for sky
    
    var gradient_sky = ctx.createLinearGradient(0, canvas_height, 0, 0);
    gradient_sky.addColorStop(0, "lightblue");
    gradient_sky.addColorStop(0.5, "deepskyblue");
    gradient_sky.addColorStop(0.8, "dodgerblue");
    gradient_sky.addColorStop(1, "rgba(11, 65, 152, 1)");
    ctx.fillStyle = gradient_sky;
    ctx.fillRect(0, 0, canvas_width, canvas_height); // fills the entire canvas with sky gradient
}


function drawStartText(){
    // main heading (draw last so it stays visible)
    ctx.fillStyle = "rgba(17, 26, 94, 1)"; // white color for text
    ctx.font = "100px \"BBH Bartle\", sans-serif";
    ctx.textBaseline = 'middle'; 
    ctx.textAlign = 'center'; // sets the (x,y) coordinate as the center of the text, not the starting position that is by default
    ctx.fillText("Flappy Bird",canvas_width/2,canvas_height/2 - 50);
    ctx.strokeStyle = "darkblue";
    ctx.strokeText("Flappy Bird",canvas_width/2,canvas_height/2 - 50); // outline
    ctx.font = "50px Arial";
    ctx.strokeText("Tap To Play",canvas_width/2, canvas_height/2 + 80 - 50); // outline
    ctx.fillText("Tap To Play",canvas_width/2, canvas_height/2 + 80 - 50);
}


function drawPillar(){
    // creating gradient for the pillars
    
    var gradient_pillar = ctx.createLinearGradient(0, canvas_height, 0, 0);
    gradient_pillar.addColorStop(0, "lightgreen");
    gradient_pillar.addColorStop(0.5, "darkgreen");
    gradient_pillar.addColorStop(1, "lightgreen");

    ctx.fillStyle = gradient_pillar;
    for (let i = 0; i < pipes.length; i++){
        gap_y = pipes[i].gap_y; // distribution of gap position
        
        var top_length = canvas_height / 2;
        var bottom_length = canvas_height / 2;
        var distribute_random = pipes[i].distribute_random;
        gap_top = distribute_random * gap_y;
        gap_bottom = (1 - distribute_random) * gap_y;
        top_length -= gap_top;
        bottom_length -= gap_bottom;
        
        // fillRect(upperLeftX, upperLeftY, width, height)
        // bottom pillar
        ctx.fillRect(pipes[i].x,canvas_height - bottom_length, 150, bottom_length);
        ctx.strokeRect(pipes[i].x,canvas_height - bottom_length, 150, bottom_length); // boundary of rectangle
        // top pillar
        ctx.fillRect(pipes[i].x, 0, 150, top_length);
        ctx.strokeRect(pipes[i].x, 0, 150, top_length); // boundary of rectangle
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
    ctx.drawImage(birdSprite, x, y, bird_radius, bird_radius);
    // ctx.drawImage(
    //     birdSprite,
    //     sx, sy, sw, sh,   // source rectangle (from sprite sheet)
    //     dx, dy, dw, dh    // destination rectangle (on canvas)
    // );
}

const pipes = []; // array to hold pillar objects

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

function updatePillars(){
    // remove pillars that have gone off screen
    for (let i = 0; i < pipes.length; i++){
        if(pipes[i].x + 150 < 0){
            pipes.shift();
        }
    }
    while(pipes.length < 10){
        // add new pillar
        // gap between top and bottom pillars [200 - 250] between
        let mid_gap = Math.random() * 100 + 200; // 300 to 500
        if (pipes.length == 0) {
            pipes.push({x: canvas_width, gap_y: mid_gap, distribute_random : Math.random()});
        }
        else {
            let last_pipe = pipes[pipes.length - 1];
            var pillar_gap = Math.random() * 150 + 150;
            pipes.push({x: last_pipe.x + 150 + pillar_gap, gap_y: mid_gap, distribute_random : Math.random()});
        }
    }

    for (let i = 0; i < pipes.length; i++){
        pipes[i].x -= 2; // move pillar left
    }
}

function update(){
    // physics, movement, collisions
    // flapping the bird
    bird.velocity_y += bird.gravity; // falling down
    bird.velocity_x += bird.velocity; // moving forward
    bird.y += bird.velocity_y;
    bird.x += bird.velocity_x;

    // add pillars at intervals
    updatePillars();

    // check for collisions with ground and ceiling
    if(bird.y + bird_radius > canvas_height || bird.y < 0){
        game_state.over = true;
        console.log("Game Over");
    }
    // check for collision with pillars
}


function drawBoard(){
    ctx.clearRect(0, 0, canvas_width, canvas_height);
    drawSky();
    drawPillar();
    drawSprite(bird.x, bird.y);
}

function gameLoop(){
    if(game_state.over) {
        return;
    }
    update();
    drawBoard();
    // keep passing the same args each frame
    requestAnimationFrame(gameLoop); // schedules next frame
}

function flap(){
    bird.velocity_y = -10; // move up on flap
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
    // ctx.rect(50,200, bird_radius,bird_radius);
    // ctx.rect(canvas_width/2 - 250,canvas_height/2 - 150, 500,200);
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