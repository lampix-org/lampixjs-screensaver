export type HTMLElementAttributes = {
  class?: string;
  id?: string;
  [key: string]: string | number;
};

export type HTMLElementContent = {
  type: string;
  url?: string;
  html?: string;
  [key: string]: string;
};

export type CanvasLine = {
  x: number;
  y: number;
  z: number;
  newX: number;
  newY: number;
};

export type AnimationObject = {
  [key: string]: string | number | Object;
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
