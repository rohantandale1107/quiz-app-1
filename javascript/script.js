const answerOptions= document.querySelector(".answer-options");
const nextQuestionBtn= document.querySelector(".next-question-btn");
let quizCategory= "programming";
let currentQuestion= null


const getRandomQuestion = ()=>{
    const categoryQuestions= questions.find(cat=>cat.category.toLowerCase()===quizCategory.toLowerCase()).questions || [];

    const randomQuestion = categoryQuestions[Math.floor(Math.random()*categoryQuestions.length)];
    return randomQuestion;
    
}
const highlightCorrrectAnswer =()=>{
    const correctOption = answerOptions.querySelectorAll(".answer-option")[currentQuestion.correctAnswer];
    correctOption.classList.add("correct");
}

const handleAnswer = (option,answerIndex)=>{
    const isCorrect= currentQuestion.correctAnswer===answerIndex;
    option.classList.add(isCorrect? 'correct':'incorrect');

    !isCorrect? highlightCorrrectAnswer():"";

    answerOptions.querySelectorAll(".answer-option").forEach(option=> option.style.pointerEvents="none");
}

const renderQuestion =()=>{
     currentQuestion= getRandomQuestion();
    if(!currentQuestion) return;
    console.log(currentQuestion);
    
    answerOptions.innerHTML="";
    document.querySelector(".question-text").textContent= currentQuestion.question;

    currentQuestion.options.forEach(( option,index)=>{
        const li= document.createElement("li");
        li.classList.add("answer-option");
        li.textContent= option;
        answerOptions.appendChild(li);
        li.addEventListener("click",()=> handleAnswer(li,index));
    })
}
renderQuestion();

nextQuestionBtn.addEventListener("click",renderQuestion);

