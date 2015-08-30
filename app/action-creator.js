var dispatcher = require('./flux/dispatcher.js');
var actionIdentifiers = require('./action-identifiers.js');

class ActionCreator {
  constructor(api){
    this.api = api;
  }

  initialize() {
    var data = this.api.getCategoriesAndArticles();
    dispatcher.dispatch({
      type: actionIdentifiers.articleList.initialize,
      data: data
    });
  }

  filterByIntensity(intensity) {
    dispatcher.dispatch({
      type: actionIdentifiers.articleList.filterByIntensity,
      intensity: intensity
    });
  }

  selectArticle(articleId) {
    dispatcher.dispatch({
      type: actionIdentifiers.articleList.selectArticle,
      articleId: articleId
    });
  }
};

module.exports = ActionCreator;
