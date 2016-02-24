import Logger from './../../services/utils/logger.service.ts';
import {mediatorService} from './../../services/utils/mediator.service.ts';

export default class HomeController {
  public static $inject = [];

  public name: string;
  private _logger: Logger;

  constructor() {
    this._logger = new Logger('app.services.HomeController');
    this._logger.info('Test');

    let testChannelSubscriber = mediatorService.subscribe('test:channel');
    testChannelSubscriber((a) => {
      this._logger.info('test:channel', a);
    });

    let testChannelPublisher = mediatorService.publish('test:channel');
    testChannelPublisher('gugus 1');
    testChannelPublisher('gugus 2');
  }

  public sayHello(): string {
    return 'Hello';
  }

}
