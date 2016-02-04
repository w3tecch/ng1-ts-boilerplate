/**
 * Import Styles
 */
import '../assets/scss/main.scss';
/**
 * Import Third Libraries
 */
import 'angular';
import 'angular-ui-router';
/**
 * Import app modules
 */
import {AppConfig, RouterConfig} from './app.config.ts';
import home from './modules/home/home.module.ts';
/**
 * Define your app
 */
angular
  .module('app', [
    // AngularJS Libs

    // Third-Party Libs
    'ui.router',

    // Configs, middleware, run...

    // Common components, services, filters, models...

    // App modules
    home
  ])
  .config(RouterConfig)
  .run(() => {
    console.info('Angular is ready!', AppConfig);
  });
