let actionIdentifiers = {
  articleList: {
    initialize: 'articleList.initialize',
    filterByIntensity: 'articleList.filterByIntensity',
    selectArticle: 'articleList.selectArticle'
  },
  shoppingCart: {
    addArticle: 'shoppingCart.addArticle',
    removeArticle: 'shoppingCart.removeArticle',
    redeemCoupon: 'shoppingCart.redeemCoupon'
  }
};

module.exports = actionIdentifiers;
