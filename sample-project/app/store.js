var utils = require('./utils.js');
var EventEmitter = require('events').EventEmitter;
class Store extends EventEmitter {
  constructor(actionCreator){
    super();
    actionCreator.subscribe('initialize', this.onInitialize.bind(this));
    actionCreator.subscribe('filterByIntensity', this.onFilterByIntensity.bind(this));
  }

  subscribe(eventName, callback){
    this.on(eventName, callback);
  }

  unsubscribe(eventName, callback) {
    this.removeListener(eventName, callback);
  }

  getCategories() {
    return utils.clone(this.data.categories);
  }

  getArticles() {
    var articles = utils.clone(this.data.articles);
    return articles.map((article) => {
      article.active = article.intensity === this.intensityFilter;
      return article;
    });
  }

  onInitialize(data) {
    this.data = data;
    this.emit('changed');
  }

  onFilterByIntensity(intensity) {
    this.intensityFilter = intensity;
    this.emit('changed');
  }
}

module.exports = Store;
