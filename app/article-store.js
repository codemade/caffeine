let utils = require('./utils.js');
let dispatcher = require('./flux/dispatcher.js');
let actionIdentifiers = require('./action-identifiers.js');
let Store = require('./flux/store.js');
let Maybe = require('./maybe.js');
const MAXIMUM_POSSIBLE_INTENSITY = 13;

class ArticleStore extends Store {
  constructor(storage) {
    super('article-store', storage);
    if (!this.state.shoppingCart) this.state.shoppingCart = {};
    if (!this.state.intensityFilter) this.state.intensityFilter = Maybe.Not;
    if (!this.state.maybeCouponCode) this.state.maybeCouponCode = Maybe.Not;
    dispatcher.register(this.onActionDispatched.bind(this));
  }

  getCategories() {
    return utils.clone(this.state.data.categories);
  }

  getArticles() {
    let articles = utils.clone(this.state.data.articles);

    let result = articles.map((article) => {
      article.isMatchingFilter = this.articleMatchesFilter(article);
      return article;
    });
    return result;
  }

  articleMatchesFilter(article) {
    if (!this.state.intensityFilter.hasValue) return true;
    return article.intensity === this.state.intensityFilter.value;
  }

  getMaximumPossibleIntensity() {
    return MAXIMUM_POSSIBLE_INTENSITY;
  }

  getAvailableIntensities() {
    let intensities = [];
    if (this.state.intensityFilter.hasValue) {
      intensities.push(this.state.intensityFilter.value);
      return intensities;
    }

    if (!this.state.data || !this.state.data.articles) return intensities;

    return this.state.data.articles.reduce((acc, current) => {
      if (acc.indexOf(current.intensity) === -1) {
        acc.push(current.intensity);
      }
      return acc;
    }, intensities);
  }

  getShoppingCartBadgeInformation() {
    let shoppingCartInfo = { articleCount: 0, totalPrice: 0 };
    if (!this.state.data || !this.state.data.articles) return shoppingCartInfo;

    return this.state.data.articles.reduce((acc, article) => {
      let amount = this.state.shoppingCart[article.id];

      if (amount) {
        acc.articleCount += amount;
        acc.totalPrice += article.price * amount;
      }
      return acc;
    }, shoppingCartInfo);
  }

  getShoppingCartContent() {
    let shoppingCartContent = {
      totalAmount: 0,
      totalPrice: 0,
      packagingSizeInvalid: false,
      couponCodeInvalid: false,
      couponCode: Maybe.Not,
      items: []
    };

    if (!this.state.data || !this.state.data.articles) return shoppingCartContent;

    let items = this.state.data.articles.reduce((acc, article) => {
      let amount = this.state.shoppingCart[article.id];

      if (amount) {
        acc.push({
          id: article.id,
          name: article.name,
          amount: amount,
          price: article.price,
          totalPrice: amount * article.price,
          color: article.color
        });
      }
      return acc;
    }, []);

    shoppingCartContent.items = items;
    shoppingCartContent.totalAmount = items.reduce((sum, item) => sum + item.amount, 0);
    shoppingCartContent.totalPrice = items.reduce((sum, item) => sum + item.totalPrice, 0);
    shoppingCartContent.couponDiscount = 0;
    shoppingCartContent.reducedTotalPrice = 0;

    if (this.state.maybeCouponCode.hasValue && this.state.maybeCouponCode.value.isValid) {
      shoppingCartContent.couponDiscount = shoppingCartContent.totalPrice * 0.15;
    }

    shoppingCartContent.packagingSizeInvalid = shoppingCartContent.totalAmount % 50 !== 0;
    shoppingCartContent.couponCodeInvalid = this.state.maybeCouponCode.hasValue && !this.state.maybeCouponCode.value.isValid;
    shoppingCartContent.couponCode = this.state.maybeCouponCode;
    return shoppingCartContent;
  }

  onInitialize(data) {
    this.state.data = data;
    this.emitChange('changed');
  }

  onFilterByIntensity(intensity) {
    this.state.intensityFilter = this.state.intensityFilter.hasValue && this.state.intensityFilter.value === intensity
      ? Maybe.Not
      : new Maybe(intensity);
    this.emitChange('changed');
  }

  onAddArticleToShoppingCart(articleId, amount) {
    let previousAmount = this.state.shoppingCart[articleId];
    let currentAmount = previousAmount ? previousAmount + amount : amount;
    this.state.shoppingCart[articleId] = currentAmount;
    this.emitChange('changed');
  }

  onRemoveArticleFromShoppingCart(articleId, amount) {
    let previousAmount = this.state.shoppingCart[articleId];
    let currentAmount = previousAmount - amount;
    this.state.shoppingCart[articleId] = currentAmount;
    if (currentAmount <= 0) delete this.state.shoppingCart[articleId];
    this.emitChange('changed');
  }

  onRedeemCoupon(couponCodeValue) {
    if (!couponCodeValue || couponCodeValue === '') return;
    let couponCode = {
      value: couponCodeValue,
      isValid: (couponCodeValue === 'wmks-09-11-15')
    };
    this.state.maybeCouponCode = new Maybe(couponCode);
    this.emitChange('changed');
  }

  onActionDispatched(action) {
    switch (action.type) {
      case actionIdentifiers.articleList.initialize:
        this.onInitialize(action.data);
        break;
      case actionIdentifiers.articleList.filterByIntensity:
        this.onFilterByIntensity(action.intensity);
        break;
      case actionIdentifiers.shoppingCart.addArticle:
        this.onAddArticleToShoppingCart(action.articleId, action.amount);
        break;
      case actionIdentifiers.shoppingCart.removeArticle:
        this.onRemoveArticleFromShoppingCart(action.articleId, action.amount);
        break;
      case actionIdentifiers.shoppingCart.redeemCoupon:
        this.onRedeemCoupon(action.couponCode);
        break;
      default:
        // nothing to do here
    }
  }
}

module.exports = ArticleStore;
