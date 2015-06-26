var expect = require('chai').expect;
var React = require('react/addons');
var renderTarget, component;

describe('displaying article overview', () => {
  var categories = [{id:1}, {id:2}];
  var articles = [{id:3, intensity: 3}, {id:4, intensity: 8}];

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

    var ActionCreator = require('../../app/action-creator.js');
    var actionCreator = new ActionCreator(dataAccess);
    var Store = require('../../app/store.js');
    var store = new Store(actionCreator);
    var renderedComponent = React.render(<ComponentClass actionCreator={actionCreator} store={store}/>, renderTarget);
    component = renderedComponent;
  });

  afterEach(() => {
    React.unmountComponentAtNode(renderTarget);
    component = null;
  });

  describe('server has some categories and articles', () => {
    it('should display categories from server', () => {
      expect(component.state.categories).to.deep.equal(categories);
    });

    it('should display articles from server', () => {
      var expected = articles.map((article) => {
        article.active = true;
        return article;
      });
      expect(component.state.articles).to.deep.equal(expected);
    });
  });
});
