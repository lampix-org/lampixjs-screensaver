import {
  IAnimationManager,
  IAnimation
} from '../types';

import {
  createHTMLElement,
  createHTMLCanvasElement
} from '../utils';

import lampixLogo from '../../assets/lampix-logo.svg';
import '../../assets/style.css';

import { LinesFromCenterAnimation } from '../Animations/LinesFromCenterAnimation';
import { LogoOutlineAnimation } from '../Animations/LogoOutlineAnimation';
import { LogosFromCenterTransitionAnimation } from '../Animations/LogosFromCenterTransitionAnimation';
import { LogosFromCenterPerspectiveAnimation } from '../Animations/LogosFromCenterPerspectiveAnimation';

class AnimationManager implements IAnimationManager {

  private screensaver: HTMLElement;
  animations: IAnimation[] = [];

  constructor() {
    const types: String[] =
      ['LogoOutline', 'LogosFromCenterPerspective',
      /*'LinesFromCenter', 'LogosFromCenterTransition'*/];
    this.screensaver = createHTMLElement(
      document.body,
      'div',
      { id: 'screensaver' }
    );

    let logo:HTMLElement;

    types.forEach((type) => {
      switch (type) {
        case 'LinesFromCenter':
          const canvasHolder: HTMLCanvasElement = createHTMLCanvasElement(
            this.screensaver,
            { width: 1280, height: 800, id: 'screensaver-canvas' }
          );
          this.animations.push(new LinesFromCenterAnimation(canvasHolder));
          break;

        case 'LogoOutline':
          logo = createHTMLElement(this.screensaver, 'div', { id: 'lampix-logo' }, lampixLogo);
          this.animations.push(new LogoOutlineAnimation(logo));
          break;

        case 'LogosFromCenterTransition':
          logo = createHTMLElement(this.screensaver, 'div', { id: 'lampix-simple-logo' });
          this.animations.push(new LogosFromCenterTransitionAnimation(this.screensaver, logo));
          break;

        case 'LogosFromCenterPerspective':
          logo = createHTMLElement(
            this.screensaver,
            'div',
            { id: 'css-logo' },
            `<div id="t" class="arrow"></div>
             <div id="r" class="arrow"></div>
             <div id="b" class="arrow"></div>
             <div id="l" class="arrow"></div>`
          );
          this.animations.push(new LogosFromCenterPerspectiveAnimation(this.screensaver, logo));
          break;

        default:
          break;
      }
    });
  }

  play = () => {
    this.screensaver.style.display = 'block';
    this.animations.forEach((animation) => {
      if (animation.isLoaded) {
        animation.play();
      }
    });
  }

  pause = () => {
    this.screensaver.style.display = 'none';
    this.animations.forEach((animation) => {
      if (animation.isLoaded) {
        animation.pause();
      }
    });
  }
}

export { AnimationManager };
