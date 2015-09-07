function removeChangeListenerWithId(listenerId, eventIdentifier, store) {
  store.listeners[eventIdentifier] = store.listeners[eventIdentifier]
    .filter((listener) => { return listener.id !== listenerId; });
}

class Store {
  constructor() {
    this.listeners = {};
    this.highestListenerId = 0;
  }

  addChangeListener(eventIdentifier, listener) {
    let listenerWithId = { execute: listener, id: this.highestListenerId };
    this.highestListenerId++;

    if (!this.listeners[eventIdentifier]) {
      this.listeners[eventIdentifier] = [];
    }

    this.listeners[eventIdentifier].push(listenerWithId);
    return () => { removeChangeListenerWithId(listenerWithId.id, eventIdentifier, this); };
  }

  emitChange(eventIdentifier) {
    let listenersForEvent = this.listeners[eventIdentifier];
    if (listenersForEvent) {
      listenersForEvent.forEach((listener) => {
        listener.execute();
      });
    }
  }
}

module.exports = Store;
