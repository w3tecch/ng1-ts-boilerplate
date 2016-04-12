/**
 * Import dependencies
 */
import { expect } from 'chai';
import Logger from './logger.service.ts';

/**
 * Tests
 */
describe('app.services.utils.Logger', () => {

  let logger: Logger,
      classname = 'test.logger';

  beforeEach(() => logger = new Logger(classname));
  beforeEach(() => sinon.stub(logger, 'debug'));

  it('logger saves the classname', () => {
    expect(logger.className).to.equal(classname);
  });

});
