/**
 * namespace
 */
import { namespace as parentNamespace } from './../../app.ts';
export const namespace = `${parentNamespace}.services`;

/**
 * Import dependencies
 */

/**
 * Define and export angular setup for this module
 *
 * @type {string} returns angular FQDN module name
 */
export default angular.module(namespace, [])
  .name;
