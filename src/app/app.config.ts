/**
 * Environment Config
 */
declare var ENV: string;
declare var NAME: string;
declare var VERSION: string;
declare var API_URL: string;
declare var LOGGER: string[];

export interface IAppConfig {
  ENV: string;
  NAME: string;
  VERSION: string;
  API_URL: string;
  LOGGER: string[];
}

export const AppConfig: IAppConfig = {
  ENV: ENV,
  NAME: NAME,
  VERSION: VERSION,
  API_URL: API_URL,
  LOGGER: LOGGER,
};

/**
 * Angular Router Config
 */
export var RouterConfig = ($locationProvider) => {
  $locationProvider.html5Mode(true);
};

RouterConfig.$inject = ['$locationProvider'];
