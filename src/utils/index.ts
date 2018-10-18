import { HTMLElementAttributes } from 'types';

export const createHTMLElement = (
  parent: HTMLElement,
  tag: string,
  attribute?: HTMLElementAttributes,
  content?: string):HTMLElement => {

  const element:HTMLElement = document.createElement(tag);
  Object.keys(attribute).forEach((key) => { element.setAttribute(key, `${attribute[key]}`); });

  if (content) element.innerHTML = content;
  parent.appendChild(element);
  return element;
};

export const createHTMLCanvasElement = (parent: HTMLElement, attribute: HTMLElementAttributes):HTMLCanvasElement => {
  const element = document.createElement('canvas');
  Object.keys(attribute).forEach((key) => element.setAttribute(key, `${attribute[key]}`));
  parent.appendChild(element);
  return element;
};

export const range = (start:number, end:number) => Array.from({ length: end - start }, (v, k) => { v; k + start; });
export const random = (start: number, end: number) => Math.round(start + Math.random() * (end - start));
