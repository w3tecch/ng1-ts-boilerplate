import '../assets/scss/main.scss';

import 'angular';

console.info('Created by hirsch on 31gi/01/16.');

angular
  .module('app', [])
  .run(() => {
    console.info('Angular is ready!');
  });