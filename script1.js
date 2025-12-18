/*
1280 x 720 canvas for flappy bird game

*/
const canvas_width = 1280;
const canvas_height = 720;
const bird_width = 50;
const bird_height = 50;
// locating the canvas element in the dom
const canvas = document.getElementById("myCanvas")

// getting the 2d drawing context from the canvas
var ctx = canvas.getContext("2d");

// main heading
// (moved to end so it's drawn on top)
// ctx.stroke();

// creating linear gradient for sky
var gradient_sky = ctx.createLinearGradient(0, canvas_height, 0, 0);
gradient_sky.addColorStop(0, "lightblue");
gradient_sky.addColorStop(0.5, "deepskyblue");
gradient_sky.addColorStop(0.8, "dodgerblue");
gradient_sky.addColorStop(1, "rgba(11, 65, 152, 1)");
ctx.fillStyle = gradient_sky;
ctx.fillRect(0, 0, canvas_width, canvas_height); // fills the entire canvas with sky gradient
// ctx.stroke();


// creating gradient for the pillars
var gradient_pillar = ctx.createLinearGradient(0, canvas_height, 0, 0);
gradient_pillar.addColorStop(0, "lightgreen");
gradient_pillar.addColorStop(0.5, "darkgreen");
gradient_pillar.addColorStop(1, "lightgreen");


// sets the fill color to green, for pillars
ctx.fillStyle = gradient_pillar;


ctx.strokeStyle = "black"; // for lines and circle
ctx.lineWidth = 5; // thickness of lines
// draws (x,y,width,height) a filled rectangle at x,y with given width and height

function drawPillar(){
    ctx.fillStyle = gradient_pillar;
    for (let i = 0; i < 10; i++){
        ctx.fillRect(i * 200, 420, 150, 300);
        ctx.strokeRect(i * 200, 420, 150, 300); // boundary of rectangle
    }
}

ctx.fillRect(0, 420, 150, 300);
ctx.strokeRect(0, 420, 150, 300); // boundary of rectangle

ctx.fillRect(200, 420, 150, 300);
ctx.strokeRect(200, 420, 150, 300);

ctx.fillRect(400, 420, 150, 300);
ctx.strokeRect(400, 420, 150, 300);

ctx.fillRect(600, 420, 150, 300);
ctx.strokeRect(600, 420, 150, 300);

// draws a line from (0,0) to (200,100)
// Set an start-point
ctx.moveTo(0, 0);
// Set an end-point
ctx.lineTo(200, 100);
// Stroke it (Do the Drawing)
// // ctx.stroke();


// draws a circle at (95,50) with radius 40
ctx.beginPath();
ctx.arc(95, 50, 40, 0, 2 * Math.PI);
// ctx.stroke();



// clear area of canvas (like an eraser)
ctx.clearRect(20, 422, 50, 300);


// drawing an arc
ctx.beginPath();
ctx.arc(300,300,100, 0, Math.PI / 2);
// x,y, radius, start angle, end angle
// ctx.stroke();



// drawing curved lines using quadratic curves
ctx.beginPath();
// starting point of curve x and y
ctx.moveTo(300, 0);
// anchor/control point (x,y) and end point (x,y) for the curve
ctx.quadraticCurveTo(500, 200, 600, 20);
// ctx.stroke()

// main heading (draw last so it stays visible)
ctx.fillStyle = "black";
ctx.font = "100px \"BBH Bartle\", sans-serif";
ctx.textBaseline = 'middle'; 
ctx.textAlign = 'center'; // sets the (x,y) coordinate as the center of the text, not the starting position that is by default
ctx.fillText("Flappy Bird",canvas_width/2,canvas_height/2 - 50);
ctx.font = "50px Arial";
ctx.fillText("Tap To Play",canvas_width/2, canvas_height/2 + 80 - 50);
drawPillar();



ctx.fillText('Game over', canvas_width/2, canvas_height/2);