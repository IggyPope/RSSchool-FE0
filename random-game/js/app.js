import game from './Game.js';

const newGameBtn = document.querySelector('#btn-new-game');

newGameBtn.addEventListener('click', () => game.restart());

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      game.snake.changeDirection('up');
      break;

    case 'ArrowRight':
      game.snake.changeDirection('right');
      break;

    case 'ArrowDown':
      game.snake.changeDirection('down');
      break;

    case 'ArrowLeft':
      game.snake.changeDirection('left');
      break;

    default:
      break;
  }
});
