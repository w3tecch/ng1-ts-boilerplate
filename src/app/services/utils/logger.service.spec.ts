import { expect } from 'chai';
import Logger from './logger.service.ts';

describe('app.services.utils.Logger', () => {

  let consoleMock;
  beforeEach(() => {
      consoleMock = sinon.mock(console);
      consoleMock.expects('info').once();
      consoleMock.expects('debug').once();
      consoleMock.expects('warn').once();
      consoleMock.expects('error').once();
  });

  it('my second test', () => {
    expect('bubu').to.equal('bubu');
  });

  it('logger saves the classname', () => {
    let classname = 'test.logger';
    let l = new Logger(classname);
    expect(l.className).to.equal(classname);
  });

});
