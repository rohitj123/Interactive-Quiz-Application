const questions = [
  {
    question:
      "Which of the following is a correct syntax to display “Hello World” in an alert box using JavaScript?",
    answers: [
      { text: "alertBox('Hello World');", correct: false },
      { text: "alert('Hello World');", correct: true },
      { text: "msgAlert('Hello World');", correct: false },
      { text: "displayAlert('Hello World');", correct: false },
    ],
  },
  {
    question:
      "Which keyword is used for declaring a variable in JavaScript that can be reassigned?",
    answers: [
      { text: "const", correct: false },
      { text: "var", correct: false },
      { text: "let", correct: true },
      { text: "static", correct: false },
    ],
  },
  {
    question:
      "Which data type in JavaScript is used to represent logical values?",
    answers: [
      { text: "String", correct: false },
      { text: "Boolean", correct: true },
      { text: "Number", correct: false },
      { text: "Undefined", correct: false },
    ],
  },
  {
    question: "What does the if statement in JavaScript do?",
    answers: [
      { text: "Declares a variable", correct: false },
      { text: "Prints a message to the console", correct: false },
      { text: "Executes a block of code based on a condition", correct: true },
      { text: "Loops through a block of code", correct: false },
    ],
  },
  {
    question: "Which of the following is not a loop structure in JavaScript?",
    answers: [
      { text: "while", correct: false },
      { text: "for", correct: false },
      { text: "if", correct: true },
      { text: "do-while", correct: false },
    ],
  },
  {
    question:
      "In a switch statement, what keyword is used to terminate a case in JavaScript?",
    answers: [
      { text: "end", correct: false },
      { text: "break", correct: true },
      { text: "stop", correct: false },
      { text: "exit", correct: false },
    ],
  },
  {
    question: "What is the purpose of a function in JavaScript?",
    answers: [
      {
        text: "To encapsulate code that performs a specific task",
        correct: true,
      },
      { text: "To store data", correct: false },
      { text: "To repeat a task multiple times", correct: false },
      { text: "To create web pages", correct: false },
    ],
  },
  {
    question: "How do you find the length of an array in JavaScript?",
    answers: [
      { text: "array.size()", correct: false },
      { text: "array.count()", correct: false },
      { text: "length(array)", correct: false },
      { text: "array.length", correct: true },
    ],
  },
  {
    question: "In JavaScript, what is a method?",
    answers: [
      { text: "A predefined function", correct: false },
      { text: "A loop inside an object", correct: false },
      { text: "A function stored as an object property", correct: true },
      { text: "An external library function", correct: false },
    ],
  },
  {
    question: "What does DOM stand for in web development?",
    answers: [
      { text: "Document Object Model", correct: true },
      { text: "Data Object Management", correct: false },
      { text: "Direct Object Manipulation", correct: false },
      { text: "Display Object Model", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();

  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();
