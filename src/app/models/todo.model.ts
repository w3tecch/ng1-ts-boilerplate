/**
 * Import dependencies
 */
import AbstractModel,
  {IModelFillAbles, IModelFillAblesTypes, IAbstractModel} from './abstract.model.ts';

export interface ITodoModelAttributes {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

export interface ITodoModel extends IAbstractModel<ITodoModelAttributes> {}

/**
 * Todo Model
 *
 * @class TodoModel
 * @extends {AbstractModel<ITodoModelAttributes, ITodoModel>}
 * @implements {ITodoModel}
 */
class TodoModel extends AbstractModel<ITodoModelAttributes, ITodoModel> implements ITodoModel {

  public static api = new TodoModel();

  /**
   * The base url for this model
   *
   * @private
   * @static
   */
  private static rootUrl = 'todos';

  /**
   * The version header fot this model
   *
   * @private
   * @static
   */
  private static version = 'todo.v1';

  /**
   * Provide the base url to the abstract model
   *
   * @returns {string}
   */
  public getRootUrl(): string {
    return TodoModel.rootUrl;
  }

  /**
   * Provide the version to the abstract model
   *
   * @returns {string}
   */
  public getVersion(): string {
    return TodoModel.version;
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
      title: IModelFillAblesTypes.STRING,
      userId: IModelFillAblesTypes.NUMBER,
      completed: IModelFillAblesTypes.BOOL
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

export default TodoModel;
