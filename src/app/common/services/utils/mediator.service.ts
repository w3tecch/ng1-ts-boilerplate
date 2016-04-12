/**
 * The Mediator callback interface
 *
 * @export
 * @interface IMediatorCallback
 */
export interface IMediatorCallback {
  (...args): void;
}

/**
 * This is the Mediator service. This service isn't bound to the NG dependency/injection system
 *
 * @export
 * @class Mediator
 */
export class Mediator {

  /**
   * A list off all callbacks registered
   *
   * @private
   * @type {{ [event: string]: IMediatorCallback[] }}
   */
  private _callbacks: { [event: string]: IMediatorCallback[] };

  /**
   * Creates an instance of Mediator.
   */
  constructor() {
    this._callbacks = {};
  }

  /**
   * Returns a list off all currently registerd callbacks
   *
   * @returns {{ [event: string]: IMediatorCallback[] }}
   */
  public list(): { [event: string]: IMediatorCallback[] } {
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
   * @returns {(callback: IMediatorCallback) => () => boolean}
   */
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

/**
 * Export the Service
 */
export var mediatorService = new Mediator();
