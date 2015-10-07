let expect = require('chai').expect;
let React = require('react/addons');
let ReactDOM = require('react-dom');
let ActionCreator = require('../../app/action-creator.js');
let Store = require('../../app/article-store.js');
let TestUtils = React.addons.TestUtils;
let renderTarget, firstArticleComponent, articleInformationComponent;

describe('selecting an article', () => {
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
    firstArticleComponent = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'article-details')[0];
    React.addons.TestUtils.Simulate.click(firstArticleComponent);
    articleInformationComponent = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'article-information')[0];
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(renderTarget);
  });

  it('should show details for article', () => {
    let articleName = TestUtils.scryRenderedDOMComponentsWithClass(articleInformationComponent, 'article-name')[0];
    expect(articleName.innerHTML).to.equal('Ristretto');
  });
});
