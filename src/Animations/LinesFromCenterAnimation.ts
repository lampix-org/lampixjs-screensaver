import {
  range,
  createHTMLCanvasElement,
 } from '../utils';
import { IAnimation, CanvasLine, ScreenSize } from 'types';

class LinesFromCenterAnimation implements IAnimation {

  isLoaded: boolean = true;
  private screenSize: ScreenSize;
  private numberOfItems: number;
  private lines: Object[] = [];
  private counter: number = 0;
  private zStep: number = 0.004;
  private centerX: number;
  private centerY: number;
  private redrawing:Boolean = false;
  private screenSaverCtx: CanvasRenderingContext2D;

  constructor(parent: HTMLElement, props: any) {
    this.screenSize = props.screenSize;
    this.centerX = this.screenSize.w / 2;
    this.centerY = this.screenSize.h / 2;
    this.numberOfItems = props.numberOfItems;

    range(0, this.numberOfItems).forEach(() => {
      const line:CanvasLine = { x: 0, y: 0, z: 0, newX: 0, newY: 0 };
      this.resetLine(line);
      this.lines.push(line);
    });

    const canvasHolder: HTMLCanvasElement = createHTMLCanvasElement(
      parent,
      { width: this.screenSize.w, height: this.screenSize.h, id: 'screensaver-canvas' }
    );

    this.screenSaverCtx = canvasHolder.getContext('2d');
  }

  draw() {
    this.screenSaverCtx.fillRect(0, 0, this.screenSize.w, this.screenSize.h);
    this.lines.forEach((line:CanvasLine, index) => {
      line.z -= this.zStep;
      const x = line.x / line.z;
      const y = line.y / line.z;
      if (line.newX !== 0) {
        this.screenSaverCtx.beginPath();
        this.screenSaverCtx.strokeStyle = `hsl(${(this.counter * index * 2) % 200}, 100%, 50%)`;
        this.screenSaverCtx.lineCap = 'round';
        this.screenSaverCtx.lineWidth = 3;
        this.screenSaverCtx.moveTo(x + this.centerX, y + this.centerY);
        this.screenSaverCtx.lineTo(line.newX + this.centerX, line.newY + this.centerY);
        this.screenSaverCtx.stroke();
      }
      line.newX = x;
      line.newY = y;

      if (line.z < this.zStep || line.newX > this.screenSize.w || line.newY > this.screenSize.h) {
        this.resetLine(line);
      }
    });
    this.counter += 0.0085;
  }

  private resetLine(line:CanvasLine) {
    line.x = (Math.random() * this.screenSize.w - (this.screenSize.w / 2));
    line.y = (Math.random() * this.screenSize.h - (this.screenSize.h / 2));
    line.z = 1;
    line.newX = 0;
    line.newY = 0;
  }

  private loop() {
    this.draw();
    if (this.redrawing) {
      window.requestAnimationFrame(() => this.loop());
    }
  }

  play() {
    this.redrawing = true;
    this.loop();
  }

  pause() {
    this.redrawing = false;
  }
}

export { LinesFromCenterAnimation };

