let startButtonEl = document.getElementById('start-button');
let counterEl = document.getElementById('countdown');
let startScreenEl = document.getElementById('start-screen');

let counter = 0;

const startCountdown = () => {
    counter = 3;
    let timer = setInterval(() => {
        if (counter > 0) {
            counterEl.textContent = counter;
            counter--
        } else {
            counterEl.textContent = '--';
            startScreenEl.setAttribute('id', 'start-screen');
            startScreenEl.removeAttribute('class', 'hide');
            clearInterval(timer);
        }
    }, 1000);
}

const startQuiz = () => {
    console.log('quiz started')
    startScreenEl.setAttribute('class', 'hide');
    startScreenEl.removeAttribute('id', 'start-screen');
}

const clickHandler = () => {
    console.log('start button clicked');
    startCountdown();
    startQuiz();
}

startButtonEl.addEventListener('click', clickHandler);