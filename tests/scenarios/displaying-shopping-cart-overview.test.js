/*eslint-disable no-unused-vars*/
let React = require('react');
let ReactDOM = require('react-dom');
let TestUtils = require('react-addons-test-utils');
let chai = require('chai');
let sinonChai = require('sinon-chai');
let StorageFake = require('../flux/storage-fake.js');
let expect = chai.expect;
chai.use(sinonChai);
let renderTarget, renderedComponent;
let actionCreator, store;

describe('Displaying the shopping cart overview', () => {
  let categories = [
    {id: 1, name: 'first category'},
    {id: 2, name: 'second category'}
  ];
  let articles = [
    {id: 3, name: 'first article', intensity: 3, price: 42, isMatchingFilter: true, category: 1},
    {id: 4, name: 'second article', intensity: 8, price: 38, isMatchingFilter: true, category: 2}
  ];
  beforeEach(function() {
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
    store = new ArticleStore(new StorageFake());
    renderedComponent = React.render(<ComponentClass actionCreator={actionCreator} store={store} />, renderTarget);
    // initialize action creator, to fetch article data from server etc.
    actionCreator.initialize();
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(renderTarget);
    renderedComponent = null;
  });

  describe('when no articles added to shopping cart', () => {
    it('should display no items', () => {
      let shoppingCartItems = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'shoppingCartItem');
      expect(shoppingCartItems).to.deep.equal([]);
    });

    it('should display empty footer', () => {
      let shoppingCartFooter = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'shoppingCart__footer')[0];
      let actual = Array.from(shoppingCartFooter.querySelectorAll('td')).map((cell) => cell.textContent);
      let expected = ['Gesamt:', '', '0', '0.00 €'];
      expect(actual).to.deep.equal(expected);
    });
  });

  describe('when two different articles with total amount of 50 added to shopping cart', () => {
    beforeEach(() => {
      actionCreator.addArticleToShoppingCart(3, 20);
      actionCreator.addArticleToShoppingCart(4, 30);
    });

    it('should display name, amount and price of first article', () => {
      let shoppingCartItem = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'shoppingCartItem')[0];

      let actualName = shoppingCartItem.querySelector('.shoppingCartItem__name').textContent;
      let actualPrice = shoppingCartItem.querySelector('.shoppingCartItem__price').textContent;
      let actualAmount = shoppingCartItem.querySelector('.shoppingCartItem__amount').textContent;
      let actualTotalPrice = shoppingCartItem.querySelector('.shoppingCartItem__totalPrice').textContent;

      expect(actualName).to.equal('first article');
      expect(actualPrice).to.equal('0.42 €');
      expect(actualAmount).to.equal('20');
      expect(actualTotalPrice).to.equal('8.40 €');
    });

    it('should display name, amount and price of second article', () => {
      let shoppingCartItem = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'shoppingCartItem')[1];

      let actualName = shoppingCartItem.querySelector('.shoppingCartItem__name').textContent;
      let actualPrice = shoppingCartItem.querySelector('.shoppingCartItem__price').textContent;
      let actualAmount = shoppingCartItem.querySelector('.shoppingCartItem__amount').textContent;
      let actualTotalPrice = shoppingCartItem.querySelector('.shoppingCartItem__totalPrice').textContent;

      expect(actualName).to.equal('second article');
      expect(actualPrice).to.equal('0.38 €');
      expect(actualAmount).to.equal('30');
      expect(actualTotalPrice).to.equal('11.40 €');
    });

    it('should display footer with total amount and total price', () => {
      let shoppingCartFooter = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'shoppingCart__footer')[0];
      let actual = Array.from(shoppingCartFooter.querySelectorAll('tr td')).map((cell) => cell.textContent);
      let expected = ['Gesamt:', '', '50', '19.80 €'];
      expect(actual).to.deep.equal(expected);
    });

    it('should not display packaging size warning', () => {
      let warnings = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'shoppingCart__packagingSizeWarning');
      expect(warnings.length).to.equal(0);
    });

    describe('Clicking the add button of an article', () => {
      let shoppingCartItem, addButton;

      beforeEach(() => {
        shoppingCartItem = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'shoppingCartItem')[0];
        addButton = shoppingCartItem.querySelector('.shoppingCartItem__addToCart');
        TestUtils.Simulate.click(addButton);
      });

      it('should increase article amount by 10', () => {
        let actualName = shoppingCartItem.querySelector('.shoppingCartItem__name').textContent;
        let actualPrice = shoppingCartItem.querySelector('.shoppingCartItem__price').textContent;
        let actualAmount = shoppingCartItem.querySelector('.shoppingCartItem__amount').textContent;
        let actualTotalPrice = shoppingCartItem.querySelector('.shoppingCartItem__totalPrice').textContent;

        expect(actualName).to.equal('first article');
        expect(actualPrice).to.equal('0.42 €');
        expect(actualAmount).to.equal('30');
        expect(actualTotalPrice).to.equal('12.60 €');
      });

      it('should display packaging size warning', () => {
        let warnings = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'shoppingCart__packagingSizeWarning');
        expect(warnings.length).to.equal(1);
      });
    });

    describe('Clicking the minus button of first article', () => {
      let shoppingCartItem, minusButton;

      beforeEach(() => {
        shoppingCartItem = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'shoppingCartItem')[0];
        minusButton = shoppingCartItem.querySelector('.shoppingCartItem__removeFromCart');
      });

      describe('Once', () => {
        it('should decrease article amount by 10', () => {
          TestUtils.Simulate.click(minusButton);
          let actualName = shoppingCartItem.querySelector('.shoppingCartItem__name').textContent;
          let actualPrice = shoppingCartItem.querySelector('.shoppingCartItem__price').textContent;
          let actualAmount = shoppingCartItem.querySelector('.shoppingCartItem__amount').textContent;
          let actualTotalPrice = shoppingCartItem.querySelector('.shoppingCartItem__totalPrice').textContent;

          expect(actualName).to.equal('first article');
          expect(actualPrice).to.equal('0.42 €');
          expect(actualAmount).to.equal('10');
          expect(actualTotalPrice).to.equal('4.20 €');
        });
      });

      describe('Twice', () => {
        it('should remove article from shopping cart', () => {
          TestUtils.Simulate.click(minusButton);
          TestUtils.Simulate.click(minusButton);
          let shoppingCartItems = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'shoppingCartItem');
          expect(shoppingCartItems.length).to.equal(1);
        });
      });
    });
  });
});
