import '../assets/scss/main.scss';

import 'angular';

import {AppConfig} from './app.config.ts';


angular
  .module('app', [])
  .run(() => {
    console.info('Angular is ready!', AppConfig);
  });

