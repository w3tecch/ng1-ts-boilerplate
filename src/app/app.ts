/**
 * Import Styles
 */
import '../assets/scss/main.scss';
/**
 * Import Third Libraries
 */
import 'angular';
import '@angular/router/angular1/angular_1_router';

/**
 * Import app modules
 */
import {AppConfig, RouterConfig} from './app.config.ts';
import Services from './services/services.module.ts';
import {default as home, homeRoute} from './modules/home/home.module.ts';

/**
 * App
 */
class App implements ng.IComponentOptions {
  public template = '<ng-outlet></ng-outlet>';
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

    // Configs, middleware, run...

    // Common components, services, filters, models...
    Services,

    // App modules
    home
  ])
  .config(RouterConfig)
  .value('$routerRootComponent', 'app')
  .component('app', new App())
  .run(() => {
    console.info('Angular is ready!', AppConfig);
  });

