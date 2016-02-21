// Load the implementations that should be tested
import HomeController from './home.controller.ts';

describe('app.home.HomeController', () => {

  var homeController: HomeController;
  before(() => {
    homeController = new HomeController();
  });

  //it('homeController', () => {
  //  expect(homeController instanceof HomeController).toEqual(true);
  //});

});
