let chai = require('chai');
let expect = chai.expect;
let sinon = require('sinon');
let sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('dispatcher', () => {
  let dispatcher;
  beforeEach(function() {
    dispatcher = require('../../app/flux/dispatcher.js');
  });

  it('should execute all subscriber callbacks', function() {
    let callbackA = sinon.spy();
    let callbackB = sinon.spy();
    let payload = {pay: 'load'};

    dispatcher.register(callbackA);
    dispatcher.register(callbackB);

    dispatcher.dispatch(payload);

    expect(callbackA).to.have.been.calledWith(payload);
  });
});
