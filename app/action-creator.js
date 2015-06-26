var EventEmitter = require('events').EventEmitter;

class ActionCreator extends EventEmitter {
  constructor(api){
    super();
    this.api = api;
  }

  subscribe(actionName, callback) {
    this.on(actionName, callback);
  }

  unsubscribe(actionName, callback) {
    this.removeListener(actionName, callback);
  }

  initialize() {
    var data = this.api.getCategoriesAndArticles();
    this.emit('initialize', data)
  }

  filterByIntensity(intensity) {
    this.emit('filterByIntensity', intensity);
  }
};

module.exports = ActionCreator;
