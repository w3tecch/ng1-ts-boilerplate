/**
 * Import dependencies
 */
import { expect } from 'chai';
import Logger from './logger.service.ts';

/**
 * Tests
 */
describe('app.services.utils.Logger', () => {

  it('my second test', () => {
    expect('bubu').to.equal('bubu');
  });

  it('logger saves the classname', () => {
    let classname = 'test.logger';
    let l = new Logger(classname);
    expect(l.className).to.equal(classname);
  });

});
