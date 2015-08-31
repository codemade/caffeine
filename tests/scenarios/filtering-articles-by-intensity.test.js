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
  let availableIntensities;

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
    renderedComponent = React.render(<ComponentClass actionCreator={actionCreator} store={store}/>, renderTarget);

    maximumIntensity = store.getMaximumPossibleIntensity();
    availableIntensities = store.getAvailableIntensities();
  });

  afterEach(() => {
    React.unmountComponentAtNode(renderTarget);
    renderedComponent = null;
  });

  let expectUnavailableIntensitiesAreDisplayedAsUnavailable = () => {
    let expectedClassNames = [];
    for(let intensity = 1; intensity <= maximumIntensity; intensity++) {
      let className = availableIntensities.indexOf(intensity) > -1
        ? 'intensity-filter-item'
        : 'intensity-filter-item unavailable';
      expectedClassNames.push(className);
    }
    let intensityFilterItems = document.querySelectorAll('div.intensity-filter span.intensity-filter-item');
    let actualClassNames = Array.from(intensityFilterItems)
      .map(child => child.className);
    expect(actualClassNames).to.deep.equal(expectedClassNames);
  };

  describe('intensity filter component', () => {
    it('should display an intensity-filter-item for each possible intensity', () => {
      let allIntensityFilterItems = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'intensity-filter-item');
      expect(allIntensityFilterItems.length).to.equal(maximumIntensity);
    });

    it('should disable intensity filter items with unavailable intensity', () => {
      expectUnavailableIntensitiesAreDisplayedAsUnavailable();
    });
  });

  describe('clicking on an intensity filter item', () => {
    let firstAvailableIntensityItem;
    beforeEach(() => {
      firstAvailableIntensityItem = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'intensity-filter-item')[2];
      React.addons.TestUtils.Simulate.click(firstAvailableIntensityItem);
    });

    it('should set isMatchingFilter property of articles with that intensity to true', () => {
      let articlesWithIntensity = renderedComponent
          .state
          .articles
          .filter(article => article.intensity === 3);
      expect(articlesWithIntensity.every(article => article.isMatchingFilter)).to.equal(true);
    });

    it('should set isMatchingFilter property of articles with other intensity to false', () => {
      let articlesWithIntensity = renderedComponent
          .state
          .articles
          .filter(article => article.intensity !== 3);
      expect(articlesWithIntensity.every(article => !article.isMatchingFilter)).to.equal(true);
    });

    it('should disable all other intensity filter items', () => {
      let expectedClassNames = [];
      for(let intensity = 1; intensity <= maximumIntensity; intensity++) {
        let className = intensity === 3
          ? 'intensity-filter-item'
          : 'intensity-filter-item unavailable';
        expectedClassNames.push(className);
      }
      let intensityFilterItems = document.querySelectorAll('div.intensity-filter span.intensity-filter-item');
      let actualClassNames = Array.from(intensityFilterItems)
        .map(child => child.className);
      expect(actualClassNames).to.deep.equal(expectedClassNames);
    });

    describe('twice', () => {
      beforeEach(() => {
        React.addons.TestUtils.Simulate.click(firstAvailableIntensityItem);
      });

      it('should disable intensity filter items with unavailable intensity', () => {
        expectUnavailableIntensitiesAreDisplayedAsUnavailable();
      });
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