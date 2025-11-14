// Quiz questions
const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Hyperlinks and Text Markup Language", correct: false },
      { text: "Home Tool Markup Language", correct: false },
      { text: "Hyper Text Madeup Language", correct: false }
    ]
  },
  {
    question: "Which language is used for styling web pages?",
    answers: [
      { text: "HTML", correct: false },
      { text: "JQuery", correct: false },
      { text: "CSS", correct: true },
      { text: "XML", correct: false }
    ]
  },
  {
    question: "Which is not a JavaScript Framework?",
    answers: [
      { text: "React", correct: false },
      { text: "Angular", correct: false },
      { text: "Vue", correct: false },
      { text: "Django", correct: true }
    ]
  },
  {
    question: "Which language runs in a web browser?",
    answers: [
      { text: "Python", correct: false },
      { text: "C", correct: false },
      { text: "Java", correct: false },
      { text: "JavaScript", correct: true }
    ]
  }
];

// Select elements
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

// Start quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

// Show question
function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerHTML = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    button.addEventListener("click", () => selectAnswer(answer, button));
  });
}

// Reset previous answers
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

// Handle answer selection
function selectAnswer(answer, button) {
  const correct = answer.correct;
  if (correct) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("incorrect");
  }

  // Disable all buttons after answering
  Array.from(answerButtons.children).forEach(btn => {
    btn.disabled = true;
    const correctAnswer = questions[currentQuestionIndex].answers.find(a => a.correct);
    if (btn.innerText === correctAnswer.text) {
      btn.classList.add("correct");
    }
  });

  nextButton.style.display = "block";
}

// Show score at the end
function showScore() {
  resetState();
  questionElement.innerHTML = `🎉 You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

// Handle next button
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

// Next button click
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

// Start the quiz when page loads
startQuiz();
