let React = require('react');
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
    renderTarget = document.getElementsByTagName('body')[0];

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
    renderedComponent = React.render(<ComponentClass actionCreator={actionCreator} store={store} />, renderTarget);
    // initialize action creator, to fetch article data from server etc.
    actionCreator.initialize();
  });

  afterEach(() => {
    React.unmountComponentAtNode(renderTarget);
    renderedComponent = null;
  });

  describe('when no articles added to shopping cart', () => {
    it('should display no items', () => {
      let shoppingCartItems = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'shopping-cart-item');
      expect(shoppingCartItems).to.deep.equal([]);
    });

    it('should display empty footer', () => {
      let shoppingCartFooter = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'shopping-cart-footer')[0].getDOMNode();
      expect(shoppingCartFooter.children[2].textContent).to.equal('0');
      expect(shoppingCartFooter.children[3].textContent).to.equal('0');
    });
  });

  describe('when two different articles with total amount of 50 added to shopping cart', () => {
    beforeEach(() => {
      actionCreator.addArticleToShoppingCart(3, 20);
      actionCreator.addArticleToShoppingCart(4, 30);
    });

    it('should display name, amount and price of first article', () => {
      let shoppingCartItem = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'shopping-cart-item')[0].getDOMNode();
      expect(shoppingCartItem.children[0].textContent).to.equal('first article');
      expect(shoppingCartItem.children[1].textContent).to.equal('0.42');
      expect(shoppingCartItem.children[2].children[0].textContent).to.equal('20');
      expect(shoppingCartItem.children[3].textContent).to.equal('8.4');
    });

    it('should display name, amount and price of second article', () => {
      let shoppingCartItem = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'shopping-cart-item')[1].getDOMNode();
      expect(shoppingCartItem.children[0].textContent).to.equal('second article');
      expect(shoppingCartItem.children[1].textContent).to.equal('0.38');
      expect(shoppingCartItem.children[2].children[0].textContent).to.equal('30');
      expect(shoppingCartItem.children[3].textContent).to.equal('11.4');
    });

    it('should display footer with total amount', () => {
      let shoppingCartFooter = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'shopping-cart-footer')[0].getDOMNode();
      expect(shoppingCartFooter.children[2].textContent).to.equal('50');
    });

    it('should display footer with total price', () => {
      let shoppingCartFooter = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'shopping-cart-footer')[0].getDOMNode();
      expect(shoppingCartFooter.children[3].textContent).to.equal('19.8');
    });

    it('should not display packaging size warning', () => {
      let warnings = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'shopping-cart-warning');
      expect(warnings.length).to.equal(0);
    });

    describe('Clicking the add button of an article', () => {
      it('should increase article amount by 10', () => {
        let shoppingCartItem = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'shopping-cart-item')[0].getDOMNode();
        let addButton = shoppingCartItem.children[2].children[1];
        React.addons.TestUtils.Simulate.click(addButton);
        expect(shoppingCartItem.children[2].children[0].textContent).to.equal('30');
      });

      it('should display packaging size warning', () => {
        let shoppingCartItem = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'shopping-cart-item')[0].getDOMNode();
        let addButton = shoppingCartItem.children[2].children[1];
        React.addons.TestUtils.Simulate.click(addButton);
        let warnings = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'shopping-cart-warning');
        expect(warnings.length).to.equal(1);
      });
    });

    describe('Clicking the minus button of first article', () => {
      describe('Once', () => {
        it('should decrease article amount by 10', () => {
          let shoppingCartItem = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'shopping-cart-item')[0].getDOMNode();
          let minusButton = shoppingCartItem.children[2].children[2];
          React.addons.TestUtils.Simulate.click(minusButton);
          expect(shoppingCartItem.children[2].children[0].textContent).to.equal('10');
        });
      });

      describe('Twice', () => {
        it('should remove article from shopping cart', () => {
          let shoppingCartItem = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'shopping-cart-item')[0].getDOMNode();
          let minusButton = shoppingCartItem.children[2].children[2];
          React.addons.TestUtils.Simulate.click(minusButton);
          React.addons.TestUtils.Simulate.click(minusButton);
          let shoppingCartItems = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'shopping-cart-item');
          expect(shoppingCartItems.length).to.equal(1);
        });
      });
    });
  });
});
