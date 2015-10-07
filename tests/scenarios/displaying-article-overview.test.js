let expect = require('chai').expect;
let React = require('react/addons');
let ReactDOM = require('react-dom');
let TestUtils = React.addons.TestUtils;
let renderTarget, renderedComponent;

describe('displaying article overview', () => {
  let categories = [
    {id: 1, name: 'first category'},
    {id: 2, name: 'second category'}
  ];
  let articles = [
    {id: 3, name: 'first article', intensity: 3, price: 42, isMatchingFilter: true, category: 1},
    {id: 4, name: 'second article', intensity: 8, price: 38, isMatchingFilter: true, category: 2}
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

    let ActionCreator = require('../../app/action-creator.js');
    let actionCreator = new ActionCreator(dataAccess);
    let ArticleStore = require('../../app/article-store.js');
    let store = new ArticleStore();
    renderedComponent = ReactDOM.render(<ComponentClass actionCreator={actionCreator} store={store}/>, renderTarget);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(renderTarget);
    renderedComponent = null;
  });

  describe('server has some categories and articles', () => {
    it('should display categories from server', () => {
      let actualCategoryNames = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'category-name').map((category) => category.getDOMNode().textContent);
      let expectedCategoryNames = categories.map((category) => category.name);
      expect(actualCategoryNames).to.deep.equal(expectedCategoryNames);
    });

    it('should display articles from server', () => {
      let actualArticleNames = TestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'article-name').map((article) => article.getDOMNode().textContent);
      let expectedArticleNames = articles.map((article) => article.name);
      expect(actualArticleNames).to.deep.equal(expectedArticleNames);
    });
  });
});
