export type HTMLElementAttributes = {
  class?: string;
  id?: string;
  [key: string]: string | number;
};

export type CanvasLine = {
  x: number;
  y: number;
  z: number;
  newX: number;
  newY: number;
};

export type ScreenSize = {
  w: number;
  h: number;
};

export interface IAnimationManager {
  animations: IAnimation[];
}

export interface IAnimation {
  isLoaded: boolean;
  play: Function;
  pause: Function;
}
