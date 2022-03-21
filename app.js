const quizQuestions = [{
        question: "Who invented JavaScript?",
        a: "Douglas crockford",
        b: "Sheryl Sandberg",
        c: "Brendan Eich",
        d: "James Bond",
        answer: 2,
    },

    {
        question: "JavaScript is a ____ language?",
        a: "Object-Oriented",
        b: "Object-Based",
        c: "Assenbly-language",
        d: "High-level",
        answer: 0
    },

    {
        question: "Which of the following methods is used to access HTML elements using JavaScript",

        a: "getElementbyId()",
        b: "getElementsByClassName()",
        c: "Both A and B",
        d: "None of the above",
        answer: 2
    },

    {
        question: "What keyword is used to check whether a given property is valid or not?",

        a: "in",
        b: "is in",
        c: "exists",
        d: "lies",
        answer: 0
    },
    {
        question: "When an operator's value is NULL, the typeof returned by the unary operator is:",
        a: "Boolean",
        b: "Undefined",
        c: "Object",
        d: "Integer",

        answer: 2
    },
    {
        question: "What keyword is used to declare an asynchronous function in Javascript?",
        a: "async",
        b: "await",
        c: "setTimeout",
        d: "setInterval",
        answer: 0
    },
    {
        question: "How to stop an interval timer in Javascript?",

        a: "clearInterval",
        b: "clearTimer",
        c: "intervalOver",
        d: "None of the above",

        answer: 0
    },
    {
        question: "How are objects compared when they are checked with the strick equality operator?",
        a: "The contents of the object are compared",
        b: "Their references are compared",
        c: "Both A and B",
        d: "None of the above",

        answer: 1
    },
    {
        question: "How do you know the number of element sin a form?",
        a: "document.myform.elements.count",
        b: "document.myform.length",
        c: "documents.myform.count",
        d: "documents.myform.elements.length",

        answer: 3
    },

    {
        question: "which method returns the string starting at the specified position?",

        a: "substr()",
        b: "getsubstring()",
        c: "slice()",
        d: "None of the above",

        answer: 0
    },
];


// Selecting the elements
let startScreen = document.querySelector("#instructions");
let startButton = document.getElementById('start-quiz_Btn');
let countdownTimer = document.querySelector("#countdownTimer")


//Quiz Section

let startQuiz = document.querySelector("#start_quiz");

// question component
let questionNumber = document.querySelector("#questionNo");
let question = document.querySelector("#question");

// quiz choices component

let choiceList = document.querySelectorAll(".choices");

let option1 = document.querySelector("#option1");
let option2 = document.querySelector("#option2");
let option3 = document.querySelector("#option3");
let option4 = document.querySelector("#option4");

// Next button

let nextBtn = document.getElementById('nextButton');

// feedback provided to player
let correct = document.querySelector("#correct1");
let incorrect = document.querySelector("#correct2");



// result screen

let resultsForm = document.querySelector('#resultScreen');
let finalScore = document.querySelector('#finalScoretimer');

let userForm = document.querySelector('#userForm');
let userInitials = document.querySelector('#userInput');


// submit button to submit user initials

let submitButton = document.querySelector('#submitBtn');

// Scores page

let highScoreScreen = document.querySelector('#high_scores');
let scoreCounter = document.querySelector('#score_counter');

// Buttons on scores page

let backButton = document.querySelector("#backBtn");
let clearScores = document.querySelector("#clearScores");

// counter values

let timer = 75;
let isStopped = true;
let i = 0;
let score;
let globalCounter;

// answer values and score
let right = 0;
let userAnswerChoice = undefined;

startButton.addEventListener('click', () => {
    startScreen.style.display = "none";
    startQuiz.style.display = "block";
    loadData();

    let timeKeeper = setInterval(() => {
        if (timer > 0) {
            timer--;
            //timer updated on the screen
            countdownTimer.innerText = `${timer}`;
        } else {
            clearInterval(timeKeeper);
        }
    }, 1000);
});



let index = 0;
let loadData = () => {
    questionNumber.innerText = index + 1 + ".";
    question.innerText = quizQuestions[index].question;
    option1.innerText = quizQuestions[index].a;
    option2.innerText = quizQuestions[index].b;
    option3.innerText = quizQuestions[index].c;
    option4.innerText = quizQuestions[index].d;
}
loadData();


choiceList.forEach((choices, selection) => {
    choices.addEventListener("click", () => {
        choices.classList.add("active");

        // answer validation
        if (selection === quizQuestions[index].answer) {
            correct.style.display = "block";
            score = timer;

            counters = score;
        } else {
            incorrect.style.display = "block";
            timer = timer - 10;
            score = timer;
            counters = score;
        }
        for (k = 0; k <= 3; k++) {
            choiceList[k].classList.add("disabled");
        }

    });

})



nextBtn.addEventListener("click", () => {

    if (index !== quizQuestions.length - 5) {
        correct.style.display = "none";
        incorrect.style.display = "none";
        index++;

        choiceList.forEach(removeActive => {
            removeActive.classList.remove("active");
        })
        loadData();
        for (i = 0; i <= 3; i++) {
            choiceList[i].classList.remove('disabled');
        }
    } else if (index === quizQuestions.length - 5) {
        resultsForm.style.display = "block";
        startQuiz.style.display = "none";
        countdownTimer.style.display = "none";
        finalScore.innerText = `${score}`;


    }
    console.log(score);
});


const storage = [];
const clearValue = () => {
    userInputs.value = '';
}
const updateUI = () => {
    resultsForm.style.display = "none";
    highScoreScreen.style.display = "block";

}



submitButton.addEventListener("click", () => {
    const userInputs = userInitials.value;
    if (userInputs.trim() === '') {
        alert('Please enter a value to see the Results');
        return;
    }
    const newScore = {
        user: userInputs,
        userScore: score,
    }
    storage.push(newScore);
    console.log(newScore);
    updateUI();
    renderScores = () => {
        scoreCounter.innerHTML = `${newScore.user}` + `${" "}` +
            `${newScore.userScore}`

    };
    renderScores();
});

// back button and clearing the Highscores Cache

backButton.addEventListener('click', () => {
    location.href = "";
});
clearScores.addEventListener('click', () => {
    scoreCounter.innerText = "";
})