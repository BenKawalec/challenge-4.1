var questions = [
  { 
    question: 'Commonly used data types DO not include', 
    answer: 'd', 
    choiceA: '1. numbers',
    choiceB: '2. booleans',
    choiceC: '3. strings',
    choiceD: '4. alerts'
  },
  {
    question: 'The condition in an if / else statement is enclosed with _____.', 
    answer: 'c', 
    choiceA: '1. quotes',
    choiceB: '2. curley brackets',
    choiceC: '3. parenthesis',
    choiceD: '4. square brackets'
  },
  {
    question: 'Arrays in JavaScript can be used to store ______.', 
    answer: 'd', 
    choiceA: '1. numbers and strings',
    choiceB: '2. other arrays',
    choiceC: '3. booleans',
    choiceD: '4. all of the above'
  },
  { 
    question: 'String values must be enclosed within ____ when being assigned to variables', 
    answer: 'c', 
    choiceA: '1. commas',
    choiceB: '2. curly brackets',
    choiceC: '3. quotes',
    choiceD: '4. parethesis',
  },
  { 
    question: 'A very useful tool used during development and debugging for printing content and debugging for printing content to the debugger is:', 
    answer: 'd', 
    choiceA: '1. JavaScript',
    choiceB: '2. terminal/bash',
    choiceC: '3. for loops',
    choiceD: '4. console.log'
  }
];


const startBtn = document.querySelector('#start-btn')
const questionContainerElement = document.querySelector('#question-container')
const questionElement = document.querySelector('#question')
const answerButtonElement = document.querySelector('#answer-buttons')
const nextButton = document.querySelector('#next-btn')
const scoreText = document.querySelector('#high-score-list')
const endScreen = document.querySelector('#end-screen')
const highScoreContainer = document.querySelector('#high-scores')
const highScoreButton = document.querySelector('#high-score-button')
const goBackBtn = document.querySelector('#go-back')
const clearScoreBtn = document.querySelector('#clear-high-scores')
const scoreSubmit = document.querySelector('#submit-score')
const scoreDisplay = document.querySelector('#score-display')
const highscoreInputName = document.getElementById("initials");
const highscoreDisplayName = document.querySelector('#high-score-initals')
const highscoreDisplayScore = document.querySelector('#user-score')
const userScore = document.querySelector('#user-score')
const intro = document.querySelector('#intro')

let finalQuestionIndex = questions.length
let totalTime = 75
let score = 0

const buttonA = document.querySelector("#a");
const buttonB = document.querySelector("#b");
const buttonC = document.querySelector("#c");
const buttonD = document.querySelector("#d");

let shuffledQuestions, currentQuestionIndex

startBtn.addEventListener('click', startGame)


function startGame() {
    intro.classList.add('hide')
    startBtn.classList.add('hide')
    questionContainerElement.classList.remove('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    displayQuestion(shuffledQuestions[currentQuestionIndex])
    timer()
}


function displayQuestion() { 
  if (currentQuestionIndex === finalQuestionIndex){
    return showScore();
    } 
    var currentQuestion = shuffledQuestions[currentQuestionIndex];
    questionElement.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
  
    };

function checkAnswer(answer){
  correct = questions[currentQuestionIndex].answer;

  if (answer === correct){
      score++
      console.log(score)
      alert("That Is Correct!");
      currentQuestionIndex++;
      displayQuestion();
  }else if (answer !== correct){
      alert("That Is Incorrect.")
      currentQuestionIndex++;
      displayQuestion();
  }else{
      showScore();
  }
};

highScoreButton.addEventListener('click', showHighScores)

function showHighScores(){
  highScoreContainer.classList.remove('hide')
  timeLeft.classList.add('hide')
  startBtn.classList.add('hide')
  highScoreButton.classList.add('hide')
  questionContainerElement.classList.add('hide')
  endScreen.classList.add('hide')
  intro.classList.add('hide')
  highScoreSave()
};

var showScore = function () {
  questionContainerElement.classList.add("hide");
  endScreen.classList.remove("hide");

  
  scoreDisplay.textContent = (`Your final score is ${score * 10}!`);

};       

function timer() {
  timerInterval = setInterval(function() {
    totalTime--;
    timeLeft.textContent = `Time left: ${totalTime}`;

    if(totalTime === 0) {
      clearInterval(timerInterval);
      showScore();
    }
  }, 1000);
};

goBackBtn.addEventListener('click', startPage)

function startPage() {
  highScoreContainer.classList.add('hide')
  startBtn.classList.remove('hide')
  highScoreButton.classList.remove('hide')
  timeLeft.classList.remove('hide')
  intro.classList.remove('hide')
};

function highScoreSave() {
  highscoreDisplayName.innerHTML = "";
  userScore.innerHTML = "";
  var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
  for (i=0; i<highscores.length; i++){
    var newNameSpan = document.createElement("li");
    var newScoreSpan = document.createElement("li");
    newNameSpan.textContent = `Name: ${highscores[i].name} `;
    newScoreSpan.textContent = `  Score: ${highscores[i].score}`;
    highscoreDisplayName.appendChild(newNameSpan);
    highscoreDisplayScore.appendChild(newScoreSpan);
}};


scoreSubmit.addEventListener('click', function highscore(){
    
  if(highscoreInputName.value === "") {
      alert("Initials cannot be blank");
      return false;
  }else{
      var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
      var currentUser = highscoreInputName.value.trim();
      var currentHighscore = {
          name : currentUser,
          score : score
      };
   
      savedHighscores.push(currentHighscore);
      localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
      highScoreSave();

  }
});

clearScoreBtn.addEventListener('click', 
function clearScore(){
  window.localStorage.clear();
  highscoreDisplayName.textContent = "";
  highscoreDisplayScore.textContent = "";
})