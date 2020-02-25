import {animate, animateChild, group, query, sequence, state, style, transition, trigger, useAnimation} from '@angular/animations';
import {slideInLeft, slideOutLeft} from 'ng-animate';

export const sideMenuAnimation = trigger('slide', [
  transition('void => *', useAnimation(slideInLeft, {
    params: {
      timing: 0.6
    }
  })),
  transition('* => void', useAnimation(slideOutLeft, {
    params: {
      timing: 0.6
    }
  })),
]);

export const menuButtonAnimation = trigger('button', [
  state('*', style({width: '50px'})),
  transition('* => *', [
    query(':enter', [
      style({transform: 'scale(0)', position: 'absolute'}),
      animate('0.3s ease-in', style({transform: 'scale(1)'})),
    ], {optional: true}),
    query(':leave', [
      style({transform: 'scale(0)', position: 'absolute'}),
      animate('0.2s ease-out', style({transform: 'scale(0)'})),
    ], {optional: true}),
  ])
]);

