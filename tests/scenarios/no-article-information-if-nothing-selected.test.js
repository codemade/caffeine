var expect = require('chai').expect;
var React = require('react/addons');
var ActionCreator = require('../../app/action-creator.js');
var Store = require('../../app/article-store.js');
var TestUtils = React.addons.TestUtils;
var renderTarget, articleInformationComponent;

describe('no article is selected', () => {
  var categories = [{id:1}, {id:2}];
  var articles = [{id:3, intensity: 3, category:1, name:'Ristretto'}, {id:4, intensity: 8, category:1, name:'Volluto'}];

  beforeEach(() => {
    var ComponentClass = require('../../app/components/app.react.js');
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
    articleInformationComponent = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'article-information')[0];
  });

  afterEach(() => {
    React.unmountComponentAtNode(renderTarget);
  });

  it('no article information is displayed', () => {
    var title = articleInformationComponent;
    expect(title).to.equal(undefined);
  });
});
