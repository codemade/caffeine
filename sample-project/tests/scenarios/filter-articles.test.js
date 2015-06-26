var expect = require('chai').expect;
var React = require('react/addons');
var renderTarget, component;

describe('filter articles', () => {
  var categories = [{id:1}, {id:2}];
  var articles = [{id:3, intensity: 3, active: true}, {id:4, intensity:8, active: true}, {id:5, intensity:3, active: true}];

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

  describe('by intensity', () => {
    it('should highlight articles with matching intensity', () => {
      var intensity = 3;
      var expected = [{id:3, intensity: 3, active: true}, {id:4, intensity:8, active: false}, {id:5, intensity:3, active: true}];
      component.filterByIntensity(3);
      expect(component.state.articles).to.deep.equal(expected);
    });
  });
});
