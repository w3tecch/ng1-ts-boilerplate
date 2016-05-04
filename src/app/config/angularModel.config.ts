/**
 * Import dependencies
 */
import httpService, {IHttpUtilService} from './../common/services/utils/http.service.ts';
import AbstractModel from './../models/abstract.model.ts';

const angularModel = (httpServiceSerivce: IHttpUtilService) => {
  AbstractModel.httpService = httpServiceSerivce;
};
angularModel.$inject = [httpService];

export default angularModel;
