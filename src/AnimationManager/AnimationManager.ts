import {
  IAnimationManager,
  IAnimation
} from '../types';

import {
  createHTMLElement
} from '../utils';

import { LinesFromCenterAnimation } from '../Animations/LinesFromCenterAnimation';
import { LogoOutlineAnimation } from '../Animations/LogoOutlineAnimation';
import { LogosFromCenterTransitionAnimation } from '../Animations/LogosFromCenterTransitionAnimation';
import { LogosFromCenterPerspectiveAnimation } from '../Animations/LogosFromCenterPerspectiveAnimation';

class AnimationManager implements IAnimationManager {
  
  private screensaver: HTMLElement;
  animations: IAnimation[];
  
  addAnimation(types: Object[]) {
    this.screensaver = createHTMLElement(
      document.body,
      'div',
      { id: 'screensaver' }
    );
  
    types.forEach((type) => {
      switch (type) {
        case 'LinesFromCenter':
          this.animations.push(new LinesFromCenterAnimation(this.screensaver, type));
          break;

        case 'LogoOutline':
          this.animations.push(new LogoOutlineAnimation(this.screensaver, type));
          break;

        case 'LogosFromCenterTransition':
          this.animations.push(new LogosFromCenterTransitionAnimation(this.screensaver, type));
          break;

        case 'LogosFromCenterPerspective':
          this.animations.push(new LogosFromCenterPerspectiveAnimation(this.screensaver, type));
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

