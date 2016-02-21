import moment = require('moment');

export default class Logger {

  public static INFO: string = 'info';
  public static DEBUG: string = 'debug';
  public static WARN: string = 'warn';
  public static ERROR: string = 'error';

  private _isInfoEnabled: boolean = true;
  private _isDebugEnabled: boolean = true;
  private _isWarnEnabled: boolean = true;
  private _isErrorEnabled: boolean = true;

  constructor(private className: string) {
    console.info('Logger', this.className);
  }

  public info(message: string, ...args): void {
    if (this._isInfoEnabled) {
      this._log(Logger.INFO, message, ...args);
    }
  }

  public debug(message: string, ...args): void {
    if (this._isDebugEnabled) {
      this._log(Logger.DEBUG, message, ...args);
    }
  }

  public warn(message: string, ...args): void {
    if (this._isWarnEnabled) {
      this._log(Logger.WARN, message, ...args);
    }
  }

  public error(message: string, ...args): void {
    if (this._isErrorEnabled) {
      this._log(Logger.ERROR, message, ...args);
    }
  }

  private _log(type: string, message: string, ...args): void {
    console[type](this.formatter(message), ...args);
  }

  private formatter(message: string): string {
    return `[${moment().format('YYYY-MM-DD HH:MM:SS:SSS')} - ${this.className}] ${message}:`;
  }

}
