let chai = require('chai');
let expect = chai.expect;
let sinon = require('sinon');
let sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('store', () => {
  let store;
  beforeEach(function() {
    let Store = require('../../app/flux/store.js');
    store = new Store();
  });

  describe('emitting an event', () => {
    it('should execute all change listeners registered for that event', () => {
      let callbackA = sinon.spy();
      let callbackB = sinon.spy();
      let callbackC = sinon.spy();
      let payload = {pay: 'load'};
      let changeEvent = 'somethingChanged';

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
        let callbackA = sinon.spy();
        let callbackB = sinon.spy();
        let callbackC = sinon.spy();
        let payload = {pay: 'load'};
        let changeEvent = 'somethingChanged';

        let deregisterA = store.addChangeListener(changeEvent, callbackA);
        let deregisterB = store.addChangeListener(changeEvent, callbackB);
        let deregisterC = store.addChangeListener(changeEvent, callbackC);

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
