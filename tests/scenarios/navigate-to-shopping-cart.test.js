var React = require('react');
var TestUtils = React.addons.TestUtils;
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;
chai.use(sinonChai);
var renderTarget, renderedComponent;
var navigateSpy;

describe('Navigate to shopping-cart route', () => {
  var categories = [{id: 1, name: 'first category'}, {id: 2, name:'second category'}];
  var articles = [{id: 3, name: 'first article', intensity: 3, price: 42, isMatchingFilter: true, category: 1}, {id: 4, name: 'second article', intensity: 8, price: 38, isMatchingFilter: true, category:2}];
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

    var ActionCreator = require('../../app/action-creator.js');
    var actionCreator = new ActionCreator(dataAccess);
    var ArticleStore = require('../../app/article-store.js');
    var store = new ArticleStore();
    navigateSpy = sinon.spy();
    renderedComponent = React.render(<ComponentClass actionCreator={actionCreator} store={store} navigate={navigateSpy} />, renderTarget);
  });

  afterEach(() => {
    React.unmountComponentAtNode(renderTarget);
    renderedComponent = null;

    /*
      Reset router to default-route, because in this scenario an explicit route-change to /shopping-cart route is triggered.
      Otherwise it will affect other tests, because router-mixin is a singleton and holds state of changed route made via navigate().
    */

  });


  describe('by clicking on the shopping-cart-badge', () => {
    it('displays the shopping-cart', function() {
      let shoppingCartBadge = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'shopping-cart-badge')[0];
      TestUtils.Simulate.click(shoppingCartBadge);
      expect(navigateSpy).to.have.been.called;
    });
  });

});
