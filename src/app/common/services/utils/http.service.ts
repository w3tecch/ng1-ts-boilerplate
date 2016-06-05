/**
 * Import dependencies
 */
import AppConfig from './../../../app.config.ts';

export interface IHttpRequestConfig {
  url: string;
  headers?: Object;
  params?: any;
  skipAuthorization?: boolean;
}

/**
 * @name IHttpUtilService
 * @description
 * This wrapper service build http request with the
 * needed information like headers.
 */
export interface IHttpUtilService {
  /**
   * Create request to create a new object at the database
   */
  create(config: IHttpRequestConfig, data: any): ng.IPromise<any>;
  /**
   * Reads items from the backend
   */
  read(config: IHttpRequestConfig): ng.IPromise<any>;
  /**
   * Updated the given item at the backends database
   */
  update(config: IHttpRequestConfig, data: any): ng.IPromise<any>;
  /**
   * Deletes the given item at the backends database
   */
  destroy(config: IHttpRequestConfig): ng.IPromise<any>;
  /**
   * This is a helper method for custom requests
   */
  custom(config: IHttpRequestConfig, method: string, data?: any)
    : ng.IPromise<any>;
  /**
   * Returns the backend url from the app config
   */
  getBackendUrl(): string;
}

/**
 * @name IHttpUtilService
 * @requires $http
 */
class HttpUtilService implements IHttpUtilService {

  public static $inject = [
    '$q',
    '$http'
  ];
  /**
   * Creates an instance of HttpUtilService.
   *
   * @param {ng.IQService} $q (description)
   * @param {angular.IHttpService} $http (description)
   */
  constructor(
    private $q: ng.IQService,
    private $http: angular.IHttpService
  ) {
  }

  /**
   * Create request
   *
   * @param {string} url Without the base endpoint
   * @param {*} data The request data
   * @param {*} [params] The request params
   * @param {boolean} [skipAuthorization=false] If checked the autorization will be skiped
   * @returns {ng.IPromise<any>} Return respone as promise
   */
  public create(config: IHttpRequestConfig, data: any): ng.IPromise<any> {
    return this.request(config, 'POST', data);
  }

  /**
   * Read request
   *
   * @param {string} url Without the base endpoint
   * @param {*} [params] The request params
   * @param {boolean} [skipAuthorization=false] If checked the autorization will be skiped
   * @returns {ng.IPromise<any>} Return respone as promise
   */
  public read(config: IHttpRequestConfig): ng.IPromise<any> {
    return this.request(config, 'GET');
  }

  /**
   * Update request
   *
   * @param {string} url Without the base endpoint
   * @param {*} data The request data
   * @param {*} [params] The request params
   * @param {boolean} [skipAuthorization=false] If checked the autorization will be skiped
   * @returns {ng.IPromise<any>} Return respone as promise
   */
  public update(config: IHttpRequestConfig, data: any): ng.IPromise<any> {
    return this.request(config, 'PUT', data);
  }

  /**
   * Destroy request
   *
   * @param {string} url Without the base endpoint
   * @param {*} [params] The request data
   * @param {boolean} [skipAuthorization=false] If checked the autorization will be skiped
   * @returns {ng.IPromise<any>} Return respone as promise
   */
  public destroy(config: IHttpRequestConfig): ng.IPromise<any> {
    return this.request(config, 'DELETE');
  }

  /**
   * Custom request
   *
   * @param {string} method The request verb
   * @param {string} url Without the base endpoint
   * @param {*} [params] The request params
   * @param {*} [data] The request data
   * @param {*} [headers] The request headers
   * @param {boolean} [skipAuthorization=false] If checked the autorization will be skiped
   * @returns {ng.IPromise<any>} Return respone as promise
   */
  public custom(config: IHttpRequestConfig, method: string, data?: any): ng.IPromise<any> {
    return this.request(config, method, data);
  }

  /**
   * Returns the configured backend url
   *
   * @returns {string}
   */
  public getBackendUrl(): string {
    return AppConfig.ENV.API_URL;
  }

  /**
   * A generic request method
   *
   * @private
   * @param {string} method The request verb
   * @param {string} url Without the base endpoint
   * @param {boolean} skipAuthorization If checked the autorization will be skiped
   * @param {*} [params]  The request params
   * @param {*} [data] The request data
   * @param {*} [headers] The request headers
   * @returns {ng.IPromise<any>} Return respone as promise
   */
  private request(config: IHttpRequestConfig, method: string, data?: any): ng.IPromise<any> {

    const defaultHeaders = {
      'Accept': `application/json`,
      'Content-Type': `application/json`
    };

    const request = angular.extend({}, config);
    request.headers = angular.extend(defaultHeaders, request.headers);
    request.method = method;
    request.url = AppConfig.ENV.API_URL + request.url;
    request.skipAuthorization = request.skipAuthorization || false;
    request.data = data;

    let def = this.$q.defer();

    this.$http(request)
        .then(response => {
          def.resolve(response.data);
        }, response => {
          def.reject(response);
        });

    return def.promise;
  }
}

export const httpService = `${module.id}.httpService`;
export default angular.module(httpService, [])
  .service(httpService, HttpUtilService)
  .name;
