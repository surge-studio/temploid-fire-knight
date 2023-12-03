import 'modern-normalize';
import './style.css';
import './fonts';
import { Application } from 'pixi.js';

declare global {
  interface Window {
    WebFontConfig: any;
  }
}

window.WebFontConfig = {
  google: {
    families: ['Press Start 2P'],
  },
  active() {
    console.log('game ready');
  },
};

const app = new Application<HTMLCanvasElement>({
  resizeTo: window,
  backgroundColor: '#222222',
});

document.body.appendChild(app.view);
