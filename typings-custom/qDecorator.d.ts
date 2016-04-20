declare namespace angular {
  interface IPromise<T> {
    value(): T;
    reason(): any;
    isPending(): boolean;
    isFulfilled(): boolean;
    isRejected(): boolean;
  }
}