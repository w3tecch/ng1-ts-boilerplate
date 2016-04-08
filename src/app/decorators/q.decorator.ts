declare namespace angular {
  interface IPromise<T> {
    value(): T;
    reason(): any;
    isPending(): boolean;
    isFulfilled(): boolean;
    isRejected(): boolean;
  }
}

const factory = (delegate: ng.IQService): ng.IQService => {
  // dirty hack since type defs for IQService are wrong
  const resolve = (resolver: any) => (<any>delegate)(resolver);
  const decorator: ng.IQService = <any>resolve;

  decorator.all = (promises: ng.IPromise<any>[] | { [index: string]: ng.IPromise<any>; }): any => {
    if (Array.isArray(<any>promises)) {
      return new PromiseDecorator(delegate.all(<ng.IPromise<any>[]>promises));
    }

    return new PromiseDecorator(delegate.all(<{ [index: string]: ng.IPromise<any>; }>promises));
  };

  decorator.defer = <T>() => new DeferredDecorator(delegate.defer<T>());
  decorator.reject = (reason?) => new PromiseDecorator(delegate.reject(reason));
  decorator.when = <T>(value?: ng.IPromise<T> | T) => new PromiseDecorator(delegate.when(value));
  decorator.resolve = <T>(value?: ng.IPromise<T> | T) => new PromiseDecorator(delegate.resolve(value));

  return decorator;
};

factory.$inject = ['$delegate'];

const config = ($provide: ng.auto.IProvideService) => {
  $provide.decorator('$q', factory);
};

config.$inject = ['$provide'];

class PromiseDecorator<T> implements ng.IPromise<T> {
  private valueField: T = undefined;
  private reasonField: any = undefined;
  private isPendingField = true;
  private isFulfilledField = false;
  private isRejectedField = false;

  constructor(private delegate: ng.IPromise<T>) {
    delegate
      .then(v => {
        this.valueField = v;
        this.isFulfilledField = true;
      })
      .catch(e => {
        this.reasonField = e;
        this.isRejectedField = true;
      })
      .finally(() => this.isPendingField = false);
  }

  public then = <TResult>(
    successCallback: (promiseValue: T) => ng.IPromise<TResult> | TResult,
    errorCallback?: (reason: any) => any,
    notifyCallback?: (state: any) => any
  ) => new PromiseDecorator(this.delegate.then<TResult>(successCallback, errorCallback, notifyCallback));

  public catch = <TResult>(onRejected: (reason: any) => any) => new PromiseDecorator(this.delegate.catch<TResult>(onRejected));

  public finally = (finallyCallback: () => any) => new PromiseDecorator(this.delegate.finally(finallyCallback));

  public value = () => this.valueField;
  public reason = () => this.reasonField;
  public isPending = () => this.isPendingField;
  public isFulfilled = () => this.isFulfilledField;
  public isRejected = () => this.isRejectedField;
}

class DeferredDecorator<T> implements ng.IDeferred<T> {
  constructor(private delegate: ng.IDeferred<T>) { }

  public resolve = (value?: T) => this.delegate.resolve(value);
  public reject = (reason?) => this.delegate.reject(reason);
  public notify = (state?) => this.delegate.notify(state);

  public get promise(): ng.IPromise<T> {
    return new PromiseDecorator(this.delegate.promise);
  }
}

export default config;
