import { Application } from 'pixi.js';
import { Hero } from './Hero';
import { Background } from './Background';

export class Game {
  #app: Application<HTMLCanvasElement>;
  // @ts-expect-error TODO
  #hero: Hero;
  // @ts-expect-error TODO
  #background: Background;

  constructor() {
    this.#app = new Application({
      backgroundColor: 0x222222,
      autoStart: false,
      width: 512,
      height: 480,
    });

    this.#background = new Background(this.#app.stage, this.#app.screen);
    this.#hero = new Hero(this.#app.stage, this.#app.screen);
  }

  render(container: HTMLElement) {
    container.appendChild(this.#app.view);
  }

  start() {
    this.#app.ticker.start();
  }
}
