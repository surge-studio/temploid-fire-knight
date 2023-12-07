import { Application } from 'pixi.js';
import { Hero } from './Hero';
import { Background } from './Background';
import { Monster } from './Monster';

export class Game {
  #app: Application<HTMLCanvasElement>;
  #hero: Hero;
  #monster: Monster;
  #time = 0;
  #lastChange = 0;

  constructor() {
    this.#app = new Application({
      backgroundColor: 0x222222,
      autoStart: false,
      width: 512,
      height: 480,
    });

    new Background(this.#app.stage, this.#app.screen);
    this.#hero = new Hero(this.#app.stage, this.#app.screen);
    this.#monster = new Monster(this.#app.stage, this.#app.screen);

    const max = 1;
    const min = -1;
    this.#app.ticker.add((delta) => {
      this.#time += delta;
      const count = Math.floor(this.#time / 10);
      if (count != this.#lastChange) {
        this.#lastChange = count;
        if (Math.random() > 0.5) {
          this.#monster.velocityX =
            this.#hero.sprite.x < this.#monster.sprite.x ? min : max;
          this.#monster.velocityY = 0;
        } else {
          this.#monster.velocityX = 0;
          this.#monster.velocityY =
            this.#hero.sprite.y < this.#monster.sprite.y ? min : max;
        }
      }
    });
  }

  render(container: HTMLElement) {
    container.appendChild(this.#app.view);
  }

  start() {
    this.#app.ticker.start();
  }
}
