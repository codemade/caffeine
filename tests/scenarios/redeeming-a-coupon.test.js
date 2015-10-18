/*eslint-disable no-unused-vars*/
let React = require('react');
let ReactDOM = require('react-dom');
let expect = require('chai').expect;
let StorageFake = require('../flux/storage-fake.js');
let TestUtils = require('react-addons-test-utils');

let renderTarget, renderedComponent, shoppingCartOverview;

describe('redeeming a coupon', () => {
  let categories = [
    {id: 1, name: 'first category'},
    {id: 2, name: 'second category'}
  ];
  let articles = [
    {id: 3, name: 'first article', intensity: 3, price: 42, isMatchingFilter: true, category: 1},
    {id: 4, name: 'second article', intensity: 8, price: 38, isMatchingFilter: true, category: 2}
  ];

  beforeEach(() => {
    let ComponentClass = require('../../app/components/shopping-cart-controller-view.react.js');
    renderTarget = document.getElementsByClassName('app')[0];

    let dataAccess = {
      getCategoriesAndArticles: () => {
        return {
          categories: categories,
          articles: articles
        };
      }
    };

    let ActionCreator = require('../../app/action-creator.js');
    let actionCreator = new ActionCreator(dataAccess);
    let ArticleStore = require('../../app/article-store.js');
    let store = new ArticleStore(new StorageFake());
    renderedComponent = ReactDOM.render(<ComponentClass actionCreator={actionCreator} store={store}/>, renderTarget);
    // initialize action creator, to fetch article data from server etc.
    actionCreator.initialize();
    actionCreator.addArticleToShoppingCart(3, 20);
    actionCreator.addArticleToShoppingCart(4, 30);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(renderTarget);
    renderedComponent = null;
  });

  describe('with an invalid coupon code', () => {
    beforeEach(() => {
      let couponCodeInput = renderTarget.querySelector('.shoppingCart__couponCode');
      let redeemCouponButton = renderTarget.querySelector('.shoppingCart__redeemCoupon');
      couponCodeInput.value = 'invalid coupon code';
      TestUtils.Simulate.click(redeemCouponButton);
    });

    it('should show a warning', () => {
      let couponCodeWarning = renderTarget.querySelector('.shoppingCart__couponCodeWarning');
      expect(couponCodeWarning).not.to.equal(null);
    });
  });

  describe('with a valid coupon code', () => {
    beforeEach(() => {
      let couponCodeInput = renderTarget.querySelector('.shoppingCart__couponCode');
      let redeemCouponButton = renderTarget.querySelector('.shoppingCart__redeemCoupon');
      couponCodeInput.value = 'wmks-09-11-15';
      TestUtils.Simulate.click(redeemCouponButton);
    });

    it('should not show a warning', () => {
      let couponCodeWarning = renderTarget.querySelector('.shoppingCart__couponCodeWarning');
      expect(couponCodeWarning).to.equal(null);
    });
  });
});
