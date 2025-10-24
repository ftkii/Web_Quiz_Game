//Dom elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startBtn = document.getElementById("start-btn");
const questionText = document.getElementById("q-text");
const currentQ = document.getElementById("current-q");
const totalQ = document.getElementById("total-q");
const scoreNum = document.getElementById("score-num");
const answersContainer = document.getElementById("answers-container");
const progres = document.getElementById("progres");
const finalScore = document.getElementById("final-score");
const maxScore = document.getElementById("max-score");
const resultMsg = document.getElementById("result-msg");
const restartBtn = document.getElementById("restart-btn");//

// quiz questions
const quizQuestions = [
    {
        question: "1. What does HTML stand for?",
        answer: [
            { text: "Hyperlinks and Text Markup Language", correct: false },
            { text: "Home Tool Markup Language", correct: false },
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Hyper Transfer Making Language", correct: false }
        ]
    },
    {
        question: "2. Which CSS property changes the text color?",
        answer: [
            { text: "font-color", correct: false },
            { text: "color", correct: true },
            { text: "text-style", correct: false },
            { text: "background-color", correct: false }
        ]
    },
    {
        question: "3. Inside which HTML element do we put the JavaScript?",
        answer: [
            { text: "<script>", correct: true },
            { text: "<js>", correct: false },
            { text: "<javascript>", correct: false },
            { text: "<code>", correct: false }
        ]
    },
    {
        question: "4. Which symbol is used for comments in CSS?",
        answer: [
            { text: "// comment", correct: false },
            { text: "# comment", correct: false },
            { text: "<!-- comment -->", correct: false },
            { text: "/* comment */", correct: true }
        ]
    },
    {
        question: "5. How do you create a function in JavaScript?",
        answer: [
            { text: "function = myFunction()", correct: false },
            { text: "create myFunction()", correct: false },
            { text: "function myFunction()", correct: true },
            { text: "def myFunction()", correct: false }
        ]
    }
];

// quiz state vars
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false; //until the next q

totalQ.textContent = quizQuestions.length;
maxScore.textContent = quizQuestions.length;

// event listener
startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", restarQuiz);

function startQuiz() {
    //reset vars
    currentQuestionIndex = 0;
    score = 0;
    scoreNum.textContent = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
}

function showQuestion() {
    //reset state
    answersDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];
    currentQ.textContent = currentQuestionIndex + 1;
    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progres.style.width = progressPercent + "%";
    questionText.textContent = currentQuestion.question;

    answersContainer.innerHTML = "";
    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answers-btn");

        button.dataset.correct = answer.correct;

        button.addEventListener("click", slectAnswer);

        answersContainer.appendChild(button);
    });

}

function slectAnswer(event) {
    //check
    if (answersDisabled) return;

    answersDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) {
        selectedButton.classList.add("correct");
    } else {
        selectedButton.classList.add("incorrect");
    }

    Array.from(answersContainer.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        else {
            button.classList.add("incorrect");
        }
    });

    if (isCorrect) {
        score++;
        scoreNum.textContent = score;
    }

    setTimeout(() => {
        currentQuestionIndex++;
        //checl if there more questions or the quiz is over
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 1000);
}

function showResult() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScore.textContent = score;

    const percentage = (score / quizQuestions.length) * 100;
    if (percentage === 100) {
        resultMsg.textContent = "Perfect you're a genius!";
    } else if (percentage >= 80) {
        resultMsg.textContent = "Great job!";
    } else if (percentage >= 60) {
        resultMsg.textContent = "Good offort!";
    } else if (percentage >= 40) {
        resultMsg.textContent = "Not bad!";
    }
    else {
        resultMsg.textContent = "Keep studying!";
    }

}

function restarQuiz() {
    resultScreen.classList.remove("active");
    startQuiz();

}