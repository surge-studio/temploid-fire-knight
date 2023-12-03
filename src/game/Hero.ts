import { AnimatedSprite, Container, Rectangle, Texture, Ticker } from 'pixi.js';

const images = ['./sprites/hero.png'];

export class Hero {
  static width = 32;
  static height = 32;

  #hero: AnimatedSprite;
  #view: Container;
  #screen: Rectangle;
  #ticker: Ticker;

  velocityX = 0;
  velocityY = 0;

  constructor(view: Container, screen: Rectangle) {
    this.#view = view;
    this.#screen = screen;

    const textures = images.map((image) => Texture.from(image));
    this.#hero = new AnimatedSprite(textures);
    this.#hero.anchor.set(0.5);
    this.#hero.play();

    this.#ticker = new Ticker();
    this.#ticker.add((delta) => {
      this.#move(delta);
    });
    this.#ticker.start();

    this.reset();
    this.#view.addChild(this.#hero);

    document.addEventListener('keydown', (key) => {
      if (key.code === 'ArrowUp') {
        this.velocityY = -1;
      }
      if (key.code === 'ArrowRight') {
        this.velocityX = 1;
      }
      if (key.code === 'ArrowDown') {
        this.velocityY = 1;
      }
      if (key.code === 'ArrowLeft') {
        this.velocityX = -1;
      }
    });

    document.addEventListener('keyup', (key) => {
      if (key.code === 'ArrowUp') {
        this.velocityY = 0;
      }
      if (key.code === 'ArrowRight') {
        this.velocityX = 0;
      }
      if (key.code === 'ArrowDown') {
        this.velocityY = 0;
      }
      if (key.code === 'ArrowLeft') {
        this.velocityX = 0;
      }
    });
  }

  reset() {
    this.#hero.x = this.#screen.width / 2;
    this.#hero.y = this.#screen.height / 2;
  }

  #move(delta: number) {
    this.#hero.x += Math.round(((this.velocityX * Hero.width) / 8) * delta);
    this.#hero.y += Math.round(((this.velocityY * Hero.height) / 8) * delta);
  }
}
