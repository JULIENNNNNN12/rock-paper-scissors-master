let humanScore = localStorage.getItem('humanScore') ? parseInt(localStorage.getItem('humanScore')) : 0;

let gameStats = JSON.parse(localStorage.getItem('gameStats')) || {
  wins: 0,
  losses: 0,
  draws: 0,
};

document.getElementById('humanScore').innerText = humanScore;

const updateProgressBar = () => {
  const progressBar = document.getElementById('progressBar');
  progressBar.value = humanScore;
};

updateProgressBar();

const updateStats = (result) => {
  if (result === 'human') {
    gameStats.wins++;
  } else if (result === 'computer') {
    gameStats.losses++;
  } else if (result === 'draw') {
    gameStats.draws++;
  }
  localStorage.setItem('gameStats', JSON.stringify(gameStats));
  document.getElementById('wins').innerText = gameStats.wins;
  document.getElementById('losses').innerText = gameStats.losses;
  document.getElementById('draws').innerText = gameStats.draws;
};

const getComputerChoice = () => {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
};

const getWinner = (humanChoice, computerChoice) => {
  if (humanChoice === computerChoice) {
    return 'draw';
  } else if (
    (humanChoice === 'rock' && computerChoice === 'scissors') ||
    (humanChoice === 'scissors' && computerChoice === 'paper') ||
    (humanChoice === 'paper' && computerChoice === 'rock')
  ) {
    return 'human';
  } else {
    return 'computer';
  }
};

const submitFeedback = () => {
  const rating = document.getElementById('rating').value;
  const comment = document.getElementById('comment').value;

  if (rating && comment) {
    const feedback = { rating, comment };
    localStorage.setItem('gameFeedback', JSON.stringify(feedback));
    alert('Merci pour votre retour !');
    document.getElementById('feedbackContainer').style.display = 'none';
  } else {
    alert('Write something');
  }
};

function showFeedback() {
  var feedbackContainer = document.getElementById('feedbackContainer');
  feedbackContainer.style.display = 'flex';
  setTimeout(function() {
    feedbackContainer.classList.add('show');
  }, 10);
}

function closeFeedback() {
  var feedbackContainer = document.getElementById('feedbackContainer');
  feedbackContainer.classList.remove('show');
  setTimeout(function() {
    feedbackContainer.style.display = 'none';
  }, );
}


const updateScore = (winner) => {
 
  const scoreElement = document.getElementById('humanScore');
  

  scoreElement.classList.add('bounce');
  
  setTimeout(() => {
    if (winner === 'human') {
      humanScore++;
    } else if (winner === 'computer') {
      humanScore--;
    }
    
    localStorage.setItem('humanScore', humanScore);
    document.getElementById('humanScore').innerText = humanScore;
    updateProgressBar()
    
   
    updateProgressBar();
  }, 300); 
};

const displayResult = (winner, humanChoice, computerChoice) => {
  let resultText = '';
  const resultElement = document.getElementById('result');
  const playAgainButton = document.getElementById('playAgainButton');

  document.querySelectorAll('.buttons-container button').forEach(button => {
    button.classList.remove('glow-effect');
  });

  resultElement.classList.remove('win', 'lose', 'draw');
  document.getElementById('humanVisualChoice').classList.remove('glow');
  document.getElementById('computerVisualChoice').classList.remove('glow');
  playAgainButton.classList.remove('win', 'lose', 'draw');

  if (winner === 'draw') {
    resultText = `IT'S A DRAW`;
    resultElement.classList.add('draw');
    playAgainButton.classList.add('draw');
  } else if (winner === 'human') {
    resultText = `YOU WIN`;
    resultElement.classList.add('win');
    playAgainButton.classList.add('win');
    document.getElementById('humanVisualChoice').classList.add('glow-effect');
  } else {
    resultText = `YOU LOSE`;
    resultElement.classList.add('lose');
    playAgainButton.classList.add('lose');
    document.getElementById('computerVisualChoice').classList.add('glow-effect');
  }

  resultElement.innerText = resultText;
  resultElement.style.display = 'block';
  updateStats(winner);
};

const resetResultText = () => {
  const resultElement = document.getElementById('result');
  resultElement.innerText = '';
  resultElement.style.display = 'none';
  document.getElementById('humanVisualChoice').classList.remove('glow-effect');
  document.getElementById('computerVisualChoice').classList.remove('glow-effect');
  document.getElementById('playAgainButton').classList.remove('win', 'lose', 'draw');
};

