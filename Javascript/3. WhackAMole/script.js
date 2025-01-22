const squares = document.querySelectorAll('.square');
const timeLeft = document.querySelector('#time-left');
const scoreDisplay = document.querySelector('#Score');

let result = 0;
let currentTime = 60;
let timerId;

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole');
    });

    const randomPosition = squares[Math.floor(Math.random() * squares.length)];
    randomPosition.classList.add('mole');
    hitPosition = randomPosition.id;
}

function moveMole() {
    timerId = setInterval(randomSquare, 500);
}

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (square.id === hitPosition) {
            result++;
            scoreDisplay.textContent = result;
            hitPosition = null;
        }
    });
});

function countdown() {
    currentTime--;
    timeLeft.textContent = currentTime;

    if (currentTime === 0) {
        clearInterval(timerId);
        clearInterval(countdownTimerId);
        alert('Game Over! Your final score is ' + result);
    }
}

moveMole();
const countdownTimerId = setInterval(countdown, 1000);
