class ActionCreator {
  constructor(api, store){
    this.api = api;
    this.store = store;
  }

  initialize() {
    var data = this.api.getCategoriesAndArticles();
    this.store.initialize(data);
  }
};

module.exports = ActionCreator;
