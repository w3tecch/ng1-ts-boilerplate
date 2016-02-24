import Logger from './../../services/utils/logger.service.ts';
import {mediatorService} from './../../services/utils/mediator.service.ts';
import {momentService} from './../../services/utils/moment.service.ts';

export default class HomeController {
  public static $inject = [];

  public name: string;
  private _logger: Logger;

  constructor() {

    // Example logger
    this._logger = new Logger('app.services.HomeController');
    let exampleInfoLogger = this._logger.info('logger:example');
    exampleInfoLogger('1');
    exampleInfoLogger('2');

    // Example mediator
    let testChannelSubscriber = mediatorService.subscribe('mediator:example');
    testChannelSubscriber((a) => {
      this._logger.info('mediator:example')(a);
    });

    let testChannelPublisher = mediatorService.publish('mediator:example');
    testChannelPublisher('gugus 1');
    testChannelPublisher('gugus 2');

    //Example moment
    let key = 'bubu';
    let data = { bubu: true };
    momentService.set(key)(data);
    this._logger.info('moment:example')(momentService.get(key));

  }

  public sayHello(): string {
    return 'Hello';
  }

}
