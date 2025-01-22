const grid = document.querySelector('#grid');
const scoreDisplay = document.querySelector('#score');

const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 600;
const boardHeight = 300;
const ballDiameter = 20;

let xDirection = 2;
let yDirection = 2;
let score = 0;

class Block {
    constructor(x, y) {
        this.bottomLeft = [x, y];
        this.bottomRight = [x + blockWidth, y];
        this.topLeft = [x, y + blockHeight];
        this.topRight = [x + blockWidth, y + blockHeight];
    }
}

const blocks = [];
function generateBlocks() {
    const positions = [];
    const verticalSpacing = 10;
    const totalWidth = 5 * (blockWidth + 10) - 10;
    const startingX = (boardWidth - totalWidth) / 2;

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 3; j++) {
            positions.push([startingX + i * (blockWidth + 10), boardHeight - (j + 1) * (blockHeight + verticalSpacing)]);
        }
    }

    for (let i = positions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [positions[i], positions[j]] = [positions[j], positions[i]];
    }

    positions.forEach(pos => {
        blocks.push(new Block(pos[0], pos[1]));
    });
}

function addBlocks() {
    blocks.forEach(block => {
        const blockDiv = document.createElement('div');
        blockDiv.classList.add('block');
        blockDiv.style.left = block.bottomLeft[0] + 'px';
        blockDiv.style.bottom = block.bottomLeft[1] + 'px';
        grid.appendChild(blockDiv);
    });
}

generateBlocks();
addBlocks();

const paddle = document.createElement('div');
paddle.classList.add('paddle');
grid.appendChild(paddle);

let currentPosition = [250, 10];
function drawPaddle() {
    paddle.style.left = currentPosition[0] + 'px';
    paddle.style.bottom = currentPosition[1] + 'px';
}
drawPaddle();

function moveUser(event) {
    switch (event.key) {
        case 'ArrowLeft':
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 30;
                drawPaddle();
            }
            break;
        case 'ArrowRight':
            if (currentPosition[0] < boardWidth - blockWidth) {
                currentPosition[0] += 30;
                drawPaddle();
            }
            break;
    }
}
document.addEventListener('keydown', moveUser);

const ball = document.createElement('div');
ball.classList.add('ball');
grid.appendChild(ball);

let ballCurrentPosition = [290, 40];
function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px';
    ball.style.bottom = ballCurrentPosition[1] + 'px';
}
drawBall();

function moveBall() {
    ballCurrentPosition[0] += xDirection;
    ballCurrentPosition[1] += yDirection;
    drawBall();
    checkForCollisions();
}

function checkForCollisions() {
    for (let i = 0; i < blocks.length; i++) {
        if (
            ballCurrentPosition[0] > blocks[i].bottomLeft[0] &&
            ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
            ballCurrentPosition[1] + ballDiameter > blocks[i].bottomLeft[1] &&
            ballCurrentPosition[1] < blocks[i].topLeft[1]
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'));
            allBlocks[i].classList.remove('block');
            blocks.splice(i, 1);
            changeDirection();
            score++;
            scoreDisplay.innerHTML = score;
            if (blocks.length === 0) {
                scoreDisplay.innerHTML = 'You Win!';
                clearInterval(timerId);
                document.removeEventListener('keydown', moveUser);
            }
        }
    }

    if (
        ballCurrentPosition[0] >= boardWidth - ballDiameter ||
        ballCurrentPosition[0] <= 0 ||
        ballCurrentPosition[1] >= boardHeight - ballDiameter
    ) {
        changeDirection();
    }

    if (
        ballCurrentPosition[0] > currentPosition[0] &&
        ballCurrentPosition[0] < currentPosition[0] + blockWidth &&
        ballCurrentPosition[1] > currentPosition[1] &&
        ballCurrentPosition[1] < currentPosition[1] + blockHeight
    ) {
        changeDirection();
    }

    if (ballCurrentPosition[1] <= 0) {
        clearInterval(timerId);
        scoreDisplay.innerHTML = 'You lose!';
        document.removeEventListener('keydown', moveUser);
    }
}

function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2;
        return;
    }
    if (xDirection === 2 && yDirection === -2) {
        xDirection = -2;
        return;
    }
    if (xDirection === -2 && yDirection === -2) {
        yDirection = 2;
        return;
    }
    if (xDirection === -2 && yDirection === 2) {
        xDirection = 2;
        return;
    }
}

const timerId = setInterval(moveBall, 15);
