var expect = require('chai').expect;
var React = require('react/addons');
var ActionCreator = require('../../app/action-creator.js');
var Store = require('../../app/article-store.js');
var TestUtils = React.addons.TestUtils;
var renderTarget, renderedComponent;

describe('filtering articles by intensity', () => {
  let categories = [{id:1}, {id:2}];
  let articles = [{id:3, intensity: 3}, {id:4, intensity:8}, {id:5, intensity:7}];
  let maximumIntensity;

  beforeEach(() => {
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
    let actionCreator = new ActionCreator(dataAccess);
    let store = new Store(actionCreator);
    maximumIntensity = store.getMaximumPossibleIntensity();
    renderedComponent = React.render(<ComponentClass actionCreator={actionCreator} store={store}/>, renderTarget);
  });

  afterEach(() => {
    React.unmountComponentAtNode(renderTarget);
    renderedComponent = null;
  });

  describe('intensity filter component', () => {
    let intensityFilterItems;

    beforeEach(() => {
      intensityFilterItems = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'intensity-filter-item');
    });

    it('should display an intensity-filter-item for each possible intensity', () => {
      console.log(intensityFilterItems)
      expect(intensityFilterItems.length).to.equal(maximumIntensity);
    });
  });

  // describe('by intensity', () => {
  //   it('should highlight articles with matching intensity', () => {
  //     var intensity = 3;
  //     var expected = [{id:3, intensity: 3, active: true}, {id:4, intensity:8, active: false}, {id:5, intensity:3, active: true}];
  //     renderedComponent.filterByIntensity(3);
  //     expect(renderedComponent.state.articles).to.deep.equal(expected);
  //   });
  // });
});
