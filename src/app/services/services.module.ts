//import {LoggerService} from './logger.service.ts';

export default class AppServices {
  public static class = 'app.services';
  public static IID = {
    //LoggerService: `${AppServices.class}.LoggerService`
  };
  public static events = {};
}

angular.module(AppServices.class, []);
//.service(AppServices.IID.LoggerService, LoggerService);

