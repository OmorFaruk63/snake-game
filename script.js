// game variable
let direction = { x: 0, y: 0 };
let foodSound = new Audio("./music/food.mp3");
let moveSound = new Audio("./music/move.mp3");
let gameOverSound = new Audio("./music/gameover.mp3");
let snakeArray = [{ x: 5, y: 15 }];
food = { x: 11, y: 8 };
let lastPaintTime = 0;
let speed = 19;
// game function
function main(ctime) {
  //window.requestAnimationFrame(main);
  //console.log(ctime);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
}

gameEngine();

function gameEngine() {
  //display snake
  bord.innerHTML = "";
  snakeArray.forEach((e, i) => {
    let snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    snakeElement.classList.add("snake-body");
    if (i === 0) {
      snakeElement.classList.add("snake-head");
    }
    bord.appendChild(snakeElement);
  });

  // display food
  let foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  bord.appendChild(foodElement);
}

// main logic start here
window.requestAnimationFrame(main);
