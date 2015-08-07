var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('dispatcher', () => {
  var dispatcher;
  beforeEach(function() {
    var Dispatcher = require('../../app/flux/dispatcher.js');
    dispatcher = new Dispatcher();
  });

  it('should execute all subscriber callbacks', function() {
    var callbackA = sinon.spy();
    var callbackB = sinon.spy();
    var payload = {pay: 'load'};

    dispatcher.register(callbackA);
    dispatcher.register(callbackB);

    dispatcher.dispatch(payload);

    expect(callbackA).to.have.been.calledWith(payload);
  });
});