document.getElementById('playAgainButton').addEventListener('click', () => {
  resetResultText();
  document.querySelector('.buttons-container').style.display = 'block';
  document.querySelector('.choices-container').style.display = 'none';
});

const showChoiceVisuals = (humanChoice, computerChoice, winner) => {
  const humanVisualChoice = document.getElementById('humanVisualChoice');
  const computerVisualChoice = document.getElementById('computerVisualChoice');

  humanVisualChoice.className = 'choice-btn';
  computerVisualChoice.className = 'choice-btn';

  const humanChoiceIcon = document.createElement('img');
  const computerChoiceIcon = document.createElement('img');

  if (humanChoice === 'rock') {
    humanVisualChoice.classList.add('choice-rock');
    humanChoiceIcon.src = 'images/icon-rock.svg';
  } else if (humanChoice === 'paper') {
    humanVisualChoice.classList.add('choice-paper');
    humanChoiceIcon.src = 'images/icon-paper.svg';
  } else if (humanChoice === 'scissors') {
    humanVisualChoice.classList.add('choice-scissors');
    humanChoiceIcon.src = 'images/icon-scissors.svg';
  }

  if (computerChoice === 'rock') {
    computerVisualChoice.classList.add('choice-rock');
    computerChoiceIcon.src = 'images/icon-rock.svg';
  } else if (computerChoice === 'paper') {
    computerVisualChoice.classList.add('choice-paper');
    computerChoiceIcon.src = 'images/icon-paper.svg';
  } else if (computerChoice === 'scissors') {
    computerVisualChoice.classList.add('choice-scissors');
    computerChoiceIcon.src = 'images/icon-scissors.svg';
  }

  humanVisualChoice.innerHTML = '';
  humanVisualChoice.appendChild(humanChoiceIcon);

  computerVisualChoice.innerHTML = '';
  computerVisualChoice.appendChild(computerChoiceIcon);

  if (winner === 'human') {
    humanVisualChoice.classList.add('winner-choice', 'glow-effect');
  } else if (winner === 'computer') {
    computerVisualChoice.classList.add('winner-choice', 'glow-effect');
  }
};

const playGame = (humanChoice) => {
  document.getElementById('chooseText').style.display = 'none';
  document.querySelector('h2').style.display = 'none';

  const computerChoice = getComputerChoice();
  const winner = getWinner(humanChoice, computerChoice);

  displayResult(winner, humanChoice, computerChoice);
  showChoiceVisuals(humanChoice, computerChoice, winner);

  updateScore(winner);

  
  document.querySelectorAll('.buttons-container button').forEach(button => {
    button.classList.remove('winner');
  });

  if (winner === 'human') {
    document.querySelector(`.${humanChoice}`).classList.add('winner');
  } else if (winner === 'computer') {
    document.querySelector(`.${computerChoice}`).classList.add('winner');
  }

  document.querySelector('.buttons-container').style.display = 'none';
  document.querySelector('.choices-container').style.display = 'block';

  document.getElementById('playAgainButton').style.display = 'inline-block';
  document.getElementById('resetButton').style.display = 'inline-block';
};

const playAgain = () => {
  document.querySelector('.buttons-container').style.display = 'block';
  document.querySelector('.choices-container').style.display = 'none';
  document.getElementById('chooseText').style.display = 'block';
  document.querySelector('h2').style.display = 'block';
  document.getElementById('playAgainButton').style.display = 'none';
};

const resetGame = () => {
  humanScore = 0;
  document.getElementById('humanScore').innerText = humanScore;

  gameStats = {
    wins: 0,
    losses: 0,
    draws: 0,
  };
  localStorage.setItem('gameStats', JSON.stringify(gameStats));

  document.getElementById('wins').innerText = gameStats.wins;
  document.getElementById('losses').innerText = gameStats.losses;
  document.getElementById('draws').innerText = gameStats.draws;

  document.querySelector('.buttons-container').style.display = 'block';
  document.querySelector('.choices-container').style.display = 'none';
  document.getElementById('chooseText').style.display = 'block';
  document.querySelector('h2').style.display = 'block';
  document.getElementById('resetButton').style.display = 'none';

  localStorage.removeItem('humanScore');
};

function showRules() {
  const rulesContainer = document.getElementById('rulesContainer');
  rulesContainer.style.display = 'block'; 
  setTimeout(() => {
    rulesContainer.classList.add('show');  
  }, 10); 
}

function closeRules() {
  const rulesContainer = document.getElementById('rulesContainer');
  rulesContainer.classList.remove('show');  
  setTimeout(() => {
    rulesContainer.style.display = 'none'; 
  }, 800);  
}
