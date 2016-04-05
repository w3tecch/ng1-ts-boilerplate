/**
 * An example route component
 *
 * @class HomeRoute
 */
class HomeRoute implements ng.IComponentOptions {
  public template = require('./home.view.html');

  constructor(public controller) {}
}

export default HomeRoute;
