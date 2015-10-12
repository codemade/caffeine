function removeChangeListenerWithId(listenerId, eventIdentifier, store) {
  store.listeners[eventIdentifier] = store.listeners[eventIdentifier]
    .filter((listener) => { return listener.id !== listenerId; });
}

function applyStateFromStorage(store) {
  store.state = {};
  if (!store.storage) return;
  var serializedState = store.storage.getItem(store.identifier);
  if (!serializedState) return;
  store.state = JSON.parse(serializedState);
}

function writeStateToStorage(store) {
  if (!store.storage) return;
  store.storage.setItem(store.identifier, JSON.stringify(store.state));
}

class Store {
  constructor(identifier, storage) {
    this.identifier = identifier;
    this.storage = storage;
    this.listeners = {};
    this.highestListenerId = 0;
    applyStateFromStorage(this);
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
    writeStateToStorage(this);
    let listenersForEvent = this.listeners[eventIdentifier];
    if (listenersForEvent) {
      listenersForEvent.forEach((listener) => {
        listener.execute();
      });
    }
  }
}

module.exports = Store;
