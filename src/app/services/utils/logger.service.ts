/**
 * Import dependencies
 */
import {AppConfig} from './../../app.config.ts';
import * as moment from 'moment'; // same as import moment = require('moment');

/**
 * The logger serivce to log based on loglevels
 *
 * @class Logger
 */
class Logger {

  /**
   * LogLevel info
   *
   * @static
   * @type {string}
   */
  public static INFO: string = 'info';

  /**
   * LogLevel debug
   *
   * @static
   * @type {string}
   */
  public static DEBUG: string = 'debug';

  /**
   * LogLevel warn
   *
   * @static
   * @type {string}
   */
  public static WARN: string = 'warn';

  /**
   * LogLevel error
   *
   * @static
   * @type {string}
   */
  public static ERROR: string = 'error';

  private _isInfoEnabled: boolean = false;
  private _isDebugEnabled: boolean = false;
  private _isWarnEnabled: boolean = false;
  private _isErrorEnabled: boolean = false;

  constructor(private _className: string) {
    if (Array.isArray(AppConfig.LOGGER) && AppConfig.LOGGER.length !== 0) {
      this._isInfoEnabled = AppConfig.LOGGER.indexOf(Logger.INFO) >= 0;
      this._isDebugEnabled = AppConfig.LOGGER.indexOf(Logger.DEBUG) >= 0;
      this._isWarnEnabled = AppConfig.LOGGER.indexOf(Logger.WARN) >= 0;
      this._isErrorEnabled = AppConfig.LOGGER.indexOf(Logger.ERROR) >= 0;
    }
  }

  public get className(): string {
    return this._className;
  }

  /**
   * Log an info message to the console
   *
   * @param {string} message
   * @returns {(...args) => void}
   */
  public info(message: string): (...args) => void {
    return (...args) => {
      if (this._isInfoEnabled) {
        this._log(Logger.INFO, message, ...args);
      }
    };
  }

  /**
   * Log an debug message to the console
   *
   * @param {string} message
   * @returns {(...args) => void}
   */
  public debug(message: string, ...args): (...args) => void {
    return (...args) => {
      if (this._isDebugEnabled) {
        this._log(Logger.DEBUG, message, ...args);
      }
    };
  }

  /**
   * Log an warn message to the console
   *
   * @param {string} message
   * @returns {(...args) => void}
   */
  public warn(message: string, ...args): (...args) => void {
    return (...args) => {
      if (this._isWarnEnabled) {
        this._log(Logger.WARN, message, ...args);
      }
    };
  }

  /**
   * Log an error message to the console
   *
   * @param {string} message
   * @returns {(...args) => void}
   */
  public error(message: string, ...args): (...args) => void {
    return (...args) => {
      if (this._isErrorEnabled) {
        this._log(Logger.ERROR, message, ...args);
      }
    };
  }

  /**
   * Generic log method
   *
   * @private
   * @param {string} type The log type
   * @param {string} message
   * @param args Arguments to handover to the browser console logger
   */
  private _log(type: string, message: string, ...args): void {
    console[type](this.formatter(message), ...args);
  }

  /**
   * Formats the log message
   *
   * @private
   * @param {string} message
   * @returns {string}
   */
  private formatter(message: string): string {
    return `[${moment().format('YYYY-MM-DD HH:MM:SS:SSS')} - ${this.className}] ${message}:`;
  }

}

/**
 * Export the Service
 */
export default Logger;
