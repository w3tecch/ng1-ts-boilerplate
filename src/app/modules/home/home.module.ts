
import routing from './home.routes.ts';
import HomeController from './home.controller.ts';

export default angular.module('app.home', [])
  .config(routing)
  .controller('HomeController', HomeController)
  .name;
