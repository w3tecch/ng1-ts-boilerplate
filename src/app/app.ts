/**
 * Import Styles
 */
import '../assets/scss/main.scss';
/**
 * Import Third Libraries
 */
import 'angular';
import 'angular-ui-router';
import 'rx-angular';
import 'moment/moment.js';
/**
 * Import app modules
 */
import {AppConfig, RouterConfig} from './app.config.ts';
import AppServices from './services/services.module.ts';
import home from './modules/home/home.module.ts';
/**
 * Define your app
 */
angular
  .module('app', [
    // AngularJS Libs

    // Third-Party Libs
    'rx',
    'ui.router',

    // Configs, middleware, run...

    // Common components, services, filters, models...
    AppServices.class,

    // App modules
    home
  ])
  .config(RouterConfig)
  .run(() => {
    console.info('Angular is ready!', AppConfig);
  });

