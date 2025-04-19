const answerOptions= document.querySelector(".answer-options");
let quizCategory= "programming";


const getRandomQuestion = ()=>{
    const categoryQuestions= questions.find(cat=>cat.category.toLowerCase()===quizCategory.toLowerCase()).questions || [];

    const randomQuestion = categoryQuestions[Math.floor(Math.random()*categoryQuestions.length)];
    return randomQuestion;
    
}

const renderQuestion =()=>{
    const currentQuestion= getRandomQuestion();
    if(!currentQuestion) return;
    console.log(currentQuestion);
    
    answerOptions.innerHTML="";
    document.querySelector(".question-text").textContent= currentQuestion.question;

    currentQuestion.options.forEach(option=>{
        const li= document.createElement("li");
        li.classList.add("answer-option");
        li.textContent= option;
        answerOptions.appendChild(li);
    })
}
renderQuestion();

