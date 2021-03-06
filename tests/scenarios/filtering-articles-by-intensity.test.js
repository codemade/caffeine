/*eslint-disable no-unused-vars*/
let React = require('react');
let ReactDOM = require('react-dom');
let TestUtils = require('react-addons-test-utils');
let expect = require('chai').expect;
let ActionCreator = require('../../app/action-creator.js');
let Store = require('../../app/article-store.js');

let StorageFake = require('../flux/storage-fake.js');

let renderTarget, renderedComponent;

describe('filtering articles by intensity', () => {
  let categories = [{id: 1}, {id: 2}];
  let articles = [
    {id: 3, intensity: 3, category: 1, name: 'Ristretto'},
    {id: 4, intensity: 8, category: 1, name: 'Volluto'}
  ];
  let maximumIntensity, store;

  beforeEach(() => {
    let ComponentClass = require('../../app/components/articles-controller-view.react.js');
    renderTarget = document.getElementsByClassName('app')[0];

    let dataAccess = {
      getCategoriesAndArticles: () => {
        return {
          categories: categories,
          articles: articles
        };
      }
    };
    let actionCreator = new ActionCreator(dataAccess);
    store = new Store(new StorageFake());
    renderedComponent = React.render(<ComponentClass actionCreator={actionCreator} store={store}/>, renderTarget);
    maximumIntensity = store.getMaximumPossibleIntensity();
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(renderTarget);
    renderedComponent = null;
  });

  let expectUnavailableIntensitiesAreDisplayedAsUnavailable = (availableIntensities) => {
    let intensityFilterItems = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'intensityFilter__item');
    let itemsWithWrongClassName = Array.from(intensityFilterItems)
      .filter((intensityItem) => {
        let expectedClassName = availableIntensities.indexOf(+intensityItem.textContent) > -1
          ? 'intensityFilter__item'
          : 'intensityFilter__item intensityFilter__item--unavailable';
        return intensityItem.className !== expectedClassName;
      });
    expect(itemsWithWrongClassName.length).to.equal(0);
  };

  describe('intensity filter component', () => {
    it('should display an intensity-filter-item for each possible intensity', () => {
      let allIntensityFilterItems = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'intensityFilter__item');
      expect(allIntensityFilterItems.length).to.equal(maximumIntensity);
    });

    it('should disable intensity filter items with unavailable intensity', () => {
      expectUnavailableIntensitiesAreDisplayedAsUnavailable(store.getAvailableIntensities());
    });
  });

  describe('clicking on an intensity filter item', () => {
    let firstAvailableIntensityItem;
    beforeEach(() => {
      firstAvailableIntensityItem = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'intensityFilter__item')[2];
      TestUtils.Simulate.click(firstAvailableIntensityItem);
    });

    it('should display articles with matching intensity as default', () => {
      let articleDetails = Array.from(TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'articleDetails'));
      let articleInfosWithIntensity = articleDetails
          .filter((article) => {
            return +article.querySelector('.articleDetails__intensityValue').textContent === 3;
          });
      expect(articleInfosWithIntensity.every(article => article.className.includes('articleDetails') === true)).to.equal(true);
    });

    it('should display articles with non-matching intensity grayed-out', () => {
      let articleDetails = Array.from(TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'articleDetails'));
      let articleInfosWithIntensity = articleDetails
          .filter((article) => {
            return +article.querySelector('.articleDetails__intensityValue').textContent !== 3;
          });
      expect(articleInfosWithIntensity.every(article => article.className.includes('articleDetails articleDetails--grayed-out') === true)).to.equal(true);
    });

    it('should disable all other intensity filter items', () => {
      let availableIntensities = [3];
      expectUnavailableIntensitiesAreDisplayedAsUnavailable(availableIntensities);
    });

    describe('twice', () => {
      beforeEach(() => {
        TestUtils.Simulate.click(firstAvailableIntensityItem);
      });

      it('should disable intensity filter items with unavailable intensity', () => {
        expectUnavailableIntensitiesAreDisplayedAsUnavailable(store.getAvailableIntensities());
      });
    });
  });
});
