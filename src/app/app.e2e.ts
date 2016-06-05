/// <reference path="./../../typings-custom/protractor.d.ts"/>
/// <reference path="./../../typings-custom/jasmine.d.ts"/>
'use strict';

describe('App', () => {

  beforeEach(() => {
    browser.get('/');
  });

  it('should have a title', () => {
    browser.getTitle().then(t => {
      let result  = 'ng1-ts-boilerplate';
      expect(t).toEqual(result);
    });
  });

});
