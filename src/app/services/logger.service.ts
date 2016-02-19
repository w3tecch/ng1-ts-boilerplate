export class Logger {

  private _isInfoEnabled: boolean = true;
  private _isDebugEnabled: boolean = true;
  private _isWarnEnabled: boolean = true;
  private _isErrorEnabled: boolean = true;

  constructor(private className: string,
              private _$log: angular.ILogService) {
    console.info('Logger', this.className);
  }

  public info(message: string) {
    if (this._isInfoEnabled) {
      this._log('info', message);
    }
  }

  public debug(message: string) {
    if (this._isDebugEnabled) {
      this._log('debug', message);
    }
  }

  public warn(message: string) {
    if (this._isWarnEnabled) {
      this._log('warn', message);
    }
  }

  public error(message: string) {
    if (this._isErrorEnabled) {
      this._log('error', message);
    }
  }

  private _log(type: string, message: string) {
    this._$log[type](this.formatter(message));
  }

  private formatter(message: string) {
    //return `[${moment().format('HH:MM:SS')} - ${this.className}] - ${message}`;
    return `[${new Date()} - ${this.className}] - ${message}`;
  }

}

export class LoggerService {
  static $inject = [
    '$log'
  ];

  constructor(private _$log: angular.ILogService) {
    console.info('LoggerService');
  }

  create(className: string) {
    return new Logger(className, this._$log);
  }

}
