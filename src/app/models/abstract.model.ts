/**
 * Import dependencies
 */
import * as moment from 'moment';
import { IHttpUtilService } from './../common/services/utils/http.service.ts';

/**
 * The attributes interface
 *
 * @export
 * @interface IModelFillAbles
 */
export interface IModelFillAbles {
  [key: string]: IModelFillAblesTypes | IModelFillAbles | Function;
}

/**
 * The available types
 *
 * @export
 * @enum {number}
 */
export enum IModelFillAblesTypes {
  NUMBER,
  FLOAT,
  STRING,
  BOOL,
  DATE,
  TIME,
  OBJECT,
  ARRAY,
  FORM_DATA
}

export type IModelIdentifier = string | number;

export type IModelAttributes = Object;

/**
 * The Abstract model interface
 *
 * @export
 * @interface IAbstractModel
 */
export interface IAbstractModel<K> {
  getRootUrl(): string;
  attributes: K;
  isNew(): boolean;
  save<T>(): ng.IPromise<T>;
  destroy<T>(): ng.IPromise<T>;
  resetAttributes(): K;
  toArray(): K;
  bulkUpdateAttrs(list: Object): K;
  getId(): IModelIdentifier;
}

interface IConstruct {
  name: string;
}

/**
 * The Abstract model
 *
 * @abstract
 * @class AbstractModel
 * @implements {IAbstractModel}
 */
abstract class AbstractModel<K extends IModelAttributes, J extends IAbstractModel<K>> implements IAbstractModel<K> {

  /**
   * HttpService
   *
   * @static
   * @type {IHttpUtilService}
   */
  public static httpService: IHttpUtilService;

  /**
   * This hold the attributes you are action on
   *
   * @type {IModelAttributes}
   */
  public attributes: K = <K>{};

  /**
   * Identifier
   * This can be overwriten by a direved class if needed
   *
   * @protected
   * @type {string}
   */
  protected identifier: string = 'id';

  /**
   * Default time format which is used in your backend
   *
   * @protected
   * @type {string}
   */
  protected httpDateFormat: string = 'YYYY-MM-DD HH:mm:ss';

  /**
   * This holds you attributes from the backend
   *
   * @protected
   * @type {IModelAttributes}
   */
  protected original: K = <K>{};

  protected headers: Object;

  /**
   * Constructor
   * @param model
   * @param attrs
   */
  constructor(attrs?: Object) {
    if (attrs) { this.fill(attrs); } else { this.fillEmpty(); }
    const headerValue = `application/vnd.scp.${this.getVersion()}+json`;
    this.headers = {
      'Accept': headerValue,
      'Content-Type': headerValue
    };
  }

  /**
   * The model root url, will be used to construct API-URL.
   * @returns root url, e.g. 'users' for api calls against <BASE-URL>/users
   */
  public abstract getRootUrl(): string;

  /**
   * @returns The version used in the Accept and Content-Type headers.
   */
  public abstract getVersion(): string;

  /**
   * Tells if the model is new
   *
   * @returns {boolean}
   */
  public isNew(): boolean { return this.getId() === undefined; }

  /**
   * Find one model
   *
   * @param {IModelIdentifier} id
   * @returns {ng.IPromise<IAbstractModel>}
   */
  public find(id: IModelIdentifier): ng.IPromise<J> {
    return this.get(id);
  }

  /**
   * Find all models
   *
   * @returns {ng.IPromise<IAbstractModel[]>}
   */
  public findAll(): ng.IPromise<J[]> {
    return this.getAll();
  }

  /**
   * Find one or all model with a different url
   *
   * @param {string} url This will replace the complete url after the base endpoint
   * @returns {(ng.IPromise<IAbstractModel | IAbstractModel[]>)}
   */
  public findCustom(url: string): ng.IPromise<J | J[]> {
    return this.customGet(url);
  }

  /**
   * A generic request method
   *
   * @param {string} method The http verb
   * @param {string} url The url without the base endpoint
   * @param params The request params
   * @param data The request data
   * @param headers The request headers
   * @param {boolean} skipAuth Shoud the authorization be skiped
   * @returns {(ng.IPromise<IAbstractModel | IAbstractModel[] | void>)} Return a promise
   */
  public customRequest(method: string, url: string, params, data, headers, skipAuth: boolean)
  : ng.IPromise<J | J[] | void> {
    return this.customRequestCall(method, url, params, data, headers, skipAuth);
  }

