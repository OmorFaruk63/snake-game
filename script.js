// game variable
let inputDir = { x: 0, y: 0 };
let foodSound = new Audio("./music/food.mp3");
let moveSound = new Audio("./music/move.mp3");
let gameOverSound = new Audio("./music/gameover.mp3");
let snakeArray = [{ x: 5, y: 15 }];
let food = { x: 11, y: 8 };
let lastPaintTime = 0;
let speed = 10;        
let score = 0;
// game function
function main(ctime) {
  //window.requestAnimationFrame(main);
  console.log(ctime);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function isCollied(sArray) {
  for (let i = 1; i < snakeArray.length; i++) {
    if (sArray[i].x === sArray[0].x && sArray[i].y === sArray[0].y) {
      return true;
    }
  }

  if (
    (sArray[0].x >= 18 || sArray[0].x <= 0) &&
    (sArray[0].y >= 18 || sArray[0].y <= 0)
  ) {
    return true;
  }
}

function gameEngine() {
  //update snake  food and Array
  if (isCollied(snakeArray)) {
    gameOverSound.play();
    inputDir = { x: 0, y: 0 };
    alert("enter any key to start the game");
    snakeArray = [{ x: 5, y: 15 }];
    score = 0;
  }

  // if snake eat the food regenarate the food
  if (snakeArray[0].x === food.x && snakeArray[0].y === food.y) {
    foodSound.play();
    snakeArray.unshift({
      x: snakeArray[0].x + inputDir.x,
      y: snakeArray[0].y + inputDir.y,
    });
    food = {
      x: Math.floor(Math.random() * 18),
      y: Math.floor(Math.random() * 18),
    };
  }

  // moving the snake
  for (let i = snakeArray.length - 2; i >= 0; i--) {
    snakeArray[i + 1] = { ...snakeArray[i] };
  }

  snakeArray[0].x += inputDir.x;
  snakeArray[0].y += inputDir.y;

  //display snake
  bord.innerHTML = "";
  snakeArray.forEach((e, i) => {
    let snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (i === 0) {
      snakeElement.innerHTML = "🙂";
      snakeElement.classList.add("snake-head");
    } else {
      snakeElement.classList.add("snake-body");
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

window.addEventListener("keydown", (e) => {
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      inputDir.x = 0;
      inputDir.y = -1;
      console.log("ArrowUp");
      break;
    case "ArrowDown":
      inputDir.x = 0;
      inputDir.y = 1;
      console.log("ArrowDown");
      break;
    case "ArrowRight":
      inputDir.x = 1;
      inputDir.y = 0;
      console.log("ArrowRight");
      break;
    case "ArrowLeft":
      inputDir.x = -1;
      inputDir.y = 0;
      console.log("ArrowLeft");
      break;
    default:
      break;
  }
  console.log(inputDir);
});
