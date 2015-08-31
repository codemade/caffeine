var utils = require('./utils.js');
var dispatcher = require('./flux/dispatcher.js');
var actionIdentifiers = require('./action-identifiers.js');
var Store = require('./flux/store.js');
var Maybe = require('./maybe.js');
const MAXIMUM_POSSIBLE_INTENSITY = 13;

class ArticleStore extends Store {
  constructor(){
    super();
    this.intensityFilter = Maybe.Not;
    this.maybeSelectedArticle = Maybe.Not;
    dispatcher.register(this.onActionDispatched.bind(this));
  }

  getCategories() {
    return utils.clone(this.data.categories);
  }

  getArticles() {
    var articles = utils.clone(this.data.articles);

    var result = articles.map((article) => {
      article.isMatchingFilter = this.articleMatchesFilter(article);
      return article;
    });
    return result;
  }

  getMaybeSelectedArticle() {
    return this.maybeSelectedArticle;
  }

  articleMatchesFilter(article){
    if(!this.intensityFilter.hasValue) return true;
    return article.intensity === this.intensityFilter.value;
  }

  getMaximumPossibleIntensity(){
    return MAXIMUM_POSSIBLE_INTENSITY;
  }

  getAvailableIntensities(){
    let intensities = [];
    if(this.intensityFilter.hasValue) {
      intensities.push(this.intensityFilter.value);
      return intensities;
    }

    for(let intensity = 1; intensity <= MAXIMUM_POSSIBLE_INTENSITY; intensity++) {
      if(this.isIntensityAvailable(intensity)) {
        intensities.push(intensity);
      }
    }
    return intensities;
  }

  isIntensityAvailable(intensity){
    if(!this.data || !this.data.articles) return false;
    return this.data.articles
      .filter((article) => article.intensity === intensity)
      .length > 0;
  }

  onInitialize(data) {
    this.data = data;
    this.emitChange('changed');
  }

  onFilterByIntensity(intensity) {
    this.intensityFilter = this.intensityFilter.hasValue && this.intensityFilter.value === intensity
      ? Maybe.Not
      : new Maybe(intensity);
    this.emitChange('changed');
  }

  onSelectArticle(articleId) {
    let selectedArticle = this.data.articles.filter((article) => {
      return article.id === articleId;
    })[0];
    this.maybeSelectedArticle = new Maybe(selectedArticle);
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
