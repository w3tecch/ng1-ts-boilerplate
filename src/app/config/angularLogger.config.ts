/**
 * Import dependencies
 */
import Logger from './../services/utils/logger.service.ts';

/**
 * Angular Logger Config
 */
const angularLogger = ($log) => {
  Logger.$log = $log;
};

angularLogger.$inject = ['$log'];

export default angularLogger;
