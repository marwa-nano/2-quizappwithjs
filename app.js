const quiz = document.querySelector(".question");
const qCount = document.querySelector(".qcount span");
const answerEls = document.querySelectorAll(".answers");


const answerA = document.getElementById("a-answer");
const answerB = document.getElementById("b-answer");
const answerC = document.getElementById("c-answer");
const answerD = document.getElementById("d-answer");

const submitBtn = document.querySelector(".submit-btn");
const quizApp = document.querySelector(".quiz-app-content")

let currentQuiz = 0;
let quizObj;
let score = 0;

getQuiz();

function getQuiz(){
    const quizRequest = new XMLHttpRequest();
    quizRequest.open('Get',"quizes.json");
    quizRequest.send();
    quizRequest.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200){
         quizObj = JSON.parse(quizRequest.responseText);
          const quizCount = quizObj.length;
          qCount.innerText  = quizCount;
          
          const currentQuizData = quizObj[currentQuiz]
          loadQuiz(currentQuizData);
        }
    }  
}

function loadQuiz(quizData){
    deselectAnswers();
    quiz.innerText = quizData.question;
    answerA.innerText = quizData.a;
    answerB.innerText = quizData.b;
    answerC.innerText = quizData.c;
    answerD.innerText = quizData.d;
}

function deselectAnswers(){
    
    answerEls.forEach((answerEl)=>{
        answerEl.checked = false;
    });
}

function getSelected(){
    let answer;
    answerEls.forEach((answerEl)=>{
        if(answerEl.checked){
            answer = answerEl.id
        }
    });
    return answer;

}

submitBtn.addEventListener("click",()=>{
    const answer = getSelected();

    if(answer){
        if(answer === quizObj[currentQuiz].correct){
            score++;
        }
        
        currentQuiz++ ;
        if(currentQuiz < quizObj.length){
            const nextQuizData = quizObj[currentQuiz];
            loadQuiz(nextQuizData);
        } else {
            submitBtn.remove();
            quizApp.innerHTML =
            `<h2>you answered  ${score} correctly from ${quizObj.length} questions. </h2>
            <button onclick="location.reload()">Reload</button>`;
            
        }
    }   
})