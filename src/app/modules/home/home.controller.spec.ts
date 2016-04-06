/**
 * Import dependencies
 */
import { expect } from 'chai';
import HomeController from './home.controller.ts';
import Logger from './../../services/utils/logger.service.ts';

/**
 * Tests
 */
describe('app.home.HomeController', () => {

  const loggerMock: ng.ILogService = {
    debug: (): any => undefined,
    error: (): any => undefined,
    info: (): any => undefined,
    log: (): any => undefined,
    warn: (): any => undefined
  };

  let homeController: HomeController;
  before(() => {
    Logger.$log = loggerMock;
    homeController = new HomeController();
  });

  it('homeController', () => {
    expect(homeController instanceof <any>HomeController).to.equal(true);
  });

});
