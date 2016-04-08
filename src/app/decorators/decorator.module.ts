/**
 * Import dependencies
 */
import qDecorator from './q.decorator.ts';

/**
 * Define namespace of module
 *
 * @type {string}
 */
const namespace = 'app.decorators';

/**
 * Export module components
 *
 * @type {string}
 */

/**
 * Define and export angular setup for this module
 *
 * @type {string} returns angular FQDN module name
 */
export default angular.module(namespace, [])
  .config(qDecorator)
  .name;
