import {AppConfig} from './../../app.config.ts';
import * as moment from 'moment'; // same as import moment = require('moment');

export default class Logger {

  public static INFO: string = 'info';
  public static DEBUG: string = 'debug';
  public static WARN: string = 'warn';
  public static ERROR: string = 'error';

  private _isInfoEnabled: boolean = false;
  private _isDebugEnabled: boolean = false;
  private _isWarnEnabled: boolean = false;
  private _isErrorEnabled: boolean = false;

  constructor(private _className: string) {
    if (Array.isArray(AppConfig.LOGGER) && AppConfig.LOGGER.length != 0) {
      this._isInfoEnabled = AppConfig.LOGGER.indexOf(Logger.INFO) >= 0;
      this._isDebugEnabled = AppConfig.LOGGER.indexOf(Logger.DEBUG) >= 0;
      this._isWarnEnabled = AppConfig.LOGGER.indexOf(Logger.WARN) >= 0;
      this._isErrorEnabled = AppConfig.LOGGER.indexOf(Logger.ERROR) >= 0;
    }
  }

  public get className(): string {
    return this._className;
  }

  public info(message: string): (...args) => void {
    return (...args) => {
      if (this._isInfoEnabled) {
        this._log(Logger.INFO, message, ...args);
      }
    };
  }

  public debug(message: string, ...args): (...args) => void {
    return (...args) => {
      if (this._isDebugEnabled) {
        this._log(Logger.DEBUG, message, ...args);
      }
    };
  }

  public warn(message: string, ...args): (...args) => void {
    return (...args) => {
      if (this._isWarnEnabled) {
        this._log(Logger.WARN, message, ...args);
      }
    };
  }

  public error(message: string, ...args): (...args) => void {
    return (...args) => {
      if (this._isErrorEnabled) {
        this._log(Logger.ERROR, message, ...args);
      }
    };
  }

  private _log(type: string, message: string, ...args): void {
    console[type](this.formatter(message), ...args);
  }

  private formatter(message: string): string {
    return `[${moment().format('YYYY-MM-DD HH:MM:SS:SSS')} - ${this.className}] ${message}:`;
  }

}
