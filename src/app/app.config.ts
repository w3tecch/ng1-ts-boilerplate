/**
 * Environment Config
 */
declare var ENV: string;
declare var NAME: string;
declare var VERSION: string;
declare var API_URL: string;

export interface IAppConfig {
  ENV: string;
  NAME: string;
  VERSION: string;
  API_URL: string;
}

export const AppConfig: IAppConfig = {
  ENV: ENV,
  NAME: NAME,
  VERSION: VERSION,
  API_URL: API_URL,
};

/**
 * Angular Router Config
 */
export var RouterConfig = ($urlRouterProvider) => {
  console.info('RouterConfig');
  $urlRouterProvider.otherwise('/');
};

RouterConfig.$inject = ['$urlRouterProvider'];
