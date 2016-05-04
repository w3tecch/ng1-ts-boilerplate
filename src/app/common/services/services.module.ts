/**
 * namespace
 */
const parentNamespace = 'app';
export const namespace = `${parentNamespace}.services`;

import HttpService from './utils/http.service.ts';

/**
 * Define and export angular setup for this module
 *
 * @type {string} returns angular FQDN module name
 */
export default angular.module(namespace, [
  HttpService
]).name;
