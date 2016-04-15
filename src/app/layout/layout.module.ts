/**
 * namespace
 */
import { namespace as parentNamespace } from './../app.ts';
export const namespace = `${parentNamespace}.layout`;

/**
 * Import dependencies
 */
import Route from './layout.routes.ts';
import LayoutController from './layout.controller.ts';

/**
 * Export module components
 *
 * @type {string}
 */
export const layoutController = `${namespace}.LayoutController`;
export const layoutRoute = `${namespace}.LayoutRoute`;

/**
 * Define and export angular setup for this module
 *
 * @type {string} returns angular FQDN module name
 */
export default angular.module(namespace, [])
  .component('layout', new Route(LayoutController)) // TODO: use string ref layoutController (fixed in ng 1.5.4)
  .controller(layoutController, LayoutController)
  .name;
