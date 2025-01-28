
function playRound(humanChoice, computerChoice) {
    humanChoice = humanChoice.toLowerCase();
    let resultText = `You chose: ${humanChoice}<br>Computer chose: ${computerChoice}<br>`;
  
    if (humanChoice === computerChoice) {
      resultText += "It's a tie!";
    } else if (
      (humanChoice === "rock" && computerChoice === "scissors") ||
      (humanChoice === "paper" && computerChoice === "rock") ||
      (humanChoice === "scissors" && computerChoice === "paper")
    ) {
      resultText += `You won! ${humanChoice.charAt(0).toUpperCase() + humanChoice.slice(1)} beats ${computerChoice}.`;
      humanScore++;
      document.getElementById("result").classList.add("win-animation");
    } else {
      resultText += `You lost! ${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)} beats ${humanChoice}.`;
      computerScore++;
    }
  
    document.getElementById("humanScore").innerText = humanScore;
    document.getElementById("computerScore").innerText = computerScore;
  
    document.getElementById("result").innerHTML = resultText;
  
    setTimeout(() => {
      document.getElementById("result").classList.remove("win-animation");
    }, 1000); 
  }