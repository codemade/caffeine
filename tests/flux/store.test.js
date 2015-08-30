var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('store', () => {
  var store;
  beforeEach(function() {
    var Store = require('../../app/flux/store.js');
    store = new Store();
  });

  describe('emitting an event', () => {
    it('should execute all change listeners registered for that event', () => {
      var callbackA = sinon.spy();
      var callbackB = sinon.spy();
      var callbackC = sinon.spy();
      var payload = {pay: 'load'};
      var changeEvent = 'somethingChanged';

      store.addChangeListener(changeEvent, callbackA);
      store.addChangeListener(changeEvent, callbackB);
      store.addChangeListener('otherEvent', callbackC);

      store.emitChange(changeEvent);

      expect(callbackA).to.have.been.called;
      expect(callbackB).to.have.been.called;
      expect(callbackC).not.to.have.been.called;
    });

    describe('after change listener deregistered', () => {
      it('should not execute deregistered listener', () => {
        var callbackA = sinon.spy();
        var callbackB = sinon.spy();
        var callbackC = sinon.spy();
        var payload = {pay: 'load'};
        var changeEvent = 'somethingChanged';

        var deregisterA = store.addChangeListener(changeEvent, callbackA);
        var deregisterB = store.addChangeListener(changeEvent, callbackB);
        var deregisterC = store.addChangeListener(changeEvent, callbackC);

        deregisterA();
        deregisterC();
        
        store.emitChange(changeEvent);

        expect(callbackA).not.to.have.been.called;
        expect(callbackB).to.have.been.called;
        expect(callbackC).not.to.have.been.called;
      });
    });
  });
});
