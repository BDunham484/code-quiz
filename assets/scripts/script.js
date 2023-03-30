let startButtonEl = document.getElementById('start-button');
let counterEl = document.getElementById('countdown');
let startScreenEl = document.getElementById('start-screen');
let questionsScreenEl = document.getElementById('questions-screen');
let questionTitleEl = document.getElementById('question-title');
let multipleChoiceEl = document.getElementById('multiple-choice');
let responseEl = document.getElementById('response');
let allDoneEl = document.getElementById('all-done');
let scoreEl = document.getElementById('score');

let counter = 0;
let questionIndex = 0;
let score = 0;
let clearInterval;


const endQuiz = () => {
    allDoneEl.setAttribute('class', 'final-page');
    scoreEl.textContent = score;

    questionsScreenEl.setAttribute('class', 'hide');

    questionIndex = 0;
    score = 0;
}

const startCountdown = () => {
    counter = 1000;
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
        score+=5
    } else {
        console.log('WRONG');
        answerResponse.textContent = "WRONG!"
    }

    if (questionIndex === (questions.length -1)) {
        endQuiz();
    } else {
        questionIndex++;
        getQuestions();
    }
}

startButtonEl.addEventListener('click', startHandler);
multipleChoiceEl.addEventListener('click', answerHandler);