// DOM
const btnRules = document.querySelector('.rules-btn');
const btnClose = document.querySelector('.close-btn');
const modalRules = document.querySelector('.modal');

const CHOICES = [
  {
    name: 'paper',
    beats: 'rock',
  },
  {
    name: 'scissors',
    beats: 'paper',
  },
  {
    name: 'rock',
    beats: 'scissors',
  },
];
const choiceButtons = document.querySelectorAll('.choice-btn');
const gameDiv = document.querySelector('.game');
const resultsDiv = document.querySelector('.results');
const resultDivs = document.querySelectorAll('.results__result');

const resultWinner = document.querySelector('.results__winner');
const resultText = document.querySelector('.results__text');

const playAgainBtn = document.querySelector('.play-again');

const scoreNumber = document.querySelector('.score__number');


let score = 0;

// Game Logic
choiceButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Load the scores from local storage if they exist
    const storedUserScore = localStorage.getItem('userScore');
    const storedHouseScore = localStorage.getItem('houseScore');
    if (storedUserScore) score = parseInt(storedUserScore);
    if (storedHouseScore) document.querySelector('.score.ai-score .score__number').innerText = storedHouseScore;

    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  });
});

function choose(choice) {
  const aichoice = aiChoose();
  displayResults([choice, aichoice]);
  displayWinner([choice, aichoice]);
}

function aiChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}

function displayResults(results) {
  resultDivs.forEach((resultDiv, idx) => {
    setTimeout(() => {
      resultDiv.innerHTML = `
        <div class="choice ${results[idx].name}">
          <img src="images/icon-${results[idx].name}.svg" alt="${results[idx].name}" />
        </div>
      `;
    }, idx * 1000);
  });

  gameDiv.classList.toggle('hidden');
  resultsDiv.classList.toggle('hidden');
}

function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const aiWins = isWinner(results.reverse());

    if (userWins) {
      resultText.innerText = 'you win';
      resultDivs[0].classList.toggle('winner');
      keepScore(1);
    } else if (aiWins) {
      resultText.innerText = 'you lose';
      resultDivs[1].classList.toggle('winner');
      keepScore(-1);
    } else {
      resultText.innerText = 'draw';
    }
    resultWinner.classList.toggle('hidden');
    resultsDiv.classList.toggle('show-winner');
  }, 1000);
}

function isWinner(results) {
  return results[0].beats === results[1].name;
}

function keepScore(point) {
  const houseScoreNumber = document.querySelector('.score.ai-score .score__number');

  if (point > 0) {
    // User wins
    score += point;
  } else if (point < 0) {
    // Computer (House) wins
    houseScoreNumber.innerText = parseInt(houseScoreNumber.innerText) + 1; // Update the house score
  }
  scoreNumber.innerText = score; // Update the user score

  // Save the scores to local storage
  localStorage.setItem('userScore', score);
  localStorage.setItem('houseScore', parseInt(houseScoreNumber.innerText));

  // Check if the sum of the scores is equal to 5
  if (score + parseInt(houseScoreNumber.innerText) === 5) {
    // Display the message
    const message = score > parseInt(houseScoreNumber.innerText) ? "Hurray, you won the game!" : "Better luck next time!";
    alert(message);

    // Reset the scores
    score = 0;
    houseScoreNumber.innerText = 0;
    scoreNumber.innerText = score;

    // Remove the scores from local storage
    localStorage.removeItem('userScore');
    localStorage.removeItem('houseScore');

    // Redirect to the desired page based on the scores
    setTimeout(() => {
      if (score < parseInt(houseScoreNumber.innerText)) {
        window.location.href = 'BLNT.html';
      } else {
        window.location.href = 'hurray.html';
      }
    }, 100);
  }
}

// Play Again
playAgainBtn.addEventListener('click', () => {
  gameDiv.classList.toggle('hidden');
  resultsDiv.classList.toggle('hidden');

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = '';
    resultDiv.classList.remove('winner');
  });

  resultText.innerText = '';
  resultWinner.classList.toggle('hidden');
  resultsDiv.classList.toggle('show-winner');
});

// Show/Hide Rules
btnRules.addEventListener('click', () => {
  modalRules.classList.toggle('show-modal');
});
btnClose.addEventListener('click', () => {
  modalRules.classList.toggle('show-modal');
});

// Prevent animation on load
setTimeout(() => {
  document.body.classList.remove('preload');
}, 500);






const newGameBtn = document.querySelector('.new-game-btn');

newGameBtn.addEventListener('click', () => {
  // Reset the score variable
  score = 0;

  // Reset the scores on the page
  document.querySelector('.score .score__number').innerText = score;
  document.querySelector('.score.ai-score .score__number').innerText = 0;

  // Remove the scores from local storage
  localStorage.removeItem('userScore');
  localStorage.removeItem('houseScore');

  // Hide the results
  gameDiv.classList.toggle('hidden');
  resultsDiv.classList.toggle('hidden');

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = '';
    resultDiv.classList.remove('winner');
  });

  resultText.innerText = '';
  resultWinner.classList.toggle('hidden');
  resultsDiv.classList.toggle('show-winner');
});






