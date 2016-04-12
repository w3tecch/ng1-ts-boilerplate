/**
 * Import dependencies
 */
import Logger from './../../common/services/utils/logger.service.ts';
import {mediatorService} from './../../common/services/utils/mediator.service.ts';

/**
 * An example Controller
 *
 * @class HomeController
 */
class HomeController {
  public name: string;
  private _logger: Logger;

  /**
   * static inject
   *
   * @static $inject
   */
  public static $inject = [];

  /**
   * Creates an instance of HomeController.
   */
  constructor() {

    // Example logger
    this._logger = new Logger('app.services.HomeController');
    let exampleInfoLogger = this._logger.debug('logger:example');
    exampleInfoLogger('1');
    exampleInfoLogger('2');

    // Example mediator
    let testChannelSubscriber = mediatorService.subscribe('mediator:example');
    testChannelSubscriber((a) => {
      this._logger.debug('mediator:example')(a);
    });

    let testChannelPublisher = mediatorService.publish('mediator:example');
    testChannelPublisher('gugus 1');
    testChannelPublisher('gugus 2');

  }

  /**
   * An example method
   *
   * @returns {string} returns 'Hello'
   */
  public sayHello(): string {
    return 'Hello';
  }
}

export default HomeController;
