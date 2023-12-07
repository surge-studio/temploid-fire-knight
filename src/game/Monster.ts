import { AnimatedSprite, Container, Rectangle, Texture, Ticker } from 'pixi.js';
import { Settings } from './Settings';

const images = ['./sprites/monster.png'];

export class Monster {
  static width = Settings.unit;
  static height = Settings.unit;

  sprite: AnimatedSprite;
  #view: Container;
  #screen: Rectangle;
  #ticker: Ticker;

  velocityX = 0;
  velocityY = 0;

  constructor(view: Container, screen: Rectangle) {
    this.#view = view;
    this.#screen = screen;

    const textures = images.map((image) => Texture.from(image));
    this.sprite = new AnimatedSprite(textures);
    this.sprite.anchor.set(0.5);
    this.sprite.width = Monster.width;
    this.sprite.height = Monster.height;
    this.sprite.play();
    this.reset();

    this.#ticker = new Ticker();
    this.#ticker.add((delta) => {
      this.#move(delta);
    });
    this.#ticker.start();

    this.#view.addChild(this.sprite);
  }

  reset() {
    this.sprite.x = this.#screen.width / 2;
    this.sprite.y = Settings.unit * 5;
  }

  #move(delta: number) {
    const speed = 0.5;

    this.sprite.x += Math.round(
      ((this.velocityX * Monster.width) / (Settings.unit * speed)) * delta
    );

    if (this.sprite.x < 0 + Settings.unit * 1.5) {
      this.sprite.x = Settings.unit * 1.5;
    }

    if (this.sprite.x > this.#screen.width - Settings.unit * 1.5) {
      this.sprite.x = this.#screen.width - Settings.unit * 1.5;
    }

    this.sprite.y += Math.round(
      ((this.velocityY * Monster.height) / (Settings.unit * speed)) * delta
    );

    if (this.sprite.y < 0 + Settings.unit * 1.5) {
      this.sprite.y = Settings.unit * 1.5;
    }

    if (this.sprite.y > this.#screen.height - Settings.unit * 1.5) {
      this.sprite.y = this.#screen.height - Settings.unit * 1.5;
    }
  }
}
