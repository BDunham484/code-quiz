let startButtonEl = document.getElementById('start-button');
let counterEl = document.getElementById('countdown');
let startScreenEl = document.getElementById('start-screen');
let questionsScreenEl = document.getElementById('questions-screen');

let counter = 0;

const endQuiz = () => {
    startScreenEl.setAttribute('class', 'start');

    questionsScreenEl.setAttribute('class', 'hide');
}

const startCountdown = () => {
    counter = 3;
    let timer = setInterval(() => {
        if (counter > 0) {
            counterEl.textContent = counter;
            counter--
        } else {
            counterEl.textContent = '--';
            endQuiz();
            
            clearInterval(timer);
        }
    }, 1000);
}

const getQuestions = () => {
    console.log('getQuestins has run');
    questionsScreenEl.setAttribute('class', 'questions');
}

const startQuiz = () => {
    console.log('quiz started')
    startScreenEl.setAttribute('class', 'hide');

    getQuestions();
}

const clickHandler = () => {
    console.log('start button clicked');
    startCountdown();
    startQuiz();
}

startButtonEl.addEventListener('click', clickHandler);