
let questions = JSON.parse(sessionStorage.getItem("storedAnswers"));
let userInfo = JSON.parse(sessionStorage.getItem("userse"));
let time = JSON.parse(localStorage.getItem("quizTime"));

let num=1;
function renderUserNameAndLogOut() {
  const userName = userInfo.username;
  const ul = document.getElementById("ul");

  const listItem2 = document.createElement("li");
  const listItem1 = document.createElement("li");
  const link2 = document.createElement("a");
  const link1 = document.createElement("a");
  link2.textContent = "Log Out";
  link1.textContent = userName;
  link2.addEventListener("click", () => {
    window.location.href = "index.html";
    sessionStorage.clear();
  });
  listItem2.appendChild(link1);
  listItem2.appendChild(link2);
  ul.appendChild(listItem2);
  
}
if (userInfo) {
  renderUserNameAndLogOut();
}

function secondsToMinutesAndSeconds(seconds) {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;
  let result = minutes.toString().padStart(2, '0') + ':' + remainingSeconds.toString().padStart(2, '0');
  return result;
}


let time3=Math.abs(time-660)
let timem=secondsToMinutesAndSeconds(time3);

console.log(userInfo);
function getExamTypeFromLocalStorage() {
    const userData = JSON.parse(sessionStorage.getItem("userse"));
    const position = userData.position;
  
    let examType;
    switch (position) {
      case "2":
        examType = "HTML";
        break;
      case "3":
        examType = "CSS";
        break;
      case "4":
        examType = "JS";
        break;
      default:
        console.log("Invalid position value.");
    }
  
    return examType;
  }









function numberToWords(num) {
    const words = [
      "",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten"
    ];
  
    return words[num];
  }

let correctAnswers = 0;
let incorrectAnswers = 0;

questions.forEach((arr) => {
  if (arr.userAnswer === arr.correctAnswer) {
    correctAnswers++;
  } else {
    incorrectAnswers++;
  }
});
const username = userInfo.username;
let constspercentage = (correctAnswers / questions.length) * 100;
console.log(`${constspercentage}%`);
const card = document.getElementById("cards")
function renderCard(){
    const info = document.getElementById("cardbody");
  

   info.innerHTML=`
   <h2 class="card-title">${username}</h2> 
   <h4 class="card-text">Percentage: ${constspercentage}%  </h4>
  <h4 class="card-text"> Correct answers: ${correctAnswers}</h4>
  <h4 class="card-text"> Incorrect answers: ${incorrectAnswers}</h4>
  <h4 class="card-text"> Exam type: ${getExamTypeFromLocalStorage()}</h4>
  <h4 class="card-text"> Time quiz: ${timem}</h4>

    `;
    info.style.backgroundImage = correctAnswers >= 5 ? `linear-gradient(green, white)` :  `linear-gradient(red, rgb(216, 87, 87))` 
    ;
    info.style.color = 'white' ;
    
    card.appendChild(info);}

renderCard();





const questionsContainer = document.getElementById("accordionExample");
function renderaccordion(){
questions.forEach((question) => {
    num++;
  const questionDiv = document.createElement("div");
  if (question.correctAnswer===question.userAnswer){
  questionDiv.innerHTML = `
  <h2 class="accordion-header " id="headingOne">
  <button class="accordion-button rounded-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${numberToWords(num)}" aria-expanded="true" aria-controls="collapse${numberToWords(num)}">
  <h6> ${num-1}- Question: ${question.question}</h6>
  </button>
    </h2>
<div id="collapse${numberToWords(num)}" class="accordion-collapse collapse show" aria-labelledby="heading${numberToWords(num)}" data-bs-parent="#accordionExample">
  <div class="accordion-body">
  <h6 class ="bg-light rounded-5 text-success"> Correct Answer: ${question.correctAnswer}</h6>
  <br>
  <h6 class ="bg-success rounded-5" >User Answer: ${question.userAnswer} </h6>
  </div>
</div>
    `;} else{
        questionDiv.innerHTML = `
  <h2 class="accordion-header text" id="headingOne ">
  <button class="accordion-button rounded-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${numberToWords(num)}" aria-expanded="true" aria-controls="collapse${numberToWords(num)}">
  <h6 ="bg-success rounded-5"> ${num-1}- Question: ${question.question}</h6>
  </button>
    </h2>
<div id="collapse${numberToWords(num)}" class="accordion-collapse collapse show" aria-labelledby="heading${numberToWords(num)}" data-bs-parent="#accordionExample">
  <div class="accordion-body">
  <h6 class ="bg-light rounded-5 text-success"> Correct Answer: ${question.correctAnswer}</h6>
  <br>
  <h6 class ="bg-danger rounded-5 " >User Answer: ${question.userAnswer} </h6>
  </div>
</div>
    `;
    }
  questionsContainer.appendChild(questionDiv);
});};
window.onload = function () {
    // renderherosection(); 
    renderaccordion();
  };
