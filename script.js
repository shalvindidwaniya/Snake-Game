//constants and varibles
let inputDir = { x: 0, y: 0 };
const board = document.querySelector(".board");
let foodSound = new Audio("Music/food.mp3");
let gameOverSound = new Audio("Music/gameover.mp3");
let moveSound = new Audio("Music/move.mp3");
let musicSound = new Audio("Music/music.mp3");
let scoreBoard = document.querySelector(".score");
let highBoard = document.querySelector(".highScore");
let speed = 5;
let score = 0;
let highScore = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
food = { x: 6, y: 7 };

//Functions
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(sarr) {
  if(sarr[0].x >= 18 || sarr[0].x <= 0 || sarr[0].y <=0 || sarr[0].y >=18){
    //collision with walls
    return true;
  }
  //agar sanp apne aap mei khus jaye
  for (let i = 1; i < sarr.length; i++){
    if(sarr[i].x === sarr[0].x && sarr[i].y=== sarr[0].y){
      return true;
    }
  }
  return false;
}

function gameEngine() {
  musicSound.play();
  //part 1:  updating the snake array and food
  if (isCollide(snakeArr)) {
    //game over
    highScore = Math.max(score,highScore);
    highBoard.innerHTML = "High-Score :" + highScore;
    
    gameOverSound.play();
    musicSound.pause();
    //reset the variables
    inputDir = { x: 0, y: 0 };
    alert("Game Over - Press any key to start again!");
    snakeArr = [{ x: 13, y: 15 }];
    scoreBoard.innerHTML = "Score: 0";
    musicSound.play();
    score = 0;
  }

  //snake ne khana kha liya hai : score++ and regenearte the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score+=1;
    scoreBoard.innerHTML = "Score: " + score;
    snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y});
    let a = 2;
    let b = 16; //specifying the range in which new food would be generated
    food = {x: Math.round(Math.random() * (b-a) + a), y: Math.round(a + (b-a)*Math.random())};
  }

  //moving the snake
  for(let i = snakeArr.length -2 ; i>=0 ; i--){
    const element = snakeArr[i];
    snakeArr[i+1] = {...snakeArr[i]};
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y; /*moving the head*/

  //part 2: display the snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head");
      // Rotate the head based on direction
      if (inputDir.x === 1) {
        snakeElement.style.transform = "rotate(-90deg) scale(1.4)"; // Right
      } else if (inputDir.x === -1) {
        snakeElement.style.transform = "rotate(90deg) scale(1.4)"; // Left
      } else if (inputDir.y === -1) {
        snakeElement.style.transform = "rotate(-180deg) scale(1.4)"; // Up
      } else if (inputDir.y === 1) {
        snakeElement.style.transform = "rotate(0deg) scale(1.4)"; // Down
      }
    } else snakeElement.classList.add("snake");
    board.appendChild(snakeElement);
  });

  //display food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//main logic starts here
window.requestAnimationFrame(main);
inputDir = { x: 0, y: 0 }; //game start
window.addEventListener("keydown", (e) => {
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowLeft":
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowRight":
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
});
