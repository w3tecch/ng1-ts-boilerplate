/**
 * The EventBus callback interface
 *
 * @export
 * @interface IEventBusCallback
 */
export interface IEventBusCallback {
  (...args): void;
}

/**
 * This is the EventBus service. This service isn't bound to the NG dependency/injection system
 *
 * @export
 * @class EventBus
 */
export class EventBus {

  /**
   * A list off all callbacks registered
   *
   * @private
   * @type {{ [event: string]: IEventBusCallback[] }}
   */
  private _callbacks: { [event: string]: IEventBusCallback[] };

  /**
   * Creates an instance of EventBus.
   */
  constructor() {
    this._callbacks = {};
  }

  /**
   * Returns a list off all currently registerd callbacks
   *
   * @returns {{ [event: string]: IEventBusCallback[] }}
   */
  public list(): { [event: string]: IEventBusCallback[] } {
    return this._callbacks;
  }

  /**
   * Let's you publishes an event to a specific channel
   *
   * @param {string} channel
   * @returns {(...args) => boolean}
   */
  public publish(channel: string): (...args) => boolean {
    return (...args) => {
      let callbacks = this._callbacks[channel] || [];
      let size = callbacks.length;
      callbacks.forEach(cb => cb(...args));
      return size < callbacks.length;
    };
  }

  /**
   * Let's you subscribe to a specific channel
   *
   * @param {string} channel
   * @returns {(callback: IEventBusCallback) => () => boolean}
   */
  public subscribe(channel: string): (callback: IEventBusCallback) => () => boolean {
    return (callback: IEventBusCallback) => {
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

/**
 * Export the Service
 */
export var eventBusService = new EventBus();
