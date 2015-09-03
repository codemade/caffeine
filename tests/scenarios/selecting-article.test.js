var expect = require('chai').expect;
var React = require('react/addons');
var ActionCreator = require('../../app/action-creator.js');
var Store = require('../../app/article-store.js');
var TestUtils = React.addons.TestUtils;
var renderTarget, firstArticleComponent, articleInformationComponent;

describe('selecting an article', () => {
  var categories = [{id:1}, {id:2}];
  var articles = [{id:3, intensity: 3, category:1, name:'Ristretto'}, {id:4, intensity: 8, category:1, name:'Volluto'}];

  beforeEach(() => {
    var ComponentClass = require('../../app/components/articles-controller-view.react.js');
    renderTarget = document.getElementsByTagName('body')[0];

    var dataAccess = {
      getCategoriesAndArticles: () => {
        return {
          categories: categories,
          articles: articles
        };
      }
    };

    var actionCreator = new ActionCreator(dataAccess);
    var store = new Store(actionCreator);

    var renderedComponent = React.render(<ComponentClass actionCreator={actionCreator} store={store}/>, renderTarget);
    firstArticleComponent = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'article-details')[0];
    React.addons.TestUtils.Simulate.click(firstArticleComponent);
    articleInformationComponent = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'article-information')[0];
  });

  afterEach(() => {
    React.unmountComponentAtNode(renderTarget);
  });

  it('should show details for article', () => {
    var articleName = TestUtils.scryRenderedDOMComponentsWithClass(articleInformationComponent, 'article-name')[0].getDOMNode();
    expect(articleName.innerHTML).to.equal('Ristretto');
  });
});
