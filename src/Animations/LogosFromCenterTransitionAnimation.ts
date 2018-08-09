import {
  range,
  random
} from '../utils';
import { IAnimation, ScreenSize } from 'types';

class LogosFromCenterTransitionAnimation implements IAnimation {

  isLoaded: boolean = false;
  private screenSize: ScreenSize = { w: 1280, h: 800 };
  private parent: HTMLElement;
  private numberOfItems: number = 50;
  private centerX: number;
  private centerY: number;
  private isAnimating: Boolean = false;
  private list: HTMLElement[] = [];
  private logo: HTMLElement;

  constructor(parent:HTMLElement, logo:HTMLElement) {
    this.parent = parent;
    this.logo = logo;
    this.centerX = this.screenSize.w / 2;
    this.centerY = this.screenSize.h / 2;
    this.isLoaded = false;
    this.createObjects();
  }

  createObjects() {
    range(0, this.numberOfItems).forEach(() => {
      const clone = <HTMLElement>this.logo.cloneNode(true);
      clone.style.display = 'block';
      this.list.push(clone);
      this.parent.appendChild(clone);
    });
    this.isLoaded = true;
  }

  play() {
    this.isAnimating = true;
    this.list.forEach(element => {
      this.resetObject(element);
    });
  }

  pause() {
    this.isAnimating = false;
  }

  private animateObject(div:HTMLElement) {
    const time = random(2, 8);
    const delay = random(1, 7);
    div.style.transition = `all ${time}s ease-in ${delay}s`;
    const angle = Math.random() * Math.PI * 2;
    div.style.left = `${Math.sin(angle) * (this.screenSize.w / 1.27) + this.centerX - 100}px`;
    div.style.top = `${Math.cos(angle) * (this.screenSize.h / 1.27) + this.centerY}px`;
    div.style.width = '100px';
    setTimeout(this.resetObject.bind(this, div), (time + delay) * 1000);
  }

  private resetObject(div:HTMLElement) {
    div.style.left = `${this.centerX}px`;
    div.style.top = `${this.centerY}px`;
    div.style.transition = 'all 0s linear 0s';
    div.style.width = '0';
    if (this.isAnimating) {
      setTimeout(this.animateObject.bind(this, div), 70);
    }
  }
}

export { LogosFromCenterTransitionAnimation };
