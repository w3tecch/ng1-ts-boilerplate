export interface IMediatorCallback {
  (...args): void;
}

export class Mediator {

  private _callbacks: { [event: string]: IMediatorCallback[] };

  constructor() {
    this._callbacks = {};
  }

  public list(): { [event: string]: IMediatorCallback[] } {
    return this._callbacks;
  }

  public publish(channel: string): (...args) => boolean {
    return (...args) => {
      let callbacks = this._callbacks[channel] || [];
      let size = callbacks.length;
      callbacks.forEach(cb => cb(...args));
      return size < callbacks.length;
    };
  }

  public subscribe(channel: string): (callback: IMediatorCallback) => () => boolean {
    return (callback: IMediatorCallback) => {
      let callbacks = this._callbacks[channel] || (this._callbacks[channel] = []);
      callbacks.push(callback);

      // destroy function
      return () => {
        let idx = callbacks.indexOf(callback);
        if (idx >= 0) {
          callbacks.splice(idx, 1);
        }

        if (callbacks.length === 0) {
          delete this._callbacks[channel];
        }

        return idx >= 0;
      };
    };
  }
}

export var mediatorService = new Mediator();
