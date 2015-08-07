var Dispatcher = require('./flux/dispatcher.js');

class ActionCreator {
  constructor(api){
    this.api = api;
  }

  initialize() {
    var data = this.api.getCategoriesAndArticles();
    dispatcher.dispatch({
      action: 'initialize',
      data: data
    });
  }

  filterByIntensity(intensity) {
    dispatcher.dispatch({
      action: 'filterByIntensity',
      intensity: intensity
    });
  }
};

module.exports = ActionCreator;
