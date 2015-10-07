let expect = require('chai').expect;
let React = require('react/addons');
let ActionCreator = require('../../app/action-creator.js');
let Store = require('../../app/article-store.js');
let TestUtils = React.addons.TestUtils;
let renderedComponent;
let renderTarget, firstArticleComponent;
let shoppingCartBadge;

describe('adding an article to the shopping cart', () => {
  let categories = [{id: 1}, {id: 2}];
  let articles = [
    {id: 3, intensity: 3, category: 1, name: 'Ristretto', price: 39},
    {id: 4, intensity: 8, category: 1, name: 'Volluto', price: 42}
  ];

  beforeEach(() => {
    let ComponentClass = require('../../app/components/articles-controller-view.react.js');
    renderTarget = document.getElementsByClassName('app')[0];

    let dataAccess = {
      getCategoriesAndArticles: () => {
        return {
          categories: categories,
          articles: articles
        };
      }
    };

    let actionCreator = new ActionCreator(dataAccess);
    let store = new Store(actionCreator);

    renderedComponent = React.render(<ComponentClass actionCreator={actionCreator} store={store}/>, renderTarget);
    firstArticleComponent = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'article-details')[0];
    React.addons.TestUtils.Simulate.click(firstArticleComponent);
    shoppingCartBadge = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'shopping-cart-badge')[0];
  });

  afterEach(() => {
    React.unmountComponentAtNode(renderTarget);
  });

  let clickAddToCartButton = () => {
    let button = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'addToCart')[0];
    React.addons.TestUtils.Simulate.click(button);
  };

  describe('once', () => {
    beforeEach(() => {
      clickAddToCartButton();
    });

    it('should display 10 articles in the shopping cart badge', () => {
      let articleCount = TestUtils.scryRenderedDOMComponentsWithClass(shoppingCartBadge, 'article-count')[0];
      expect(articleCount.getDOMNode().textContent).to.equal('10');
    });

    it('should display price for 10 articles in the shopping cart badge', () => {
      let totalPrice = TestUtils.scryRenderedDOMComponentsWithClass(shoppingCartBadge, 'total-price')[0];
      expect(totalPrice.getDOMNode().textContent).to.equal('3.9');
    });
  });

  describe('twice', () => {
    beforeEach(() => {
      clickAddToCartButton();
      clickAddToCartButton();
    });

    it('should display 20 articles in the shopping cart badge', () => {
      let articleCount = TestUtils.scryRenderedDOMComponentsWithClass(shoppingCartBadge, 'article-count')[0];
      expect(articleCount.getDOMNode().textContent).to.equal('20');
    });

    it('should display price for 20 articles in the shopping cart badge', () => {
      let totalPrice = TestUtils.scryRenderedDOMComponentsWithClass(shoppingCartBadge, 'total-price')[0];
      expect(totalPrice.getDOMNode().textContent).to.equal('7.8');
    });
  });
});