  /**
   * Saves the actin model
   *
   * @returns {ng.IPromise<IAbstractModel>}
   */
  public save(): ng.IPromise<J> {
    return this.isNew() ?
      this.create(this.convertToHttpData(this.toArray())) : this.update(this.convertToHttpData(this.toArray()));
  }

  /**
   * Destories the actin model
   *
   * @returns {ng.IPromise<void>}
   */
  public destroy(identifier?: IModelIdentifier): ng.IPromise<void> {
    return this.delete((identifier || this.original[this.identifier]));
  }

  /**
   * Resets the attribtes from the original
   *
   * @returns {IModelAttributes}
   */
  public resetAttributes(): K { return this.attributes = angular.copy(this.original); }

  /**
   * Convert the actin model to an array
   *
   * @returns {IModelAttributes}
   */
  public toArray(): K { return this.attributes; }

  /**
   * You can update multipe attributes at once
   *
   * @param {IModelAttributes} list
   * @returns {IModelAttributes}
   */
  public bulkUpdateAttrs(list: Object): K {
    return angular.merge(this.attributes, this.fillDeep(list, this.fillAbles()));
  }

  /**
   * Get the identifier attribute value
   *
   * @returns {IModelIdentifier}
   */
  public getId(): IModelIdentifier { return <IModelIdentifier>this.attributes[this.identifier]; }

  /**
   * Find a specific model
   *
   * @protected
   * @param {IModelIdentifier} id
   * @returns {ng.IPromise<IAbstractModel>}
   */
  protected get(id: IModelIdentifier): ng.IPromise<J> {
    return AbstractModel.httpService
        .read({url: `/${this.getRootUrl()}/${id}`, headers: this.headers})
        .then(r => <J>this.newModel(r));
  }

  /**
   * Find all models
   *
   * @protected
   * @returns {ng.IPromise<IAbstractModel[]>}
   */
  protected getAll(): ng.IPromise<J[]> {
    return AbstractModel.httpService
        .read({url: `/${this.getRootUrl()}`, headers: this.headers}).then(r => <J[]>this.newModel(r));
  }

  /**
   * Find a specific related model from the actin model
   *
   * @public
   * @param {IModelIdentifier} localId
   * @param {string} relation
   * @param {IModelIdentifier} foreignId
   * @returns {ng.IPromise<IAbstractModel>}
   */
  public findRelation (
    localId: IModelIdentifier,
    relation:  { new(): IAbstractModel<any> },
    foreignId: IModelIdentifier,
    parent: boolean = false
  ): ng.IPromise<IAbstractModel<any>> {
    let relationModel = new relation();
    if (parent) {
      return AbstractModel.httpService
          .read({
            url: `/${relationModel.getRootUrl()}/${foreignId}/${this.getRootUrl()}/${localId}`,
            headers: this.headers
          })
          .then(r => <IAbstractModel<any>>this.newModel(r));
    } else {
      return AbstractModel.httpService
          .read({
            url: `/${this.getRootUrl()}/${localId}/${relationModel.getRootUrl()}/${foreignId}`,
            headers: this.headers
          })
          .then(r => <IAbstractModel<any>>this.newModel(r, relation));
    }
  }

  /**
   * Find all related models form the actin model
   *
   * @public
   * @param {string} localId
   * @param {string} relation
   * @returns {ng.IPromise<IAbstractModel[]>}
   */
  public allRelation (
      localId: IModelIdentifier,
      relation: { new(): IAbstractModel<any> },
      parent: boolean = false
  ): ng.IPromise<IAbstractModel<any>[]> {
    let relationModel = new relation();
    if (parent) {
      return AbstractModel.httpService
          .read({
            url: `/${relationModel.getRootUrl()}/${localId}/${this.getRootUrl()}`,
            headers: this.headers
          })
          .then(r => <IAbstractModel<any>[]>this.newModel(r));
    } else {
      return AbstractModel.httpService
          .read({
            url: `/${this.getRootUrl()}/${localId}/${relationModel.getRootUrl()}`,
            headers: this.headers
          })
          .then(r => <IAbstractModel<any>[]>this.newModel(r, relation));
    }
  }

