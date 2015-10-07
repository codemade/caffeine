/*eslint-disable no-unused-vars*/
let React = require('react');
let ReactDOM = require('react-dom');
let TestUtils = require('react-addons-test-utils');
let expect = require('chai').expect;
let ActionCreator = require('../../app/action-creator.js');
let Store = require('../../app/article-store.js');
let renderTarget, articleInformationComponent;

describe('no article is selected', () => {
  let categories = [{id: 1}, {id: 2}];
  let articles = [
    {id: 3, intensity: 3, category: 1, name: 'Ristretto'},
    {id: 4, intensity: 8, category: 1, name: 'Volluto'}
  ];

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
    let store = new Store(actionCreator);

    let renderedComponent = ReactDOM.render(<ComponentClass actionCreator={actionCreator} store={store}/>, renderTarget);
    articleInformationComponent = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'article-information')[0];
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(renderTarget);
  });

  it('no article information is displayed', () => {
    let title = articleInformationComponent;
    expect(title).to.equal(undefined);
  });
});
