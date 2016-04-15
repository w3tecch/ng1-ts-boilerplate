/**
 * Import dependencies
 */
import { homeRoute } from './../modules/home/home.module.ts';

/**
 * The layout route component
 *
 * @class LayoutRoute
 */
class LayoutRoute implements ng.IComponentOptions {
  public template = require('./layout.view.html');
  public $routeConfig = [
    {path: '/', name: 'Home', component: homeRoute, useAsDefault: true}
  ];
  constructor(public controller) { ; }
}

export default LayoutRoute;
