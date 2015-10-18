let dispatcher = require('./flux/dispatcher.js');
let actionIdentifiers = require('./action-identifiers.js');

class ActionCreator {
  constructor(api) {
    this.api = api;
  }

  initialize() {
    let data = this.api.getCategoriesAndArticles();
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

  addArticleToShoppingCart(articleId, amount) {
    dispatcher.dispatch({
      type: actionIdentifiers.shoppingCart.addArticle,
      articleId: articleId,
      amount: amount
    });
  }

  removeArticleFromShoppingCart(articleId, amount) {
    dispatcher.dispatch({
      type: actionIdentifiers.shoppingCart.removeArticle,
      articleId: articleId,
      amount: amount
    });
  }

  redeemCoupon(couponCode) {
    dispatcher.dispatch({
      type: actionIdentifiers.shoppingCart.redeemCoupon,
      couponCode: couponCode
    });
  }
}

module.exports = ActionCreator;