  /**
   * Here is a mighty custom reader
   *
   * @protected
   * @param {string} url
   * @returns {(ng.IPromise<IAbstractModel | IAbstractModel[]>)}
   */
  protected customGet(url: string): ng.IPromise<J | J[]> {
    return AbstractModel.httpService.read({url: url, headers: this.headers}).then(r => <J | J[]>this.newModel(r));
  }

  /**
   * Here is a mighty custom request method
   *
   * @protected
   * @param {string} method The http verb
   * @param {string} url The url without the base endpoint
   * @param params The request params
   * @param data The request data
   * @param headers The request headers
   * @param {boolean} skipAuth Shoud the authorization be skiped
   * @returns {(ng.IPromise<IAbstractModel | IAbstractModel[] | void>)} Return a promise
   */
  protected customRequestCall(method: string, url: string, params, data, headers, skipAuth: boolean)
  : ng.IPromise<J | J[] | void> {
    return AbstractModel.httpService
        .custom({url: url, params: params, headers: headers, skipAuthorization: skipAuth}, method, data);
  }

  /**
   * Create a model
   *
   * @protected
   * @param {IModelAttributes} data
   * @returns {ng.IPromise<IAbstractModel>}
   */
  protected create(data: K): ng.IPromise<J> {
    return AbstractModel.httpService
        .create({
          url: `/${this.getRootUrl()}`,
          headers: this.headers
        }, data)
        .then(r => <J>this.newModel(r));
  }

  /**
   * Update a model
   *
   * @protected
   * @param {IModelAttributes} data
   * @returns {ng.IPromise<IAbstractModel>}
   */
  protected update(data: K): ng.IPromise<J> {
    return AbstractModel.httpService
        .update({
          url: `/${this.getRootUrl()}/${this.getId()}`,
          headers: this.headers
        }, data)
        .then(r => <J>this.newModel(r));
  }

  /**
   * Destories a model
   *
   * @protected
   * @param {IModelIdentifier} id
   * @returns {ng.IPromise<void>}
   */
  protected delete(id: IModelIdentifier): ng.IPromise<void> {
    return AbstractModel.httpService
        .destroy({
          url: `/${this.getRootUrl()}/${id}`,
          headers: this.headers
        })
        .then(r => void 0);
  }

  /**
   * You have to define fillAbles, these are your attributes
   *
   * @protected
   * @abstract
   * @returns {IModelFillAbles}
   */
  protected abstract fillAbles(): IModelFillAbles;

  /**
   * You have to define fillAblesCU, these are your create/update attributes
   *
   * @protected
   * @abstract
   * @returns {IModelFillAbles}
   */
  protected abstract fillAblesCU(): IModelFillAbles;

  /**
   * Converts attributes to HTTP data
   *
   * @private
   * @param {IModelAttributes} attrs
   * @returns {IModelAttributes}
   */
  private convertToHttpData(attrs: K): K {
    return <K>this.fillDeep(attrs, this.fillAblesCU(), true);
  };

  /**
   * This will create a new model(s) no matter what happens
   *
   * @private
   * @param {*} data
   * @returns {(IAbstractModel | IAbstractModel[])}
   */
  private newModel(data: Array<Object> | Object, otherModel?: any): IAbstractModel<any> | IAbstractModel<any>[] {
    let model = otherModel ? otherModel : this.constructor;
    return data && Array.isArray(data) && data.map(e => new model(e)) ||
    data && Object.keys(data).length > 0 && new model(data) ||
    data && Array.isArray(data) && [] ||
    data && {} ||
    undefined;
  }

  /**
   * Fill up your model with attributes
   *
   * @private
   * @param {IModelAttributes} attrs
   * @returns {IModelAttributes}
   */
  private fill(attrs: Object): void {
    this.original = <K>this.fillDeep(attrs, this.fillAbles());
    this.resetAttributes();
  }

