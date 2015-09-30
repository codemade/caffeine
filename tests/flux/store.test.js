let chai = require('chai');
let expect = chai.expect;
let sinon = require('sinon');
let sinonChai = require('sinon-chai');
chai.use(sinonChai);

class StorageFake {
  constructor() {
    this.data = [];
  }
  getItem(key) {
    return this.data[key];
  }
  setItem(key, value) {
    this.data[key] = value;
  }
}

describe('store', () => {
  describe('initializing with state peristed in SessionStorage', () => {
    it('should apply state from SessionStorage', () => {
      let store;
      let Store = require('../../app/flux/store.js');
      let storage = new StorageFake();
      let state = {id: 42, name: 'foobar'};
      let storeIdentifier = 'article-store';
      storage.setItem('other-store', 'some stupid value');
      storage.setItem(storeIdentifier, JSON.stringify(state));
      store = new Store(storeIdentifier, storage);
      expect(store.state).to.deep.equal(state);
    });
  });

  describe('emitting an event', () => {
    let store;
    beforeEach(function() {
      let Store = require('../../app/flux/store.js');
      store = new Store('article-store', new StorageFake());
    });

    it('should execute all change listeners registered for that event', () => {
      let callbackA = sinon.spy();
      let callbackB = sinon.spy();
      let callbackC = sinon.spy();
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
        let changeEvent = 'somethingChanged';

        let deregisterA = store.addChangeListener(changeEvent, callbackA);
        store.addChangeListener(changeEvent, callbackB);
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
