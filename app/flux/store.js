class Store {
  constructor() {
    this.listeners = {};
  }

  addChangeListener(eventIdentifier, callback) {
    if(!this.listeners[eventIdentifier]) {
      this.listeners[eventIdentifier] = [];
    }
    this.listeners[eventIdentifier].push(callback);
  }

  emitChange(eventIdentifier) {
    var listenersForEvent = this.listeners[eventIdentifier];
    if(listenersForEvent) {
      listenersForEvent.forEach((listener) => {
        listener();
      })
    }
  }
}

module.exports = Store;
