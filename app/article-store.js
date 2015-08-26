var utils = require('./utils.js');
var dispatcher = require('./flux/dispatcher.js');
var actionIdentifiers = require('./action-identifiers.js');
var Store = require('./flux/store.js');
class ArticleStore extends Store {
  constructor(){
    super();
    this.intensityFilter = null;
    dispatcher.register(this.onActionDispatched.bind(this));
  }

  getCategories() {
    return utils.clone(this.data.categories);
  }

  getArticles() {
    var articles = utils.clone(this.data.articles);

    var result = articles.map((article) => {
      article.active = this.articleMatchesFilter(article);
      return article;
    });
    return result;
  }

  getSelectedArticle() {
    return this.data.articles.filter((article) => {
      return article.id === this.selectedArticleId;
    })[0];
  }

  articleMatchesFilter(article){
    if(this.intensityFilter === null) return true;
    return article.intensity === this.intensityFilter;
  }

  articleIsSelected() {
    return typeof(this.selectedArticleId) !== 'undefined';
  }

  onInitialize(data) {
    this.data = data;
    this.emitChange('changed');
  }

  onFilterByIntensity(intensity) {
    this.intensityFilter = intensity;
    this.emitChange('changed');
  }

  onSelectArticle(articleId) {
    this.selectedArticleId = articleId;
    this.emitChange('changed');
  }

  onActionDispatched(action) {
    switch(action.type) {
      case actionIdentifiers.articleList.initialize:
        this.onInitialize(action.data);
        break;
      case actionIdentifiers.articleList.filterByIntensity:
        this.onFilterByIntensity(action.intensity);
        break;
      case actionIdentifiers.articleList.selectArticle:
        this.onSelectArticle(action.articleId);
        break;
      default:
        // nothing to do here
    }
  }
}

module.exports = ArticleStore;
