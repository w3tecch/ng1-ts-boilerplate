/**
 * Import dependencies
 */
import AbstractModel,
  {IModelFillAbles, IModelFillAblesTypes, IAbstractModel} from './abstract.model.ts';

export interface IUserModelAttributes {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

export interface IUserModel extends IAbstractModel<IUserModelAttributes> {}

/**
 * The user model
 *
 * @class UserModel
 * @extends {AbstractModel<IUserModelAttributes, IUserModel>}
 * @implements {IUserModel}
 */
class UserModel extends AbstractModel<IUserModelAttributes, IUserModel> implements IUserModel {

  public static api = new UserModel();

  /**
   * The base url for this model
   *
   * @private
   * @static
   */
  public static rootUrl = 'users';

  /**
   * The version header fot this model
   *
   * @private
   * @static
   */
  private static version = 'user.v1';

  /**
   * Provide the base url to the abstract model
   *
   * @returns {string}
   */
  public getRootUrl(): string {
    return UserModel.rootUrl;
  }

  /**
   * Provide the version to the abstract model
   *
   * @returns {string}
   */
  public getVersion(): string {
    return UserModel.version;
  }

  /**
   * The available attributes for this model
   *
   * @protected
   * @returns {IModelFillAbles}
   */
  protected fillAbles(): IModelFillAbles {
    return {
      id: IModelFillAblesTypes.NUMBER,
      name: IModelFillAblesTypes.STRING,
      username: IModelFillAblesTypes.STRING,
      email: IModelFillAblesTypes.STRING,
      phone: IModelFillAblesTypes.STRING
    };
  };

  /**
   * The attributes which will be sent with POST/PUT
   *
   * @protected
   * @returns {IModelFillAbles}
   */
  protected fillAblesCU(): IModelFillAbles {
    return this.fillAbles();
  }
}

export default UserModel;
