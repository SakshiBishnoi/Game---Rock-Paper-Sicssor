document.addEventListener('DOMContentLoaded', () => {
    const newGameButton = document.getElementById('new-game-button');
    newGameButton.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  });