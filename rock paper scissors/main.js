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
    alert('Veuillez remplir tous les champs');
  }
};

const showFeedback = () => {
  document.getElementById('feedbackContainer').style.display = 'block';
};

const updateScore = (winner) => {
  if (winner === 'human') {
    humanScore++;
  } else if (winner === 'computer') {
    humanScore--;
  }else if (winner === 'draw') {
  }

  
  if (humanScore < 0) {
    humanScore = 0;
  }

  localStorage.setItem('humanScore', humanScore);
  document.getElementById('humanScore').innerText = humanScore;
  
  
  updateProgressBar();
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
    resultText = `IT'S A DRAW `;
    resultElement.classList.add('draw');
    playAgainButton.classList.add('draw');
    document.getElementById('humanVisualChoice').classList.add('glow');
    document.getElementById('computerVisualChoice').classList.add('glow');
  } else if (winner === 'human') {
    resultText = `YOU WIN `;
    resultElement.classList.add('win');
    playAgainButton.classList.add('win');
    document.getElementById('humanVisualChoice').classList.add('glow');
    document.querySelector(`.${humanChoice}`).classList.add('glow-effect');
  } else {
    resultText = `YOU LOSE`;
    resultElement.classList.add('lose');
    playAgainButton.classList.add('lose');
    document.getElementById('computerVisualChoice').classList.add('glow');
    document.querySelector(`.${computerChoice}`).classList.add('glow-effect');
  }

  resultElement.innerText = resultText;
  resultElement.style.display = 'block';
  updateStats(winner);
};

const resetResultText = () => {
  const resultElement = document.getElementById('result');
  resultElement.innerText = '';
  resultElement.style.display = 'none';
  document.getElementById('humanVisualChoice').classList.remove('glow');
  document.getElementById('computerVisualChoice').classList.remove('glow');
  document.getElementById('playAgainButton').classList.remove('win', 'lose', 'draw');
};

document.getElementById('playAgainButton').addEventListener('click', () => {
  resetResultText();
  document.getElementById('rockButton').disabled = false;
  document.getElementById('paperButton').disabled = false;
  document.getElementById('scissorsButton').disabled = false;
});

const showChoiceVisuals = (humanChoice, computerChoice) => {
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
};

const playGame = (humanChoice) => {
  document.getElementById('chooseText').style.display = 'none';
  document.querySelector('h2').style.display = 'none';

  const computerChoice = getComputerChoice();
  const winner = getWinner(humanChoice, computerChoice);

  displayResult(winner, humanChoice, computerChoice);
  showChoiceVisuals(humanChoice, computerChoice);

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
  

const closeRules = () => {
  document.getElementById('rulesContainer').style.display = 'none';
};

const showRules = () => {
  document.getElementById('rulesContainer').style.display = 'block';
}; 
