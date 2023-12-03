import 'modern-normalize';
import './style.css';
import './utils/fonts';
import { Game } from './game/Game';

declare global {
  interface Window {
    WebFontConfig: any;
  }
}

const game = new Game();

window.WebFontConfig = {
  google: {
    families: ['Press Start 2P'],
  },
  active() {
    game.render(document.getElementById('app') || document.body);
    game.start();
  },
};
