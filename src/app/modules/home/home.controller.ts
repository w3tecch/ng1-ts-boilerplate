import AppServicesModule from './../../services/services.module.ts';
import {Logger, LoggerService} from './../../services/logger.service';

export default class HomeController {
  static $inject = [
    AppServicesModule.IID.LoggerService
  ];

  public name: string;
  private _logger: Logger;

  constructor(_loggerService: LoggerService) {
    this._logger = _loggerService.create('app.services.HomeController');
    this._logger.info('constructor');
  }

}
