class Snake {
  constructor(headX, headY) {
    this.body = [];
    this.body[0] = { x: headX, y: headY };

    this.velocityX = 0;
    this.velocityY = 0;

    this.previousVelocityX = 0;
    this.previousVelocityY = 0;
  }

  move() {
    for (let i = this.body.length - 1; i > 0; i--) {
      this.body[i] = { ...this.body[i - 1] };
    }
    this.body[0].x += this.velocityX;
    this.body[0].y += this.velocityY;

    this.previousVelocityX = this.velocityX;
    this.previousVelocityY = this.velocityY;
  }

  changeDirection(direction) {
    switch (direction) {
      case 'up':
        if (this.velocityY === 1 || this.previousVelocityY === 1) return;
        this.velocityX = 0;
        this.velocityY = -1;
        break;

      case 'down':
        if (this.velocityY === -1 || this.previousVelocityY === -1) return;
        this.velocityX = 0;
        this.velocityY = 1;
        break;

      case 'left':
        if (this.velocityX === 1 || this.previousVelocityX === 1) return;
        this.velocityX = -1;
        this.velocityY = 0;
        break;

      case 'right':
        if (this.velocityX === -1 || this.previousVelocityX === -1) return;
        this.velocityX = 1;
        this.velocityY = 0;
        break;

      default:
        break;
    }
  }
}

export default Snake;
