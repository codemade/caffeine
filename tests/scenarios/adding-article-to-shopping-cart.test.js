/*eslint-disable no-unused-vars*/
let React = require('react');
let ReactDOM = require('react-dom');
let TestUtils = require('react-addons-test-utils');
let expect = require('chai').expect;
let ActionCreator = require('../../app/action-creator.js');
let Store = require('../../app/article-store.js');
let renderedComponent;
let renderTarget, firstArticleComponent;
let shoppingCartBadge;
let actionCreator;

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

    actionCreator = new ActionCreator(dataAccess);
    let store = new Store(actionCreator);

    renderedComponent = ReactDOM.render(<ComponentClass actionCreator={actionCreator} store={store}/>, renderTarget);
    firstArticleComponent = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'articleDetails')[0];
    shoppingCartBadge = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'shoppingCartBadge')[0];
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(renderTarget);
  });

  let clickAddToCartButton = () => {
    TestUtils.Simulate.click(firstArticleComponent);
  };

  describe('once', () => {
    beforeEach(() => {
      clickAddToCartButton();
    });

    it('should display 10 articles in the shopping cart badge', () => {
      let articleCount = shoppingCartBadge.querySelectorAll('.shoppingCartBadge__cartInfo')[0];
      expect(articleCount.textContent).to.equal('10 Artikel: 3.90 €');
    });
  });

  describe('twice', () => {
    beforeEach(() => {
      clickAddToCartButton();
      clickAddToCartButton();
    });

    it('should display 20 articles in the shopping cart badge', () => {
      let articleCount = shoppingCartBadge.querySelectorAll('.shoppingCartBadge__cartInfo')[0];
      expect(articleCount.textContent).to.equal('20 Artikel: 7.80 €');
    });
  });

  describe('on an article not matching the filter', () => {
    beforeEach(() => {
      actionCreator.filterByIntensity(10);
      clickAddToCartButton();
    });

    it('should display zero articles in the shopping cart badge', () => {
      let articleCount = shoppingCartBadge.querySelectorAll('.shoppingCartBadge__cartInfo')[0];
      expect(articleCount.textContent).to.equal('0 Artikel: 0.00 €');
    });
  });
});
