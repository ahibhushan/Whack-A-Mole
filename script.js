let scoreH2 = document.getElementById('score');
let timeLeftH2 = document.getElementById('timeLeft');
let startNewGameButton = document.getElementById('startNewGame');
let pauseGameButton = document.getElementById('pauseGame');
let grid = document.getElementsByClassName('grid')[0];
let squares = document.querySelectorAll('.square');
let gameMusic = new Audio('Assets/gameMusic.mp3');
let hitMusic = new Audio('Assets/hitMusic.mp3');

let score = 0;
let timeLeft = 0;
let hitPosition = null;
let timerId = null;
let randomMoleId = null;


function randomMole() {
    squares.forEach(square => {
        square.classList.remove('mole');
    })

    let randomSquare = squares[Math.floor(Math.random() * squares.length)];
    randomSquare.classList.add('mole');
    hitPosition = randomSquare.id;
}

function countDown() {
    timeLeft--;
    timeLeftH2.innerText = `Time Left : ${timeLeft}`;

    if (timeLeft === 0) {
        clearInterval(timerId);
        clearInterval(randomMoleId);
        gameMusic.pause();
        grid.style.display = 'none';
    }
}

function pauseResumeGame() {
    if (pauseGameButton.textContent === 'Pause') {
        gameMusic.pause();
        clearInterval(timerId);
        clearInterval(randomMoleId);
        timerId = null;
        randomMoleId = null;
        pauseGameButton.textContent = 'Resume';
    } else {
        timerId = setInterval(randomMole, 1000);
        randomMoleId = setInterval(countDown, 1000);
        pauseGameButton.textContent = 'Pause';
        gameMusic.play();
    }
}

randomMole();
//use mousedown
squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (square.id === hitPosition && timerId !== null) { //score will not be updated after pause button has been clicked 
            score++;
            hitMusic.play();
            setTimeout(() => {
                hitMusic.pause()
            }, 1000); //hit sound stop after 1 sec
            scoreH2.innerText = `Your Score : ${score}`;
            hitPosition = null;
        }
    })
})


function startGame() {
    score = 0;
    timeLeft = 60;
    scoreH2.innerHTML = 'Your Score : 0';
    timeLeftH2.innerHTML = 'Time Left : 60';
    grid.style.display = 'flex';
    pauseGameButton.style.display = 'inline-block';
    pauseGameButton.textContent = 'Pause';
    gameMusic.play();
    //callback function
    timerId = setInterval(randomMole, 1000);
    //setInterval calls a function at regular interval
    randomMoleId = setInterval(countDown, 1000);
}

startNewGameButton.addEventListener('click', startGame);

pauseGameButton.addEventListener('click', pauseResumeGame);