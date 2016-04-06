/**
 * Environment Config
 */
declare var ENV: string;
declare var NAME: string;
declare var VERSION: string;
declare var API_URL: string;
declare var LOG_LEVEL: string;

export interface IAppConfig {
  ENV: string;
  NAME: string;
  VERSION: string;
  API_URL: string;
  LOG_LEVEL: string;
}

export const AppConfig: IAppConfig = {
  ENV: ENV,
  NAME: NAME,
  VERSION: VERSION,
  API_URL: API_URL,
  LOG_LEVEL: LOG_LEVEL,
};
