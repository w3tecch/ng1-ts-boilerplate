/**
 * An example route component
 *
 * @class HomeRoute
 */
class HomeRoute implements ng.IComponentOptions {
  public template = require('./home.view.html');
  constructor(public controller) {}
}

import Controller from './home.controller.ts';
export const asset = `module${module.id}.route`;
export default angular.module(module.id.toString(), [])
  .component(asset, new HomeRoute(Controller))
  .name;
