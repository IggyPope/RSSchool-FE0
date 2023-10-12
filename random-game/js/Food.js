class Food {
  constructor(gameSize) {
    this.x = Math.floor(Math.random() * gameSize);
    this.y = Math.floor(Math.random() * gameSize);
  }
}

export default Food;
