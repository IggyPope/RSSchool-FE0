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

    this.snake = new Snake(10, 10);

    this.food = new Food(this.gameSize, this.tileSize);

    this.gameLoopId = setInterval(this.update.bind(this), 1000 / 3);
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
      this.snake.body.some((part, index, body) => {
        return index > 0 && part.x === body[0].x && part.y === body[0].y;
      })
    ) {
      clearInterval(this.gameLoopId);
      alert(`Game Over!\nYour score is ${this.scoreContainer.textContent}`);
    }
  }

  drawGround() {
    this.ctx.fillStyle = 'rgb(250, 235, 215)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawSnake() {
    this.snake.body.forEach((part) => {
      this.ctx.fillStyle = 'limegreen';
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
      this.scoreContainer.textContent++;
      this.snake.body.push({
        x: this.food.x,
        y: this.food.y,
      });
      this.food = new Food(this.gameSize, this.tileSize);
    }
  }
}

class Snake {
  constructor(headX, headY) {
    this.body = [];
    this.body[0] = { x: headX, y: headY };

    this.velocityX = 0;
    this.velocityY = 0;
  }

  move() {
    for (let i = this.body.length - 1; i > 0; i--) {
      this.body[i] = { ...this.body[i - 1] };
    }
    this.body[0].x += this.velocityX;
    this.body[0].y += this.velocityY;
  }

  changeDirection(direction) {
    switch (direction) {
      case 'up':
        if (this.velocityY === 1) return;
        this.velocityX = 0;
        this.velocityY = -1;
        break;

      case 'down':
        if (this.velocityY === -1) return;
        this.velocityX = 0;
        this.velocityY = 1;
        break;

      case 'left':
        if (this.velocityX === 1) return;
        this.velocityX = -1;
        this.velocityY = 0;
        break;

      case 'right':
        if (this.velocityX === -1) return;
        this.velocityX = 1;
        this.velocityY = 0;
        break;

      default:
        break;
    }
  }
}

class Food {
  constructor(gameSize) {
    this.x = Math.floor(Math.random() * gameSize);
    this.y = Math.floor(Math.random() * gameSize);
  }
}

export default new Game();
