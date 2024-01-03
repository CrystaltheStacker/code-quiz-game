let time = document.querySelector(".timer");
let score = document.querySelector("#score");
let secondsLeft = 75;

const start = document.querySelector("#start");

const gameIntro = document.querySelector("#game-begins");

let questionsArr = document.querySelector(".all-questions");

let questionElem = document.querySelector("#question");
const correctWrong = document.querySelector("#right-wrong");
let questionCount = 0;

const finalElem = document.querySelector("#final-score");
let initialsInput = document.querySelector("#initials");

const highScoresElem = document.querySelector("#high-scores");
let scoreListElem = document.querySelector(".score-list");
let scoreList = [];

const ansBtn = document.querySelectorAll("button.answer-btn");

let submitScrBtn = document.querySelector("#submit-score");
let clearScrBtn = document.querySelector("#clearScores");
let viewScrBtn = document.querySelector("#view-scores");
let goBackBtn = document.querySelector("#goBack");

const ans1Btn = document.querySelector("#answer-1");
const ans2Btn = document.querySelector("#answer-2");
const ans3Btn = document.querySelector("#answer-3");
const ans4Btn = document.querySelector("#answer-4");

const questions = [ 
    {
        question: "Commonly used data types DO not use __________.",
        answers: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        correctAnswer: 2
    },
    {
        question: "The condition in an if / else statement is enclosed with ___________.",
        answers: ["1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"],
        correctAnswer: 2
    },
    {
        question: "Arrays in JavaScript can be used to store ____________.",
        answers: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        correctAnswer: 3
    },
    {
        question: "String values must be enclosed within ____________ when being assigned to variables.",
        answers: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
        correctAnswer: 2
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"],
        correctAnswer: 3
    }
];


const setTime = () => {
    let timerInterval = setInterval(() => {
        secondsLeft--;
        time.textContent = `Time:${secondsLeft}s`;

        if (secondsLeft === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            questionsArr.style.display = "none";
            finalElem.style.display = "block";
            score.textContent = secondsLeft;
        }
    }, 1000);
};


const startQuiz = () => {
    gameIntro.style.display = "none";
    questionsArr.style.display = "block";
    questionCount = 0;

    setTime();
    setQuestion(questionCount);
};


const setQuestion = (id) => {
    if (id < questions.length) {
        questionElem.textContent = questions[id].question;
        ans1Btn.textContent = questions[id].answers[0];
        ans2Btn.textContent = questions[id].answers[1];
        ans3Btn.textContent = questions[id].answers[2];
        ans4Btn.textContent = questions[id].answers[3];
    }
};


const checkAnswer = (event) => {
    event.preventDefault();

    correctWrong.style.display = "block";
    let p = document.createElement("p");
    correctWrong.appendChild(p);

    setTimeout(() => {
    p.style.display = 'none';
    }, 1000);

    if (parseInt(questions[questionCount].correctAnswer) === parseInt(event.target.value)) {
    p.textContent = "Correct!";
    } else {
    secondsLeft = secondsLeft - 10;
    p.textContent = "Wrong!";
    }

    if (questionCount < questions.length) {
    questionCount++;
    }
    setQuestion(questionCount);
};

const addScore = (event) => {
    event.preventDefault();

    finalElem.style.display = "none";
    highScoresElem.style.display = "block";

    let init = initialsInput.value.toUpperCase();
    scoreList.push({ initials: init, score: secondsLeft });


    scoreList = scoreList.sort((a, b) => (a.score < b.score ? 1 : -1));

    scoreListElem.innerHTML = "";
    for (let i = 0; i < scoreList.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
        scoreListElem.append(li);
    }


    storeScores();
    displayScores();
};

const storeScores = () => {
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
};

const displayScores = () => {

    let storedScoreList = JSON.parse(localStorage.getItem("scoreList"));

    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }
};


const clearScores = () => {
    localStorage.clear();
    scoreListElem.innerHTML = "";
};


start.addEventListener("click", startQuiz);


ansBtn.forEach(item => {
    item.addEventListener('click', checkAnswer);
});


submitScrBtn.addEventListener("click", addScore);


goBackBtn.addEventListener("click", () => {
    highScoresElem.style.display = "none";
    gameIntro.style.display = "block";
    secondsLeft = 75;
    time.textContent = `Time:${secondsLeft}s`;
});


clearScrBtn.addEventListener("click", clearScores);





