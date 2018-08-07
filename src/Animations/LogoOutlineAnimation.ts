import anime, { AnimeInstance, AnimeAnimParams } from 'animejs';
import { createHTMLElement } from '../utils';
import { IAnimation } from 'types';

class LogoOutlineAnimation implements IAnimation{

  isLoaded: boolean = false;
  private paths: SVGPathElement[];
  private logo: HTMLElement;
  anim: AnimeInstance;

  constructor(parent:HTMLElement, props: any) {
    this.logo = createHTMLElement(
      parent,
      'div',
      { id: props.id },
      { type: props.type, url: props.url },
      this.init.bind(this)
    );
  }

  init() {
    this.paths = Array.from(this.logo.getElementsByTagName('path'));
    this.paths.forEach((p) => {
      const length = String(p.getTotalLength());
      p.setAttribute('stroke-dasharray', length);
      p.setAttribute('stroke-dashoffset', length);
      p.setAttribute('stroke-width', '1.2');
      p.setAttribute('stroke-linecap', 'square');
      p.setAttribute('fill', p.getAttribute('stroke'));
      p.setAttribute('fill-opacity', '0');
      p.style.transition = 'fill-opacity 500ms ease 1s';
    });
    this.animate();
    this.isLoaded = true;
  }

  animate() {
    const params:AnimeAnimParams = ({
      targets: 'path',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 3000,
      delay: (el, i) => { el; return i * 250; },
      autoplay: false,
      direction: 'alternate',
      loop: false,
      offset: 0,
      begin: () => {
        this.paths.forEach((p) => {
          const length = String(p.getTotalLength());
          p.setAttribute('stroke-dasharray', length);
          p.setAttribute('stroke-dashoffset', length);
        });
      },
      complete: () => {
        this.paths.forEach((p) => {
          p.setAttribute('fill-opacity', '1');
        });
        this.pause();
        setTimeout(
          () => {
            this.paths.forEach((p) => {
              p.setAttribute('fill-opacity', '0');
            });
          },
          5000);
        setTimeout(
          () => {
            this.anim.restart();
          },
          6000);
      }
    });
    this.anim = anime(params);
  }

  play() {
    this.anim.restart();
  }

  pause() {
    this.anim.pause();
  }
}

export { LogoOutlineAnimation };
