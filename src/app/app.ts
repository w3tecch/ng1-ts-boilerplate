import '../assets/scss/main.scss';

import 'angular';

angular
  .module('app', [])
  .run(() => {
    console.info('Angular is ready!');
  });