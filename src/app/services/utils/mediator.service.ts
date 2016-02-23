export interface IMediatorCallback{
  (...args): void;
}

export class Mediator {

  private _callbacks: { [event: string]: IMediatorCallback[] };

  constructor() {
    this._callbacks = {};
  }

  public list() {
    return this._callbacks;
  }

  public publish(channel: string, ...args) {
    var callbacks = this._callbacks[channel] || [];
    callbacks.forEach(cb => cb(...args));
    return callbacks.length;
  }

  public subscribe(channel: string, callback: IMediatorCallback) {
    var callbacks = this._callbacks[channel] || (this._callbacks[channel] = []);
    callbacks.push(callback);

    // destroy function
    return () => {
      var idx = callbacks.indexOf(callback);
      if (idx >= 0) {
        callbacks.splice(idx, 1);
      }

      if (callbacks.length === 0) {
        delete this._callbacks[channel];
      }

      return idx >= 0;
    };
  }


}


//  export interface IEventHandlerUtilService {
//    /**
//     * Returns all registered event callbacks.
//     */
//    list(): { [event: string]: IEventCallback<any>[] };
//
//    /**
//     * Register a callback for the given events. Returns
//     * a disposal function that unregisters the callback
//     * when called.
//     */
//    on<T>(event: string, callback: IEventCallback<T>): () => boolean;
//
//    /**
//     * Invoke all callbacks registered for the given event with
//     * the given data. Returns the number of callbacks invoked.
//     */
//    broadcast<T>(event: string, eventObject?: T): number;
//  }
//
//  export interface IEventCallback<T> {
//    (eventObj?: T): void;
//  }
//
//  class EventHandlerUtilService implements IEventHandlerUtilService {
//    private eventCallbacks: { [event: string]: IEventCallback<any>[] };
//
//    constructor() {
//      this.eventCallbacks = {};
//    }
//
//    list() {
//      return this.eventCallbacks;
//    }
//
//    broadcast<T>(event: string, eventObject?: T) {
//      var callbacks = this.eventCallbacks[event] || [];
//      callbacks.forEach(cb => cb(eventObject));
//      return callbacks.length;
//    }
//
//    on<T>(event: string, callback: IEventCallback<T>) {
//      var callbacks = this.eventCallbacks[event] || (this.eventCallbacks[event] = []);
//      callbacks.push(callback);
//
//      // destroy function
//      return () => {
//        var idx = callbacks.indexOf(callback);
//        if (idx >= 0) {
//          callbacks.splice(idx, 1);
//        }
//
//        if (callbacks.length === 0) {
//          delete this.eventCallbacks[event];
//        }
//
//        return idx >= 0;
//      };
//    }
//
//  }
//
//  angular
//    .module(Namespace)
//    .service(IID.EventHandlerUtilService, EventHandlerUtilService);
//
//}