  private fillDeep (attrs: Object, fillAbles: IModelFillAbles, toHttp: boolean = false): Object {
    const convert = toHttp ? this.convertToHttpType.bind(this) : this.convertToType.bind(this);
    const fillAblesKeys = Object.keys(fillAbles);
    let obj = {};
    fillAblesKeys.forEach(key => {
      if (this.isDefined(attrs[key])) {
        obj[key] = typeof fillAbles[key] === 'object'
            ? this.fillDeep(attrs[key], <IModelFillAbles>fillAbles[key], toHttp)
            : convert(attrs[key], fillAbles[key]);
      } else if (this.isFunction(fillAbles[key])) {
        obj[key] = convert(attrs, fillAbles[key]);
      }
    });
    return obj;
  }

  /**
   * Create an empty model
   *
   * @private
   * @returns {IModelAttributes}
   */
  private fillEmpty(attrs: Object = this.attributes, fillAbles: IModelFillAbles = this.fillAbles()): Object {
    Object.keys(fillAbles).map(key =>
        attrs[key] = typeof fillAbles[key] === 'object'
            ? this.fillEmpty(attrs[key], <IModelFillAbles>fillAbles[key])
            : undefined);
    return attrs;
  }

  /**
   * Creates a TypeError with generic error message about failed type conversion.
   *
   * @private
   * @param {*} value
   * @param {IModelFillAblesTypes} toType
   * @returns {TypeError}
   */
  private createConversionError (value: any, toType: IModelFillAblesTypes): TypeError {
    return new TypeError(
        `Conversion to type ${IModelFillAblesTypes[toType]} failed for value: ${value} (${typeof value})`
    );
  }

  /**
   * Convert values to specific types
   *
   * @private
   * @template T
   * @param {*} value
   * @param {IModelFillAblesTypes} type
   * @returns {T}
   */
  private convertToType(value: any, type: IModelFillAblesTypes | Object | Function): any {
    let returnValue;

    /* tslint:disable:no-null-keyword */
    if (value === null) {
      return undefined;
    }
    /* tslint:enable:no-null-keyword */
    if (this.isFunction(type)) {
      /* tslint:disable:no-eval */
      return eval('type(value)');
      /* tslint:enable:no-eval */
    }

    switch (type) {
      case IModelFillAblesTypes.NUMBER:
        returnValue = parseInt(value);
        if (isNaN(returnValue)) {
          throw this.createConversionError(value, <IModelFillAblesTypes>type);
        }
        break;
      case IModelFillAblesTypes.FLOAT:
        returnValue = parseFloat(value);
        break;
      case IModelFillAblesTypes.STRING:
        returnValue = value.toString();
        break;
      case IModelFillAblesTypes.BOOL:
          const boolMap = {
            '1': true, 'true': true,
            '0': false, 'false': false
          };
          returnValue = boolMap[value.toString()];
          if (returnValue === undefined) {
            throw this.createConversionError(value, <IModelFillAblesTypes>type);
          }
        break;
      case IModelFillAblesTypes.DATE:
        returnValue = moment(value);
        if (!returnValue.isValid()) {
          throw this.createConversionError(value, <IModelFillAblesTypes>type);
        }
        break;
      case IModelFillAblesTypes.OBJECT:
          if (typeof value === 'string') {
            returnValue = JSON.parse(value);
          } else if (angular.isObject(value) && !angular.isArray(value)) {
            returnValue = value;
          } else {
            throw this.createConversionError(value, <IModelFillAblesTypes>type);
          }
        break;
      case IModelFillAblesTypes.ARRAY:
          if (angular.isArray(value)) {
            returnValue = value;
          } else {
            throw this.createConversionError(value, <IModelFillAblesTypes>type);
          }
          break;
      default:
        returnValue = value;
    }
    return returnValue;
  };

  /**
   * Convert HTTP data to specific attributes
   *
   * @private
   * @template T
   * @param {*} value (description)
   * @param {IModelFillAblesTypes} type (description)
   * @returns {T} (description)
   */
  private convertToHttpType(value: any, type: IModelFillAblesTypes | Object): any {
    let returnValue = this.convertToType(value, type);

    if (type === IModelFillAblesTypes.DATE) {
      returnValue = moment(returnValue).format(this.httpDateFormat);
    }

    return returnValue;
  };

  private isFunction(fn: any): boolean {
    return (typeof fn === 'function');
  }

  private isDefined(a: any): boolean {
    return (typeof a !== 'undefined');
  }

}

export default AbstractModel;
