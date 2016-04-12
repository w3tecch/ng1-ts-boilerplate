/**
 * namespace
 */
import { namespace as parentNamespace } from './../../app.ts';
export const namespace = `${parentNamespace}.decorators`;

/**
 * Import dependencies
 */
import qDecorator from './q.decorator.ts';

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
