/**
 * Import dependencies
 */
import {AppConfig} from './../../app.config.ts';
import * as moment from 'moment';

/**
 * This interface exposes the available log mehtods
 *
 * @interface ILoggerMethods
 */
interface ILoggerMethods {
  DEBUG: string;
  INFO: string;
  WARN: string;
  ERROR: string;
}

/**
 * This enum holds all valid log levels
 *
 * @export
 * @enum {number}
 */
export enum ILoggerLevel {
  DEBUG = 1,
  INFO  = 2,
  WARN  = 3,
  ERROR = 4,
  NONE  = 5
}

/**
 * A cross browser logger service
 *
 * @class Logger
 */
class Logger {

  /**
   * An map with available log levels
   *
   * @static
   * @type {ILoggerMethods}
   */
  public static METHOD: ILoggerMethods = {
    DEBUG: 'debug',
    INFO: 'info',
    WARN: 'warn',
    ERROR: 'error'
  };

  /**
   * The angular log service which will be injected by a ng run block
   * in the configuration section
   *
   * @static
   * @type {ng.ILogService}
   */
  public static $log: ng.ILogService;

  /**
   * The current configuired log level per instance
   *
   * @private
   * @type {number}
   */
  private _level: number = ILoggerLevel.NONE;

  /**
   * Creates an instance of Logger.
   *
   * @param {string} _className A namespace to identify where the log msg is comming from
   */
  constructor(private _className: string) {
    switch (AppConfig.LOG_LEVEL.toLowerCase()) {
      case Logger.METHOD.DEBUG:
        this._level = ILoggerLevel.DEBUG;
        break;

      case Logger.METHOD.INFO:
        this._level = ILoggerLevel.INFO;
        break;

      case Logger.METHOD.WARN:
        this._level = ILoggerLevel.WARN;
        break;

      case Logger.METHOD.ERROR:
        this._level = ILoggerLevel.ERROR;
        break;

      default:
        this._level = ILoggerLevel.NONE;
    }
  }

  /**
   * Get the currently configured namespace of the instance
   *
   * @readonly
   * @type {string}
   */
  public get className(): string {
    return this._className;
  }

  /**
   * Log a debug message to the console
   *
   * @param {string} message
   * @returns {(...args) => void}
   */
  public debug(message: string): (...args) => void {
    return (...args) => {
      if (this._level <= ILoggerLevel.DEBUG) {
        this._log(Logger.METHOD.DEBUG, message, ...args);
      }
    };
  }

  /**
   * Log a info message to the console
   *
   * @param {string} message
   * @returns {(...args) => void}
   */
  public info(message: string): (...args) => void {
    return (...args) => {
      if (this._level <= ILoggerLevel.INFO) {
        this._log(Logger.METHOD.INFO, message, ...args);
      }
    };
  }

  /**
   * Log a warn message to the console
   *
   * @param {string} message
   * @returns {(...args) => void}
   */
  public warn(message: string): (...args) => void {
    return (...args) => {
      if (this._level <= ILoggerLevel.WARN) {
        this._log(Logger.METHOD.WARN, message, ...args);
      }
    };
  }

  /**
   * Log a error message to the console
   *
   * @param {string} message
   * @returns {(...args) => void}
   */
  public error(message: string): (...args) => void {
    return (...args) => {
      if (this._level <= ILoggerLevel.ERROR) {
        this._log(Logger.METHOD.ERROR, message, ...args);
      }
    };
  }

  /**
   * A generic log message method which acutally posts the log msg
   *
   * @private
   * @param {string} type the log level
   * @param {string} message
   * @param args
   */
  private _log(type: string, message: string, ...args): void {
    Logger.$log[type](this.formatter(message), ...args);
  }

  /**
   * This method formats the message to a more percic format
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
