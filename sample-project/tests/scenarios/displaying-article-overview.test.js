var expect = require('chai').expect;
var React = require('react/addons');
var renderTarget, component;

describe('displaying article overview', () => {
  var categories = [{id:1}, {id:2}];
  var articles = [{id:3}, {id:4}];

  beforeEach(() => {
    var ComponentClass = require('../../app/components/app.react.js');
    renderTarget = document.getElementsByTagName('body')[0];

    var api = {
      getCategoriesAndArticles: () => {
        return {
          categories: categories,
          articles: articles
        };
      }
    };
    var ActionCreator = require('../../app/actionCreator.js');
    var actionCreator = ActionCreator(api, null);

    var renderedComponent = React.render(<ComponentClass />, renderTarget);
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
      expect(component.state.categories).to.deep.equal(categories);
    });
  });
});
