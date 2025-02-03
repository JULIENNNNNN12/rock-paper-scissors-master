const showRulesBtn = document.getElementById('showRulesBtn');
const rulesContainer = document.getElementById('rulesContainer');

showRulesBtn.addEventListener('click', function() {
  if (rulesContainer.style.display === 'none') {
    rulesContainer.style.display = 'block';
  } else {
    rulesContainer.style.display = 'none';
  }
}) 




let score = localStorage.getItem('score') ? parseInt(localStorage.getItem('score')) : 0;


const scoreElement = document.getElementById('scoreValue');
scoreElement.textContent = score;


function updateScore(result) {
    if (result === 'win') {
        score++;
    } else if (result === 'lose') {
        score--;
    }

    
    scoreElement.textContent = score;

    
    localStorage.setItem('score', score);
}

function playGame(playerChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    let result = '';

    if (playerChoice === computerChoice) {
        result = 'draw';
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        result = 'win';
    } else {
        result = 'lose';
    }

    
    const resultElement = document.getElementById('result');
    resultElement.textContent = `Vous avez ${result} contre l'ordinateur`;

    
    updateScore(result);
}

document.getElementById('rockBtn').addEventListener('click', function() {
    playGame('rock');
});

document.getElementById('paperBtn').addEventListener('click', function() {
    playGame('paper');
});

document.getElementById('scissorsBtn').addEventListener('click', function() {
    playGame('scissors');
});
