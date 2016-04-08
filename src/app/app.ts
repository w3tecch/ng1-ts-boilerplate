/**
 * Import Styles
 */
import '../assets/scss/main.scss';
/**
 * Import Third Libraries
 */
import 'angular';
import '@angular/router/angular1/angular_1_router';
import 'angular-translate';
import 'angular-local-storage';
import 'angular-sanitize';

/**
 * Import app modules
 */
import Decorators from './decorators/decorator.module.ts';
import Services from './services/services.module.ts';
import Config from './config/config.module.ts';
import {default as Home, homeRoute} from './modules/home/home.module.ts';

import AppConfig from './app.config.ts';

/**
 * App
 */
class App implements ng.IComponentOptions {
  public template = '<h1 translate="TITLE"></h1><ng-outlet></ng-outlet>';
  public $routeConfig = [
    {path: '/', name: 'Home', component: homeRoute, useAsDefault: true}
  ];
}

/**
 * Define your app
 */
angular
  .module('app', [
    // AngularJS Libs
    'ngComponentRouter',

    // Third-Party Libs
    'pascalprecht.translate',
    'LocalStorageModule',
    'ngSanitize',

    // Configs, middleware, run...
    Config,

    // Common components, services, filters, models...
    Decorators,
    Services,

    // App modules
    Home
  ])
  .component('app', new App())
  .run(() => console.log(AppConfig));

