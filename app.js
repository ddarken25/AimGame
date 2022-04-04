const startBtn = document.querySelector('.start');
const screens = document.querySelectorAll('.screen');
const timeList = document.getElementById('time-list');
const timeEl = document.getElementById('time');
const board = document.querySelector('.board');
const backBtn = document.createElement('button');
backBtn.textContent = 'Назад в меню';
backBtn.classList.add('time-btn');
let time = 0;
let score = 0;

const COLORS = 
[
    `linear-gradient(90deg, #16D9E3 0%, #30C7EC 47%, #46AEF7 100%)`,
    `linear-gradient(90deg, #91e316 0%, #5aeb1d 47%, #58f746 100%)`,
    `linear-gradient(90deg, #ef62c2 0%, #eb1de1 47%, #d446f7 100%)`,
    `linear-gradient(90deg, #ef6262 0%, #eb1d1d 47%, #f74646 100%)`]

startBtn.addEventListener('click', (e) => {
    e.preventDefault();

    screens[0].classList.add('up');
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
})

board.addEventListener('click', event => {
    if(event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
    }
})

function startGame() {
    board.innerHTML = '';
    score = 0;
    window.timeID = setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
}


function decreaseTime() {
    if (time === 0) {
        finishGame();
    }
    else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`;
        }
        setTime(current);
    }
}

function setTime(value) {
    timeEl.parentNode.classList.remove('hide');
    timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
    clearInterval(window.timeID);
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Счёт: <span class = "primary">${score}</span></h1>`;
    board.append(backBtn);
    backBtn.addEventListener('click', ()=> {
        for (let i = 0; i < 2; i++) {
            screens[i].classList.remove('up');
        }
    })
}


function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.classList.add('circle');
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.background = `${getRandomColor()}`;
    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random()*(max - min) + min);
}
function getRandomColor() {
    return COLORS[Math.round(Math.random()*(COLORS.length))];
}