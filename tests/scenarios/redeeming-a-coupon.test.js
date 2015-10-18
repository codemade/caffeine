/*eslint-disable no-unused-vars*/
let React = require('react');
let ReactDOM = require('react-dom');
let expect = require('chai').expect;
let StorageFake = require('../flux/storage-fake.js');
let TestUtils = require('react-addons-test-utils');

let renderTarget, renderedComponent, shoppingCartOverview, actionCreator;

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
    actionCreator = new ActionCreator(dataAccess);
    let ArticleStore = require('../../app/article-store.js');
    let store = new ArticleStore(new StorageFake());
    renderedComponent = ReactDOM.render(<ComponentClass actionCreator={actionCreator} store={store}/>, renderTarget);
    // initialize action creator, to fetch article data from server etc.
    actionCreator.initialize();
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(renderTarget);
    renderedComponent = null;
  });

  describe('with no articles in shopping cart', () => {
    it('should not show coupon input', () => {
      let couponCodeInput = renderTarget.querySelector('.shoppingCart__couponInput');
      expect(couponCodeInput).to.equal(null);
    });
  });

  describe('with articles in shopping cart', () => {
    beforeEach(() => {
      actionCreator.addArticleToShoppingCart(3, 20);
      actionCreator.addArticleToShoppingCart(4, 30);
    });

    describe('with an invalid coupon code', () => {
      beforeEach(() => {
        let couponCodeInput = renderTarget.querySelector('.shoppingCart__couponInput__couponCode');
        let redeemCouponButton = renderTarget.querySelector('.shoppingCart__couponInput__redeemCoupon');
        couponCodeInput.value = 'invalid coupon code';
        TestUtils.Simulate.click(redeemCouponButton);
      });

      it('should show a warning', () => {
        let couponCodeWarning = renderTarget.querySelector('.shoppingCart__couponCodeWarning');
        expect(couponCodeWarning).not.to.equal(null);
      });

      it('should not show the coupon discount price', () => {
        let couponDiscountRow = renderTarget.querySelector('.shoppingCart__footer__couponDiscount');
        expect(couponDiscountRow).to.equal(null);
      });

      it('should not show the reduced total price', () => {
        let reducedTotalPriceRow = renderTarget.querySelector('.shoppingCart__footer__reducedTotalPrice');
        expect(reducedTotalPriceRow).to.equal(null);
      });
    });

    describe('with a valid coupon code', () => {
      beforeEach(() => {
        let couponCodeInput = renderTarget.querySelector('.shoppingCart__couponInput__couponCode');
        let redeemCouponButton = renderTarget.querySelector('.shoppingCart__couponInput__redeemCoupon');
        couponCodeInput.value = 'wmks-09-11-15';
        TestUtils.Simulate.click(redeemCouponButton);
      });

      it('should not show a warning', () => {
        let couponCodeWarning = renderTarget.querySelector('.shoppingCart__couponCodeWarning');
        expect(couponCodeWarning).to.equal(null);
      });

      it('should show the coupon discount price', () => {
        let couponDiscount = renderTarget.querySelector('.shoppingCart__footer__couponDiscount td:last-child');
        expect(couponDiscount.textContent).to.equal('- 2.97 €');
      });

      it('should show the reduced total price', () => {
        let reducedTotalPrice = renderTarget.querySelector('.shoppingCart__footer__reducedTotalPrice td:last-child');
        expect(reducedTotalPrice.textContent).to.equal('16.83 €');
      });
    });
  });
});
