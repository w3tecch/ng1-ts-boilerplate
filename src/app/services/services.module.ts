//import {LoggerService} from './logger.service.ts';

export default class AppServices {
  static class = 'app.services';
  static IID = {
    //LoggerService: `${AppServices.class}.LoggerService`
  };
  static events = {};
}

angular.module(AppServices.class, []);
//.service(AppServices.IID.LoggerService, LoggerService);

