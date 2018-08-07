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

export declare type ScreenSize = {
  cw: number;
  ch: number;
};

export interface IAnimationManager {
  animations: IAnimation[];
}

export interface IAnimation {
  isLoaded: Boolean;
  play: Function;
  pause: Function;
}
