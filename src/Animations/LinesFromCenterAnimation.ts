import {
  range,
  createHTMLCanvasElement,
 } from '../utils';
import { IAnimation, CanvasLine, ScreenSize } from 'types';

class LinesFromCenterAnimation implements IAnimation {

  isLoaded: false;
  private screenSize: ScreenSize;
  private numberOfLines: number = 240;
  private lines: Object[];
  private counter: number = 0;
  private zStep: number = 0.004;
  private centerX: number;
  private centerY: number;
  private redrawing:Boolean = false;
  private screenSaverCtx: CanvasRenderingContext2D;

  constructor(parent: HTMLElement, props: any) {
    this.screenSize = props.screenSize;
    this.centerX = this.screenSize.cw / 2;
    this.centerY = this.screenSize.ch / 2;

    range(0, this.numberOfLines).forEach(() => {
      this.lines.push(this.resetLine());
    });

    const canvasHolder: HTMLCanvasElement = createHTMLCanvasElement(
      parent,
      { width: this.screenSize.cw, height: this.screenSize.ch, id: 'screensaver-canvas' }
    );

    this.screenSaverCtx = canvasHolder.getContext('2d');
  }

  draw() {
    this.screenSaverCtx.fillRect(0, 0, this.screenSize.cw, this.screenSize.ch);
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

      if (line.z < this.zStep || line.newX > this.screenSize.cw || line.newY > this.screenSize.ch) {
        line = this.resetLine();
      }
    });
    this.counter += 0.0085;
  }

  private resetLine() {
    const line:CanvasLine = {
      x: (Math.random() * this.screenSize.cw - (this.screenSize.cw / 2)),
      y: (Math.random() * this.screenSize.ch - (this.screenSize.ch / 2)),
      z: 1,
      newX: 0,
      newY: 0
    };
    return line;

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

