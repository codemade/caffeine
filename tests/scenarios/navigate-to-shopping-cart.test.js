var React = require('react');
var TestUtils = React.addons.TestUtils;
var chai = require('chai');
var expect = chai.expect;
var renderTarget, renderedComponent;


describe('Navigate to shopping-cart route', () => {
  var categories = [{id: 1, name: 'first category'}, {id: 2, name:'second category'}];
  var articles = [{id: 3, name: 'first article', intensity: 3, price: 42, isMatchingFilter: true, category: 1}, {id: 4, name: 'second article', intensity: 8, price: 38, isMatchingFilter: true, category:2}];
  beforeEach(function() {

    let ComponentClass = require('../../app/components/app.react.js');
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
    renderedComponent = React.render(<ComponentClass actionCreator={actionCreator} store={store}/>, renderTarget);
  });

  afterEach(() => {
    React.unmountComponentAtNode(renderTarget);
    renderedComponent = null;

    /*
      Reset router to default-route, because in this scenario an explicit route-change to /shopping-cart route is triggered.
      Otherwise it will affect other tests, because router-mixin is a singleton and holds state of changed route made via navigate().
    */
  var navigate = require('react-mini-router').navigate;
    navigate('/');
  });

  describe('by clicking on the shopping-cart-badge', () => {
    it('displays the shopping-cart', function(done) {
      this.timeout(50000);
      let shoppingCartBadge = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'shopping-cart-badge')[0];
      TestUtils.Simulate.click(shoppingCartBadge);

      window.addEventListener("hashchange", function(){
        let shoppingCartView = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'shopping-cart')[0];
        var shoppingCart = document.querySelectorAll('.shopping-cart');
        expect(shoppingCartView).not.to.be.undefined;
        done();
      }, false);
    })
  });

});
