// board

var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;


//Snake 

var snakeY = blockSize * 5;
var snakeX = blockSize * 5;



var velocityX = 0;  //So the snake is able to move
var velocityY = 0;

var snakeBody = [];

//The food
var foodX;
var foodY;

//game over

var gameOver = false;


window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize; 
    board.width = cols * blockSize;
    context = board.getContext("2d"); //This is for drawing on the board

    placeFood()
    document.addEventListener("keyup", changeDirection); 
    setInterval(update, 1000/10) //this is so the canvas updates 10 times a second
}

function update() {
    if (gameOver) {
        return;
    }
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize)


if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY])
    placeFood();
}

for (let i = snakeBody.length -1; i > 0; i--) {
    snakeBody[i] = snakeBody[i-1]; 
}

if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
}

    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize) 
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize)
}

//game over conditions
if (snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize) {
    gameOver = true; 
    alert("Game Over");
}

//Collision with its body = gameover
for (let i = 0; i < snakeBody.length; i++) {
    if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
        gameOver = true;
        alert("Game Over");
    }
}

}

//arrow key functions
function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
}


//Function to place the food randomly on canvas
function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * cols) * blockSize;
}