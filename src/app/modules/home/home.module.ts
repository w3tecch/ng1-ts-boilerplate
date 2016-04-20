/**
 * namespace
 */
const parentNamespace = 'app';
export const namespace = `${parentNamespace}.home`;

/**
 * Import dependencies
 */
import Route from './home.routes.ts';
import HomeController from './home.controller.ts';

/**
 * Export module components
 *
 * @type {string}
 */
export const homeController = `${namespace}.HomeController`;
export const homeRoute = `${namespace}.HomeRoute`;

/**
 * Define and export angular setup for this module
 *
 * @type {string} returns angular FQDN module name
 */
export default angular.module(namespace, [])
  .component(homeRoute, new Route(homeController))
  .controller(homeController, HomeController)
  .name;
