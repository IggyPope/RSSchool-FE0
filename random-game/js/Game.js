import Snake from './Snake.js';
import Food from './Food.js';

class Game {
  constructor() {
    this.canvas = document.querySelector('#canvas');
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = 500;
    this.canvas.height = 500;

    this.gameSize = 21;
    this.tileSize = this.canvas.width / this.gameSize - 2;

    this.scoreContainer = document.querySelector('.score__current-score-value');
    this.highScoreContainer = document.querySelector(
      '.score__best-score-value'
    );

    this.score = 0;
    this.highScore =
      JSON.parse(localStorage.getItem('iggyPope-highScore')) || [];

    if (this.highScore.length > 0) {
      this.highScoreContainer.textContent = this.highScore[0].score;
    }

    this.snake = new Snake(10, 10);

    this.food = new Food(this.gameSize);

    this.gameLoop = setInterval(this.update.bind(this), 1000 / 3);
  }

  update() {
    this.drawGround();
    this.snake.move();
    this.checkGameOver();
    this.drawFood();
    this.checkFoodCollision();
    this.drawSnake();
  }

  checkGameOver() {
    if (
      this.snake.body[0].x < 0 ||
      this.snake.body[0].x > this.gameSize - 1 ||
      this.snake.body[0].y < 0 ||
      this.snake.body[0].y > this.gameSize - 1 ||
      this.snake.body.some(
        (part, index, body) =>
          index > 0 && part.x === body[0].x && part.y === body[0].y
      )
    ) {
      clearInterval(this.gameLoop);

      const date = new Date();

      this.saveHighScore(this.scoreContainer.textContent, date);

      alert(
        `Game Over!\nYour score is ${
          this.scoreContainer.textContent
        }\nDate: ${date.toLocaleDateString('en-US', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        })}`
      );
    }
  }

  drawGround() {
    this.ctx.fillStyle = 'rgb(250, 235, 215)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawSnake() {
    this.snake.body.forEach((part, index) => {
      if (index === 0) {
        this.ctx.fillStyle = 'limegreen';
      } else {
        this.ctx.fillStyle = 'green';
      }
      this.ctx.fillRect(
        part.x * (this.tileSize + 2) + 1,
        part.y * (this.tileSize + 2) + 1,
        this.tileSize,
        this.tileSize
      );
    });
  }

  drawFood() {
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(
      this.food.x * (this.tileSize + 2) + 1,
      this.food.y * (this.tileSize + 2) + 1,
      this.tileSize,
      this.tileSize
    );
  }

  checkFoodCollision() {
    if (
      this.snake.body[0].x === this.food.x &&
      this.snake.body[0].y === this.food.y
    ) {
      this.score++;
      this.scoreContainer.textContent = this.score;

      this.snake.body.push({
        x: this.food.x,
        y: this.food.y,
      });

      this.food = new Food(this.gameSize, this.tileSize);
    }
  }

  saveHighScore(score, date) {
    this.highScore.push({ score, date });
    this.highScore.sort((a, b) => b.score - a.score);

    this.highScore = this.highScore.slice(0, 10);

    this.highScoreContainer.textContent = this.highScore[0].score;

    localStorage.setItem('iggyPope-highScore', JSON.stringify(this.highScore));
  }
}

export default new Game();