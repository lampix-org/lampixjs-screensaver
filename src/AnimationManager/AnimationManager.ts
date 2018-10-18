import lampix from '@lampix/core';

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

import depthClassifier from '../utils/depthClassifier';

class AnimationManager implements IAnimationManager {

  private screensaver: HTMLElement;
  private timeout:number;
  private seconds:number;
  private watcher: any;
  animations: IAnimation[] = [];

  initialize = (seconds: number) => {
    this.seconds = seconds;
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

    this.refreshTimer();
    depthClassifier(this.pause).then(watcher => this.watcher = watcher);
  }

  refreshTimer = () => {
    clearTimeout(this.timeout);
    this.timeout = window.setTimeout(() => this.play(), this.seconds * 1000);
  }

  play = () => {
    lampix.watchers.pauseAll().then(() => this.watcher.resume());
    this.screensaver.style.display = 'block';
    this.animations.forEach(animation => {
      if (animation.isLoaded) {
        animation.play();
      }
    });
  }

  pause = () => {
    lampix.watchers.resumeAll();
    this.refreshTimer();
    this.screensaver.style.display = 'none';
    this.animations.forEach(animation => {
      if (animation.isLoaded) {
        animation.pause();
      }
    });
  }
}

export { AnimationManager };
