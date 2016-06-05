/**
 * Import dependencies
 */
import { asset as HomeComponent } from './../modules/home/home.routes.ts';

/**
 * The layout route component
 *
 * @class LayoutRoute
 */
class LayoutRoute implements ng.IComponentOptions {
  public template = require('./layout.view.html');
  public $routeConfig = [
    {path: '/', name: 'Home', component: HomeComponent, useAsDefault: true}
  ];
}

export const asset = `module${module.id}.route`;
export default angular.module(module.id.toString(), [])
  .component(asset, new LayoutRoute())
  .name;
