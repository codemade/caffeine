let React = require('react');
let TestUtils = React.addons.TestUtils;
let chai = require('chai');
let sinon = require('sinon');
let sinonChai = require('sinon-chai');
let expect = chai.expect;
chai.use(sinonChai);
let renderTarget, renderedComponent;
let navigateSpy;

describe('Navigate to shopping-cart route', () => {
  let categories = [
    {id: 1, name: 'first category'},
    {id: 2, name: 'second category'}
  ];
  let articles = [
    {id: 3, name: 'first article', intensity: 3, price: 42, isMatchingFilter: true, category: 1},
    {id: 4, name: 'second article', intensity: 8, price: 38, isMatchingFilter: true, category: 2}
  ];
  beforeEach(function() {
    let ComponentClass = require('../../app/components/articles-controller-view.react.js');
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
    let actionCreator = new ActionCreator(dataAccess);
    let ArticleStore = require('../../app/article-store.js');
    let store = new ArticleStore();
    navigateSpy = sinon.spy();
    renderedComponent = React.render(<ComponentClass actionCreator={actionCreator} store={store} navigate={navigateSpy} />, renderTarget);
  });

  afterEach(() => {
    React.unmountComponentAtNode(renderTarget);
    renderedComponent = null;
  });

  describe('by clicking on the shopping-cart-badge', () => {
    it('displays the shopping-cart', function() {
      let shoppingCartBadge = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'shopping-cart-badge')[0];
      TestUtils.Simulate.click(shoppingCartBadge);
      expect(navigateSpy).to.have.been.called;
    });
  });
});
