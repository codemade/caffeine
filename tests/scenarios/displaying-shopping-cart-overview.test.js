let React = require('react');
let ReactDOM = require('react-dom');
let TestUtils = React.addons.TestUtils;
let chai = require('chai');
let sinonChai = require('sinon-chai');
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
    store = new ArticleStore();
    renderedComponent = ReactDOM.render(<ComponentClass actionCreator={actionCreator} store={store} />, renderTarget);
    // initialize action creator, to fetch article data from server etc.
    actionCreator.initialize();
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(renderTarget);
    renderedComponent = null;
  });

  describe('when no articles added to shopping cart', () => {
    it('should display no items', () => {
      let shoppingCartItems = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'shopping-cart-item');
      expect(shoppingCartItems).to.deep.equal([]);
    });

    it('should display empty footer', () => {
      let shoppingCartFooter = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'shopping-cart-footer')[0].getDOMNode();
      let actual = Array.from(shoppingCartFooter.querySelectorAll('div')).map((cell) => cell.textContent);
      let expected = ['', '', '0', '0'];
      expect(actual).to.deep.equal(expected);
    });
  });

  describe('when two different articles with total amount of 50 added to shopping cart', () => {
    beforeEach(() => {
      actionCreator.addArticleToShoppingCart(3, 20);
      actionCreator.addArticleToShoppingCart(4, 30);
    });

    it('should display name, amount and price of first article', () => {
      let shoppingCartItem = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'shopping-cart-item')[0].getDOMNode();
      let actual = Array.from(shoppingCartItem.querySelectorAll('.content')).map((cell) => cell.textContent);
      let expected = ['first article', '0.42', '20', '8.4'];
      expect(actual).to.deep.equal(expected);
    });

    it('should display name, amount and price of second article', () => {
      let shoppingCartItem = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'shopping-cart-item')[1].getDOMNode();
      let actual = Array.from(shoppingCartItem.querySelectorAll('.content')).map((cell) => cell.textContent);
      let expected = ['second article', '0.38', '30', '11.4'];
      expect(actual).to.deep.equal(expected);
    });

    it('should display footer with total amount and total price', () => {
      let shoppingCartFooter = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'shopping-cart-footer')[0].getDOMNode();
      let actual = Array.from(shoppingCartFooter.querySelectorAll('div')).map((cell) => cell.textContent);
      let expected = ['', '', '50', '19.8'];
      expect(actual).to.deep.equal(expected);
    });

    it('should not display packaging size warning', () => {
      let warnings = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'shopping-cart-warning');
      expect(warnings.length).to.equal(0);
    });

    describe('Clicking the add button of an article', () => {
      let shoppingCartItem, addButton;

      beforeEach(() => {
        shoppingCartItem = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'shopping-cart-item')[0].getDOMNode();
        addButton = shoppingCartItem.querySelector('.addToCart');
        React.addons.TestUtils.Simulate.click(addButton);
      });

      it('should increase article amount by 10', () => {
        let actual = Array.from(shoppingCartItem.querySelectorAll('.content')).map((cell) => cell.textContent);
        let expected = ['first article', '0.42', '30', '12.6'];
        expect(actual).to.deep.equal(expected);
      });

      it('should display packaging size warning', () => {
        let warnings = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'shopping-cart-warning');
        expect(warnings.length).to.equal(1);
      });
    });

    describe('Clicking the minus button of first article', () => {
      let shoppingCartItem, minusButton;

      beforeEach(() => {
        shoppingCartItem = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'shopping-cart-item')[0].getDOMNode();
        minusButton = shoppingCartItem.querySelector('.removeFromCart');
      });

      describe('Once', () => {
        it('should decrease article amount by 10', () => {
          React.addons.TestUtils.Simulate.click(minusButton);
          let actual = Array.from(shoppingCartItem.querySelectorAll('.content')).map((cell) => cell.textContent);
          let expected = ['first article', '0.42', '10', '4.2'];
          expect(actual).to.deep.equal(expected);
        });
      });

      describe('Twice', () => {
        it('should remove article from shopping cart', () => {
          React.addons.TestUtils.Simulate.click(minusButton);
          React.addons.TestUtils.Simulate.click(minusButton);
          let shoppingCartItems = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'shopping-cart-item');
          expect(shoppingCartItems.length).to.equal(1);
        });
      });
    });
  });
});
