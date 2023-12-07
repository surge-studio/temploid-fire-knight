import { AnimatedSprite, Container, Rectangle, Texture, Ticker } from 'pixi.js';
import { Settings } from './Settings';

const images = ['./sprites/hero.png'];

export class Hero {
  static width = Settings.unit;
  static height = Settings.unit;

  #view: Container;
  #screen: Rectangle;
  #ticker: Ticker;

  sprite: AnimatedSprite;
  velocityX = 0;
  velocityY = 0;

  constructor(view: Container, screen: Rectangle) {
    this.#view = view;
    this.#screen = screen;

    const textures = images.map((image) => Texture.from(image));
    this.sprite = new AnimatedSprite(textures);
    this.sprite.anchor.set(0.5);
    this.sprite.width = Hero.width;
    this.sprite.height = Hero.height;
    this.sprite.play();

    this.#ticker = new Ticker();
    this.#ticker.add((delta) => {
      this.#move(delta);
    });
    this.#ticker.start();

    this.reset();
    this.#view.addChild(this.sprite);

    document.addEventListener('pointerdown', (event) => {
      if (
        event.target !== document.querySelector('#app canvas') ||
        !(event.target instanceof HTMLElement)
      ) {
        return;
      }
      const x = event.clientX - event.target.getBoundingClientRect().left;
      const y = event.clientY - event.target.getBoundingClientRect().top;

      if (x < this.sprite.x - Settings.unit * 2) {
        this.velocityX = -1;
      }

      if (x > this.sprite.x + Settings.unit * 2) {
        this.velocityX = 1;
      }

      if (y < this.sprite.y - Settings.unit * 2) {
        this.velocityY = -1;
      }

      if (y > this.sprite.y + Settings.unit * 2) {
        this.velocityY = 1;
      }
    });

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
      if (key.code === 'Space') {
        // this.velocityX = -1;
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
    this.sprite.x = this.#screen.width / 2;
    this.sprite.y = this.#screen.height / 2;
  }

  #move(delta: number) {
    const speed = 0.25;

    this.sprite.x += Math.round(
      ((this.velocityX * Hero.width) / (Settings.unit * speed)) * delta
    );

    if (this.sprite.x < 0 + Settings.unit * 1.5) {
      this.sprite.x = Settings.unit * 1.5;
    }

    if (this.sprite.x > this.#screen.width - Settings.unit * 1.5) {
      this.sprite.x = this.#screen.width - Settings.unit * 1.5;
    }

    this.sprite.y += Math.round(
      ((this.velocityY * Hero.height) / (Settings.unit * speed)) * delta
    );

    if (this.sprite.y < 0 + Settings.unit * 1.5) {
      this.sprite.y = Settings.unit * 1.5;
    }

    if (this.sprite.y > this.#screen.height - Settings.unit * 1.5) {
      this.sprite.y = this.#screen.height - Settings.unit * 1.5;
    }
  }
}
