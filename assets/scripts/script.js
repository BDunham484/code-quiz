let startButtonEl = document.getElementById('start-button');
let counterEl = document.getElementById('countdown');
let startScreenEl = document.getElementById('start-screen');
let questionsScreenEl = document.getElementById('questions-screen');
let questionTitleEl = document.getElementById('question-title');
let multipleChoiceEl = document.getElementById('multiple-choice');
let responseEl = document.getElementById('response');
let allDoneEl = document.getElementById('all-done');
let scoreEl = document.getElementById('score');
let submitInitEl = document.getElementById('submit-initials');
let initialInputEl = document.getElementById('initial-input');

let counter = 0;
let questionIndex = 0;
let score = 0;


const endQuiz = () => {
    allDoneEl.setAttribute('class', 'final-page');
    scoreEl.textContent = score;

    questionsScreenEl.setAttribute('class', 'hide');

    questionIndex = 0;
}

const startCountdown = () => {
    counter = 30;
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
    console.log('getQuestions has run');
    questionsScreenEl.setAttribute('class', 'questions');

    questionTitleEl.textContent = questions[questionIndex].question

    multipleChoiceEl.innerHTML = '';

    let answers = questions[questionIndex].choices;


    for (let i = 0; i < answers.length; i++) {
        let buttonsEl = document.createElement('button');
        let content = answers[i];
        buttonsEl.setAttribute('class', 'choices');
        buttonsEl.setAttribute('data-choice', content);
        buttonsEl.textContent = content;
        multipleChoiceEl.appendChild(buttonsEl);
    }
}

const startQuiz = () => {
    console.log('quiz started')
    startScreenEl.setAttribute('class', 'hide');

    getQuestions();
}

const startHandler = () => {
    console.log('start button clicked');
    startCountdown();
    startQuiz();
}

const answerHandler = (event) => {
    responseEl.innerHTML = '';
    let choice = event.target;
    let choiceData = choice.getAttribute('data-choice')
    let answer = questions[questionIndex].answer;

    let answerResponse = document.createElement('div');
    answerResponse.setAttribute('class', 'answer-response');
    responseEl.appendChild(answerResponse);

    if (answer === choiceData) {
        console.log(answer + choiceData)
        answerResponse.textContent = "CORRECT!"
        score += 5
    } else {
        console.log('WRONG');
        answerResponse.textContent = "WRONG!"
        counter -= 5;
    }

    if (questionIndex === (questions.length - 1)) {
        counter = 0;
    } else {
        questionIndex++;
        getQuestions();
    }
}

const handleInit = (event) => {
    event.preventDefault();
    console.log('score: ' + score);
    let highscore = localStorage.getItem('high-score')
    console.log(highscore);
    let parsedScore = JSON.parse(highscore);
    console.log(parsedScore);
    let initials = initialInputEl.value

    if (highscore === null) {
        highscore = score;
        localStorage.setItem('high-score', JSON.stringify(score));
        localStorage.setItem('initials', JSON.stringify(initials));
    }

    if (score > parsedScore) {
        console.log(score + ' > ' + parsedScore)
        localStorage.setItem('high-score', JSON.stringify(score));
        localStorage.setItem('initials', JSON.stringify(initials));
    }

    score = 0;

    allDoneEl.setAttribute('class', 'hide');
    startScreenEl.setAttribute('class', 'start');
}

startButtonEl.addEventListener('click', startHandler);
multipleChoiceEl.addEventListener('click', answerHandler);
submitInitEl.addEventListener('click', handleInit);