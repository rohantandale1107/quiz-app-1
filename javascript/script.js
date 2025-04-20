const configContainer= document.querySelector(".config-container")
const quizContainer = document.querySelector(".quiz-container");
const answerOptions = document.querySelector(".answer-options");
const nextQuestionBtn = document.querySelector(".next-question-btn");
const questionStatus = document.querySelector(".question-status");
const timerDisplay = document.querySelector(".time-duration");
const resultContainer= document.querySelector(".result-container")

const QUIZ_TIME_LIMIT = 15;
let currentTime = QUIZ_TIME_LIMIT;
let timer = null;
let quizCategory = "programming";
let numberOfQuestions = 10;
let currentQuestion = null;
const questionsIndexHistory = [];
let correctAnswerCount=0;

const showQuizResult =()=>{
    quizContainer.style.display="none";
    resultContainer.style.display="block";

    const resultText=`You answered <b>${correctAnswerCount}</b> out of <b>${numberOfQuestions}</b> questions correctly. Great effort!`
    document.querySelector(".result-message").innerHTML=resultText;
}

const resetTimer = () => {
  clearInterval(timer);
  currentTime = QUIZ_TIME_LIMIT;
  timerDisplay.textContent = `${currentTime}s`;
};

const startTimer = () => {
  timer = setInterval(() => {
    currentTime--;
    timerDisplay.textContent = `${currentTime}s`;

    if (currentTime < 0) {
      clearInterval(timer);
      highlightCorrrectAnswer();
      nextQuestionBtn.style.visibility = "visible";

      answerOptions
        .querySelectorAll(".answer-option")
        .forEach((option) => (option.style.pointerEvents = "none"));
    }
  }, 1000);
};

const getRandomQuestion = () => {
  const categoryQuestions =
    questions.find(
      (cat) => cat.category.toLowerCase() === quizCategory.toLowerCase()
    ).questions || [];

  if (
    questionsIndexHistory.length >=
    Math.min(categoryQuestions.length, numberOfQuestions)
  ) {
    return showQuizResult();
  }

  const availableQuestions = categoryQuestions.filter(
    (_, index) => !questionsIndexHistory.includes(index)
  );
  const randomQuestion =
    availableQuestions[Math.floor(Math.random() * categoryQuestions.length)];

  questionsIndexHistory.push(categoryQuestions.indexOf(randomQuestion));
  return randomQuestion;
};
const highlightCorrrectAnswer = () => {
  const correctOption =
    answerOptions.querySelectorAll(".answer-option")[
      currentQuestion.correctAnswer
    ];
  correctOption.classList.add("correct");
  const iconHTML = `<span class="material-symbols-outlined">check_circle</span>`;
  correctOption.insertAdjacentHTML("beforeend", iconHTML);
};

const handleAnswer = (option, answerIndex) => {
  clearInterval(timer);
  const isCorrect = currentQuestion.correctAnswer === answerIndex;
  option.classList.add(isCorrect ? "correct" : "incorrect");

  !isCorrect ? highlightCorrrectAnswer() : correctAnswerCount++;

  const iconHTML = `<span class="material-symbols-outlined">${
    isCorrect ? "check_circle" : "cancel"
  }</span>`;
  option.insertAdjacentHTML("beforeend", iconHTML);

  answerOptions
    .querySelectorAll(".answer-option")
    .forEach((option) => (option.style.pointerEvents = "none"));
  nextQuestionBtn.style.visibility = "visible";
};

const renderQuestion = () => {
  currentQuestion = getRandomQuestion();
  if (!currentQuestion) return;
  console.log(currentQuestion);

  resetTimer();
  startTimer();

  answerOptions.innerHTML = "";
  nextQuestionBtn.style.visibility = "hidden";
  document.querySelector(".question-text").textContent =
    currentQuestion.question;
  questionStatus.innerHTML = `<b>${questionsIndexHistory.length}</b> of <b>${numberOfQuestions}</b> Questions`;

  currentQuestion.options.forEach((option, index) => {
    const li = document.createElement("li");
    li.classList.add("answer-option");
    li.textContent = option;
    answerOptions.appendChild(li);
    li.addEventListener("click", () => handleAnswer(li, index));
  });
};

const resetQuiz=()=>{
    resetTimer();
    correctAnswerCount=0;
    questionsIndexHistory.length=0;
    configContainer.style.display="block";
    resultContainer.style.display="none";
}

renderQuestion();

nextQuestionBtn.addEventListener("click", renderQuestion);
document.querySelector(".try-again-btn").addEventListener("click", resetQuiz);
