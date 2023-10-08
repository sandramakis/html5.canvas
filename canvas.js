"use strict";

const canvas = document.querySelector("#draw");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// const btn = document.querySelector(".wavy");
// btn.width = window.innerWidth / 15;
// console.log(btn);

ctx.strokeStyle = "#acd600";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 100;
// ctx.globalCompositeOperation = "xor";
let hue = 0;
let direction = false;

// Initialize starting variables
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// fn draw
function draw(e) {
  if (!isDrawing) return; // only run the function when moused down
  console.log(e);

  // set hue color to red hsl(0,100%,50%)
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

  ctx.beginPath();
  ctx.moveTo(lastX, lastY); // start from
  ctx.lineTo(e.offsetX, e.offsetY); // go to (move from line to line)
  ctx.stroke(); //render the path

  //   Update lastX and lastY
  [lastX, lastY] = [e.offsetX, e.offsetY];

  // increment the hue to display other colors
  hue++;

  // Revert to the first color when it reaches the last
  if (hue >= 360) hue = 0;

  // make the lineWidth a max of 100 and either decrement or increment the direction based on the result
  if (ctx.lineWidth >= 500 || ctx.lineWidth <= 1) {
    direction = !direction;
  }
  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
}

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mousedown", (e) => {
  //when mouse is pressed, drawing should be true
  isDrawing = true;
  // when on mousedown, lastXandY should be equas to the new event calling it
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener("mouseup", () => (isDrawing = false)); //when mouse is released
canvas.addEventListener("mouseout", () => (isDrawing = false)); //when mouse is out of the element
