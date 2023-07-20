const timerElement = document.getElementById('timer');
const timeValue = document.getElementById('time-value');
const questionElement = document.getElementById('question');
const answersContainer = document.getElementById('answers-container');
const triviaScore = document.getElementById('score-value');

let time = 150;
let score = 0;
let currentQuestionIndex = 0;

const questions = [
  { question: "Who is the only team to defeat the Celtics at Boston (Madison Square) Garden during the 1985-1986 season?", choices: ["Portland Trailblazers", "Chicago Bulls", "Philadelphia 76ers", "New York Knicks"], answer: 0 }, { question: "The first NBA game was played between the New York Knicks and the Toronto Huskies in what year?", choices: ["1934", "1927", "1946", "1949"], answer: 2 }, { question: "Which player has the most career blocks in the Finals?", choices: ["Bill Russell", "Wilt Chamberlain", "Kareem Abdul Jabbar", "Shaquille ONeal"], answer: 2 }, { question: "This player has the most turnovers in the Finals.", choices: ["Steph Curry", "LeBron James", "Michael Jordan", "Tony Parker"], answer: 1 }, { question: "What was the last team to be swept in the NBA finals?", choices: ["2017 Cavaliers", "2007 Cavaliers", "2018 Cavaliers", "2020 Heat"], answer: 2 }, { question: "Since 2010, which team has had the most winning seasons?", choices: ["Clippers", "Heat", "Warriors", "Celtics"], answer: 0 }, { question: "What coach was fired for having inappropriate relations with another staff member?", choices: ["Larry Brown", "Dwayne Casey", "Mark Jackson", "Ime Udoka"], answer: 3 }, { question: "What college has produced the most NBA players?", choices: ["Duke", "North Carolina", "Kansas", "Kentucky"], answer: 3 }, { question: "Who infamously won Finals MVP in 2015?", choices: ["Steph Curry", "Andre Iguodala", "Draymond Green", "Shaun Livingston"], answer: 1 }, { question: "What guard has scored the most points in the NBA finals?", choices: ["Jerry West", "Michael Jordan", "Steph Curry", "Kobe Bryant"], answer: 1 } ];

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function updateTimer() {
  timerElement.textContent = "Time Remaining: " + formatTime(time);
}

function startTimer() {
  updateTimer();
  const intervalId = setInterval(function () {
    time--;
    updateTimer();
    if (time <= 0) {
      clearInterval(intervalId);
      timerElement.textContent = "Time's up!";
      disableAnswering();
    }
  }, 1000);
}

function displayQuestion() {
  const question = questions[currentQuestionIndex];
  questionElement.textContent = question.question;

  answersContainer.innerHTML = ''; 

  question.choices.forEach((choice, index) => {
    const choiceButton = document.createElement('button');
    choiceButton.classList.add('choice');
    choiceButton.textContent = choice;
    choiceButton.addEventListener('click', function () {
      checkAnswer(index);
    });
    answersContainer.appendChild(choiceButton);
  });
}

function updateScore() {
  triviaScore.textContent = score;
}

function checkAnswer(selectedAnswerIndex) {
  const currentQuestion = questions[currentQuestionIndex];
  const correctAnswerIndex = currentQuestion.answer;

  if (selectedAnswerIndex === correctAnswerIndex) {
    score++;
    updateScore();
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    // Game Over
    questionElement.textContent = "Game Over!";
    disableAnswering();
    clearInterval(intervalId); // Stop the timer
  }
}

function disableAnswering() {
  document.querySelectorAll('.choice').forEach((choice) => {
    choice.style.pointerEvents = 'none';
  });
}

displayQuestion();
startTimer();

  


 