import { HTMLElementAttributes, HTMLElementContent } from 'types';

export const createHTMLElement = (
  parent: HTMLElement,
  tag: string,
  attribute: HTMLElementAttributes,
  content: HTMLElementContent,
  callback?: Function):HTMLElement => {
  
  const element:HTMLElement = document.createElement(tag);
  Object.keys(attribute).forEach((key) => {
    element.setAttribute(key, `${attribute[key]}`);
  });
  switch (content.type) {
    case 'html':
      element.innerHTML = content.html;
      break;
    
    case 'external':
      fetch(content.url)
        .then((response) => response.text())
        .then((fileContent) => {
          element.innerHTML = fileContent;
          if (callback) {
            callback();
          }
        });
      break;
    
    default:
      break;
  }
  parent.appendChild(element);
  return element;
};

export const createHTMLCanvasElement = (parent: HTMLElement, attribute: HTMLElementAttributes):HTMLCanvasElement => {
  const element = document.createElement('canvas');
  Object.keys(attribute).forEach((key) => element.setAttribute(key, `${attribute[key]}`));
  parent.appendChild(element);
  return element;
};

export const range = (start:number, end:number) => Array.from({ length: end - start }, (v, k) => {v; k + start;});
export const random = (start: number, end: number) => Math.round(start + Math.random() * (end - start));
