import { Container, Rectangle, Sprite, Texture } from 'pixi.js';

const images = ['./sprites/background.png'];

export class Background {
  static width = 512;
  static height = 480;

  #background: Sprite;
  #view: Container;
  #screen: Rectangle;

  constructor(view: Container, screen: Rectangle) {
    this.#view = view;
    this.#screen = screen;

    const texture = Texture.from(images[0]);
    this.#background = new Sprite(texture);
    this.#background.anchor.set(0.5);

    this.#background.x = this.#screen.width / 2;
    this.#background.y = this.#screen.height / 2;
    this.#view.addChild(this.#background);
  }
}
