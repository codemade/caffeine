function removeChangeListenerWithId(listenerId, eventIdentifier, store) {
  store.listeners[eventIdentifier] = store.listeners[eventIdentifier]
    .filter((listener) => { return listener.id !== listenerId; });
};

class Store {
  constructor() {
    this.listeners = {};
    this.highestCallbackId = 0;
  }

  addChangeListener(eventIdentifier, callback) {
    var callbackWithId = { callback: callback, id: this.highestCallbackId };
    this.highestCallbackId++;

    if(!this.listeners[eventIdentifier]) {
      this.listeners[eventIdentifier] = [];
    }

    this.listeners[eventIdentifier].push(callbackWithId);
    return () => { removeChangeListenerWithId(callbackWithId.id, eventIdentifier, this)};
  }

  emitChange(eventIdentifier) {
    var listenersForEvent = this.listeners[eventIdentifier];
    if(listenersForEvent) {
      listenersForEvent.forEach((listener) => {
        listener.callback();
      })
    }
  }
}

module.exports = Store;
